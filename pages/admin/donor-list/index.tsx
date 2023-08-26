import React, { useEffect, useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { useLazyQuery, useMutation } from '@apollo/client'
import moment from 'moment'
import { useRouter } from 'next/router'
// component
import { SubHeader,HeadElement,UserEdit,ToggleComponent } from 'src/component/core'
import SliderComponent from 'src/layouts/MainLayout'
import { MyInput, WSDivider, WSModal, WSDate, WSMessage, WSSpace, WSTable, WSButton } from 'src/component/common'
// constant
import {
  Usertype,
  UserListUnion,
  Donor,
} from 'src/typeGeneratedAdmin'
import { DateProps, PaginationProps, UserRoleType } from 'src/types'
import { clientAdmin } from 'pages/_app'
import { constantPageSize } from 'src/utils/staticData'
import messageHelper from 'src/utils/message'
import metaTitle from 'src/utils/metaTitle'
import { API_NAME, cardTitle, dataFormat, formLabelName, NetworkOnly, SortFieldTableEnum, SortOrderTableEnum } from 'src/utils/enums'
import { SortProps } from 'src/types'
import { DateTimeFormat } from 'src/utils/helper'
import { withAuth } from 'src/routecheck'
import routPath from 'src/routes/routes'
import { ColumnsType } from 'antd/lib/table'
// schema
import { GET_ALL_USERS } from 'src/graphql/Queries/queries'
import { CHANGE_USER_STATUS, DELETE_DONOR } from 'src/graphql/Mutations/mutation'
import Router  from 'next/router';

const DonorList: React.FC<{}> = ({ ...props }) => {
  // const router = useRouter()
  const [current, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(constantPageSize)
  const [idToMutate, setIdToMutate] = useState('')
  const [showDate, setShowDate] = useState<DateProps>()

  const [showSearch, setShowSearch] = useState<string>('')
  const [showModal, setShowModal] = useState({
    visible: false,
    id: '',
  })
  const [sort, setSort] = useState<SortProps>({})

  const dateBetween = showDate
    ? {
        datesBetween: {
          fromDate: showDate && showDate.fromDate,
          toDate: showDate && showDate.toDate,
        },
      }
    : {}

  const [getMemberList, { data: PaginatedTransactionListType, loading }] =
    useLazyQuery<{ getAllUsers: UserListUnion }>(GET_ALL_USERS, {
      fetchPolicy: NetworkOnly,
      client: clientAdmin,
    })

  const sortBy =
    JSON.stringify(sort) !== '{}'
      ? {
          sortBy: {
            order: sort && sort.order,
            field: sort && sort.field,
          },
        }
      : {}

  useEffect(() => {
    getMemberList({
      variables: {
        limit: pageSize,
        offset: current,
        userType: Usertype.Member,
        searchTerm: showSearch,
        ...sortBy,
        ...dateBetween,
      },
    })
  }, [sort, showSearch, pageSize, current, showDate])

  const handleTableChange = (pagination: PaginationProps, filters, sorting) => {
    setSort({
      field:
        SortFieldTableEnum[sorting && sorting.column && sorting.column.title],
      order: SortOrderTableEnum[sorting.order],
    })
    setCurrentPage(pagination.current)
    setPageSize(pagination.pageSize)
  }

  const [ChangeActiveStatus, { loading: loadingStatus }] =
    useMutation(CHANGE_USER_STATUS, {
      client: clientAdmin,
      refetchQueries: [API_NAME.getAllUsers],
    })

  const ManageActions = (id: string) => {
    return (
      <>
        <UserEdit
          onEdit={() => {
            Router.push({
              pathname:routPath.DonorEdit,
              query:{
                id
              }
            })
          }}
        />
      </>
    )
  }

  const [DeleteDonor, { loading: deleteLoadingStatus }] = useMutation(
    DELETE_DONOR,
    {
      client: clientAdmin,
      onCompleted: (data) => {
        if (data?.deleteDonor) {
          WSMessage({
            type: 'success',
            messageValue: data?.deleteDonor?.message,
          })
        }
        setShowModal({
          visible: false,
          id: '',
        })
      },
      refetchQueries: [API_NAME.getAllUsers],
    }
  )

  const okFunction = async () => {
    await DeleteDonor({
      variables: {
        id: showModal.id,
      },
    })
  }

  const cancelFunction = () => {
    setShowModal({
      visible: false,
      id: '',
    })
  }

  const columns: ColumnsType<Donor> = [
    {
      title: 'Name',
      sorter: true,
      render: (record: Donor) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: 'Registration Date',
      dataIndex: 'createdAt',
      render: (date: string) => DateTimeFormat(date || '', dataFormat.MMM_DD_YYYY_hh_mm_a ),
    },
    {
      title: 'Block',
      render: (record: Donor) => {
        return (
          <>
            <ToggleComponent
              loading={loadingStatus}
              id={record._id}
              idtoMutate={idToMutate}
              checked={!record.status}
              onClick={async (e) => {
                setIdToMutate(record._id)
                const messageValue = e
                  ? messageHelper.donorBlock
                  : messageHelper.donorUnblock

                try {
                  await ChangeActiveStatus({
                    variables: {
                      id: record._id,
                    },
                  })
                  WSMessage({
                    type: 'info',
                    messageValue,
                  })
                } catch (error) {
                  console.log(error)
                }
              }}
            />
          </>
        )
      },
    },
    {
      title: 'Action',
      render: (record: Donor) => {
        return (
          <>
            <div className='d-flex align-items-center'>
              {ManageActions(record._id)}
              <WSDivider type='vertical' />
              <WSButton
                icon={<DeleteOutlined />}
                onClick={() =>
                  setShowModal({
                    visible: true,
                    id: record._id,
                  })
                }
                type='primary'
              />
            </div>
          </>
        )
      },
    },
  ]

  return (
    <>
      <SliderComponent>
        <HeadElement title={metaTitle.DonorList} />
        <SubHeader level={4} title={cardTitle.donors}>
          <WSSpace>
            <MyInput
              type='search'
              placeholder={formLabelName.search}
              onChange={(e) => {
                if (current >= 1) {
                  setCurrentPage(1)
                }
                setShowSearch(e.target.value)
              }}
            />
            <WSDate
              format={dataFormat.ddmmyyyy}
              onChange={(date, dateString) => {
                if (dateString.length === 2) {
                  if (current >= 1) {
                    setCurrentPage(1)
                  }
                  setShowDate(
                    date
                      ? {
                          fromDate: moment(dateString[0], dataFormat.ddmmyyyy).format(
                            dataFormat.yyyymmdd
                          ),
                          toDate: moment(dateString[1], dataFormat.ddmmyyyy).format(
                            dataFormat.yyyymmdd
                          ),
                        }
                      : undefined
                  )
                }
              }}
            />
          </WSSpace>
        </SubHeader>

        <WSTable
          columns={columns}
          dataSource={
            PaginatedTransactionListType &&
            PaginatedTransactionListType?.getAllUsers?.member
          }
          loading={loading}
          pagination={{
            pageSize,
            current,
            total:
              PaginatedTransactionListType &&
              PaginatedTransactionListType?.getAllUsers?.totalCount,
          }}
          bordered
          showSizeChanger={
            PaginatedTransactionListType?.getAllUsers?.totalCount >= 10
              ? true
              : false
          }
          onChange={handleTableChange}
        />
        <WSModal
          visible={showModal.visible}
          confirmFunction={okFunction}
          cancelFunction={cancelFunction}
          confirmLoading={deleteLoadingStatus}
        >
          <>{formLabelName.deleteModelText}</>
        </WSModal>
      </SliderComponent>
    </>
  )
}

export default withAuth(DonorList, UserRoleType.Admin)
