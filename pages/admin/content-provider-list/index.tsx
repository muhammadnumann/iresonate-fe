import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'

// components
import { SubHeader,HeadElement,UserEdit } from 'src/component/core'
import SliderComponent from 'src/layouts/MainLayout'
import { withAuth } from 'src/routecheck'
import { MyInput, WSButton, WSDivider, WSTable, WSSpace, WSDate, WSMessage,WSModal} from 'src/component/common'
import Router  from 'next/router';

// constants
import { DateProps, PaginationProps, SortProps, UserRoleType } from 'src/types'
import { clientAdmin } from 'pages/_app'
import metaTitle from 'src/utils/metaTitle'
import { constantPageSize } from 'src/utils/staticData'
import {
  PaginatedUserListType,
  Usertype,
  MutationDeleteRoleArgs,
  UserList,
  UserListUnion,
  ContentWriter,
} from 'src/typeGeneratedAdmin'
import { DateTimeFormat } from 'src/utils/helper'
import { API_NAME, cardTitle, dataFormat, formLabelName, NetworkOnly, SortFieldTableEnum, SortOrderTableEnum, tableColumn } from 'src/utils/enums'
import { useRouter } from 'next/router'
import routPath from 'src/routes/routes'
import { copyScriptLink } from 'src/utils/commonFunction'

// schema
import { GET_ALL_USERS } from 'src/graphql/Queries/queries'
import { DELETE_CONTENT_WRITER } from 'src/graphql/Mutations/mutation'

const ContentProviderList: React.FC<
  PaginatedUserListType & Usertype & MutationDeleteRoleArgs
> = (props) => {
  const router = useRouter()
  const [showModal, setShowModal] = useState({
    visible: false,
    id: '',
  })
  const [current, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(constantPageSize)
  const [showSearch, setShowSearch] = useState<string>('')
  const [showDate, setShowDate] = useState<DateProps>()
  const [sort, setSort] = useState<SortProps>({})

  const dateBetween = showDate
    ? {
        datesBetween: {
          fromDate: showDate && showDate.fromDate,
          toDate: showDate && showDate.toDate,
        },
      }
    : {}

  const sortBy =
    JSON.stringify(sort) !== '{}'
      ? {
          sortBy: {
            order: sort && sort?.order,
            field: sort && sort?.field,
          },
        }
      : {}
  const [getAdminList, { data: PaginatedUserListType, loading }] =
    useLazyQuery<{ getAllUsers: UserListUnion }>(GET_ALL_USERS, {
      fetchPolicy: NetworkOnly,
      client: clientAdmin,
    })

  useEffect(() => {
    getAdminList({
      variables: {
        limit: pageSize,
        offset: current,
        userType: Usertype.ContentWriter,
        searchTerm: showSearch,
        ...dateBetween,
        ...sortBy,
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

  // const CopyClipboard = (id) => { TODO:Need this code
  //   return (
  //     <>
  //       <span
  //         dangerouslySetInnerHTML={{
  //           __html: `${id}`,
  //         }}
  //         className="mr-1"
  //       />
  //       <CopyOutlined onClick={() => copyCodeToClipboard(id)} />
  //     </>
  //   )
  // }
  const [DeleteContentWriter, { loading: deleteLoadingStatus }] = useMutation(
    DELETE_CONTENT_WRITER,
    {
      client: clientAdmin,
      onCompleted: (data) => {
        if (data?.deleteContentWriter) {
          WSMessage({
            type: 'success',
            messageValue: data?.deleteContentWriter?.message,
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
    await DeleteContentWriter({
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
  const ManageActions = (id: string) => {
    return (
      <>
        <UserEdit
          eye
          onEdit={() => {
            Router.push({
              pathname: routPath.ContentProviderView,
              query: {
                id,
              },
            })
          }}
        />
      </>
    )
  }
  const columns = [
    {
      title: tableColumn.name,
      render: (record:ContentWriter) => `${record?.firstName} ${record?.lastName}`,
      sorter: true,
    },
    {
      title: tableColumn.email,
      dataIndex: tableColumn.dataIndexEmail,
      sorter: true,
    },
    {
      title: tableColumn.markUp,
      dataIndex: tableColumn.mark,
    },
    {
      title: tableColumn.webHostName,
      render: (record: ContentWriter ) => record?.vendorId?.webhostCorporateName
    },
    {
      title: tableColumn.webHostEmail,
      render: (record: ContentWriter) => record?.vendorId?.finansialContact?.email
    },
    {
      title: tableColumn.scriptCP,
      render: (record: ContentWriter) => {
        return copyScriptLink(record?.vendorId?.vendorIdentity,record?._id)
      },
    },
    {
      title: tableColumn.registrationDate,
      dataIndex: tableColumn.createdAt,
      render: (date: string) => DateTimeFormat(date || '-', dataFormat?.MMM_DD_YYYY_hh_mm_a)
    },
    {
      title: tableColumn.action,
      render: (record: UserList) => {
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
        <HeadElement title={metaTitle.ContentWriterList} />
        <SubHeader level={4} title={cardTitle.contentProvider}>
          <WSSpace>
            <MyInput
              type={formLabelName.searchType}
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
                if (current >= 1) {
                  setCurrentPage(1)
                }
                if (dateString.length === 2) {
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
            PaginatedUserListType &&
            PaginatedUserListType?.getAllUsers?.contentWriter
          }
          loading={loading}
          pagination={{
            pageSize,
            current,
            total:
              PaginatedUserListType &&
              PaginatedUserListType?.getAllUsers?.totalCount,
          }}
          showSizeChanger={
            PaginatedUserListType?.getAllUsers?.totalCount >= 10 ? true : false
          }
          bordered
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

export default withAuth(ContentProviderList, UserRoleType.Admin)
