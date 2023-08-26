import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useLazyQuery, useMutation } from '@apollo/client'
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'
import Router  from 'next/router';

// component
import { WSTable, WSButton, WSSpace, WSMessage, WSDate, WSModal, MyInput, WSDivider } from 'src/component/common'
import { withAuth } from 'src/routecheck'
import { SubHeader, HeadElement, UserEdit, ToggleComponent } from 'src/component/core'
import SliderComponent from 'src/layouts/MainLayout'
// constant
import {
  User,
  Usertype,
  Vendor,
} from 'src/typeGeneratedAdmin'
import { GET_ALL_USERS } from 'src/graphql/Queries/queries'
import { DateProps, PaginationProps, SortProps, UserRoleType } from 'src/types'
import { clientAdmin } from 'pages/_app'
import { constantPageSize } from 'src/utils/staticData'
import messageHelper from 'src/utils/message'
import metaTitle from 'src/utils/metaTitle'
import { API_NAME, cardTitle, dataFormat, formLabelName, NetworkOnly, SortFieldTableEnum, SortOrderTableEnum, tableColumn } from 'src/utils/enums'
import { DateTimeFormat } from 'src/utils/helper'
import routPath from 'src/routes/routes'
import { copyScriptLink } from 'src/utils/commonFunction'
// schema
import { CHANGE_USER_STATUS, DELETE_VENDOR } from 'src/graphql/Mutations/mutation'

const WebHostList: React.FC<{}> = () => {
  // const router = useRouter()

  const [current, setcurrentPage] = useState(1)
  const [showModal, setShowModal] = useState({
    visible: false,
    id: '',
  })
  const [pageSize, setPageSize] = useState(constantPageSize)
  const [showSearch, setshowSearch] = useState<string>('')
  const [idtoMutate, setIdtoMutate] = useState('')
  const [showDate, setShowDate] = useState<DateProps>()
  const [sort, setSort] = useState<SortProps>({})
  const [websiteModelStatus, setWebsiteModelStatus] = useState({
    modelopen: false,
    data: null
  })

  const dateBetween = showDate
    ? {
      datesBetween: {
        fromDate: showDate && showDate.fromDate,
        toDate: showDate && showDate.toDate,
      },
    }
    : {}

  const [getMemberList, { data: WebHostListDetail, loading }] = useLazyQuery(
    GET_ALL_USERS,
    {
      fetchPolicy: NetworkOnly,
      client: clientAdmin,
    }
  )

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
        userType: Usertype.Vendor,
        searchTerm: showSearch,
        ...sortBy,
        ...dateBetween,
      },
    })
  }, [sort, showSearch, pageSize, current, showDate])

  const handleTableChange = (
    { current, pageSize }: PaginationProps,
    filters,
    sorting
  ) => {
    setSort({
      field:
        SortFieldTableEnum[sorting && sorting.column && sorting.column.title],
      order: SortOrderTableEnum[sorting.order],
    })
    setcurrentPage(current)
    setPageSize(pageSize)
  }

  const [ChangeActiveStatus, { loading: loadingStatus }] =
    useMutation(CHANGE_USER_STATUS, {
      client: clientAdmin,

      refetchQueries: [API_NAME.getAllUsers],
    })



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

  const [DeleteVendor, { loading: deleteLoadingStatus }] = useMutation(
    DELETE_VENDOR,
    {
      client: clientAdmin,
      onCompleted: (data) => {
        if (data?.deleteVendor) {
          WSMessage({
            type: 'success',
            messageValue: data?.deleteVendor?.message,
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
    await DeleteVendor({
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
          onEdit={() => {
            Router.push({
              pathname: routPath.webHostEdit,
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
      render: (record: Vendor) => `${record?.name}`
    },
    {
      title: tableColumn.email,
      render: (record: Vendor) => record?.email,
    },
    {
      title: tableColumn.registrationDate,
      dataIndex: tableColumn.createdAt,
      render: (date: string) => DateTimeFormat(date || '', dataFormat?.MMM_DD_YYYY_hh_mm_a),
    },
    {
      title: tableColumn.scriptWH,
      render: (record: Vendor) => {
        return copyScriptLink(record?.vendorIdentity)
      },
    },
    {
      title: tableColumn.website,
      render: (currentRecord, record, index) => {
        return <a onClick={() => setWebsiteModelStatus({
          data: currentRecord && currentRecord?.websites,
          modelopen: true
        })}>{formLabelName.viewWebsites}</a>
      }
    },
    {
      title: tableColumn.block,
      render: (record: User) => {
        return (
          <>
            <ToggleComponent
              loading={loadingStatus}
              id={record._id}
              idtoMutate={idtoMutate}
              checked={!record.status} //
              onClick={async (e) => {
                setIdtoMutate(record._id)
                const messageValue = e
                  ? messageHelper.WebHostBlock
                  : messageHelper.WebHostUnblock

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
      title: tableColumn.action,
      render: (record: User) => {
        return (
          <div className='d-flex align-items-center' >
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
        )
      },
    },
  ]

  return (
    <>
      <SliderComponent>
        <HeadElement title={metaTitle.WebHostList} />
        <SubHeader level={4} title={cardTitle.webHosts}>
          <WSSpace>
            <MyInput
              type={formLabelName.searchType}
              placeholder={formLabelName.search}
              onChange={(e) => {
                if (current >= 1) {
                  setcurrentPage(1)
                }
                setshowSearch(e.target.value)
              }}
            />
            <WSDate
              format={dataFormat.ddmmyyyy}
              onChange={(date, dateString) => {
                if (current >= 1) {
                  setcurrentPage(1)
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
          dataSource={WebHostListDetail && WebHostListDetail.getAllUsers.vendor}
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize,
            current,
            total: WebHostListDetail && WebHostListDetail.getAllUsers.totalCount,
          }}
          showSizeChanger={
            WebHostListDetail?.getAllUsers?.totalCount >= 10 ? true : false
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

        <WSModal
          title={formLabelName.Websites}
          footer={null}
          closable={true}
          visible={websiteModelStatus.modelopen}
          cancelFunction={() => setWebsiteModelStatus({
            data: null,
            modelopen: false
          })}
        >
          {
            websiteModelStatus && websiteModelStatus?.data?.map((item) => {
              return (
                <div key={item.url} className="d-flex align-items-center mb-1">
                  <CheckCircleOutlined className="mr-1" />
                  <div>{item.url}</div>
                </div>
              )
            })
          }
        </WSModal>
      </SliderComponent>
    </>
  )
}

export default withAuth(WebHostList, UserRoleType.Admin)
