import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import Router from 'next/router';

// components
import { WSModal, WSTable, WSButton, WSToolTip, WSDivider, WSMessage, WSDate, WSSpace, MyInput } from 'src/component/common'
import { SubHeader, HeadElement, UserEdit, ToggleComponent } from 'src/component/core'
import AddContentWriterModel from 'src/component/core/AddContentWriter/AddContentWriterHandler'
import SliderComponent from 'src/layouts/MainLayout'
import { withAuth } from 'src/routecheck'

// constants
import { DateProps, PaginationProps, SortProps, UserRoleType } from 'src/types'
import { clientAdmin } from 'pages/_app'
import metaTitle from 'src/utils/metaTitle'
import { constantPageSize } from 'src/utils/staticData'
import {
  PaginatedUserListType,
  Usertype,
  MutationDeleteRoleArgs,
  PaginatedContentWriterType,
  ContentWriterDetail,
} from 'src/typeGeneratedAdmin'
import {
  API_NAME,
  cardTitle,
  dataFormat,
  formLabelName,
  NetworkOnly,
  SortFieldTableEnum,
  SortOrderTableEnum,
  tableColumn,
} from 'src/utils/enums'
import { DateTimeFormat } from 'src/utils/helper'
import messageHelper from 'src/utils/message'
import routPath from 'src/routes/routes'
import { copyScriptLink } from 'src/utils/commonFunction'
// schema
import { CONTENT_WRITER_LIST } from 'src/graphql/Queries/queries'
import { CHANGE_USER_STATUS, DELETE_CONTENT_WRITER } from 'src/graphql/Mutations/mutation'

// style
import './style.less'

const ContentWriterList: React.FC<
  PaginatedUserListType & Usertype & MutationDeleteRoleArgs
> = (props) => {
  // const router = useRouter()

  const [current, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(constantPageSize)
  const [showSearch, setShowSearch] = useState<string>('')
  const [idToMutate, setIdToMutate] = useState('')
  const [sort, setSort] = useState<SortProps>({})

  const [showModal, setShowModal] = useState({
    visible: false,
    id: '',
  })
  const [modal, setModal] = useState({ state: false, data: '', typeName: '' })
  const [showDate, setShowDate] = useState<DateProps>()

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
          order: sort && sort.order,
          field: sort && sort.field,
        },
      }
      : {}

  const [getContentWriterList, { data: PaginatedUserListType, loading }] =
    useLazyQuery<{ contentWriterList: PaginatedContentWriterType }>(
      CONTENT_WRITER_LIST,
      {
        fetchPolicy: NetworkOnly,
        client: clientAdmin,
      }
    )

  useEffect(() => {
    getContentWriterList({
      variables: {
        limit: pageSize,
        offset: current,
        searchTerm: showSearch,
        ...sortBy,
        ...dateBetween,
      },
    })
  }, [sort, showSearch, pageSize, current, showDate])


  // const [getContentWriter, { data: singleData, loading: singleLoading }] = TODO:Need this c
  //   useLazyQuery(GET_SINGLE_CONTENT_WRITER, {
  //     fetchPolicy: NetworkOnly,
  //     client: clientAdmin,
  //     onCompleted: () => {
  //       setModal({
  //         state: true,
  //         data: singleData?.singleContentWriter,
  //         typeName: 'Edit Content Writer',
  //       })
  //     },
  //   })
  const handleDelete = (id: string) => {
    setShowModal({
      visible: true,
      id,
    })
  }

  const [DeleteContent, { loading: deleteLoadingStatus }] = useMutation(
    DELETE_CONTENT_WRITER,
    {
      client: clientAdmin,
      onCompleted: () => {
        setShowModal({
          visible: false,
          id: '',
        })
      },
      refetchQueries: [API_NAME.contentWriterList],
    }
  )

  const okFunction = async () => {
    await DeleteContent({
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
      refetchQueries: [API_NAME.contentWriterList],
    })

  const columns = [
    {
      title: tableColumn.name,
      render: (record: ContentWriterDetail) => `${record?.firstName} ${record?.lastName}`,
    },
    {
      title: tableColumn.email,
      dataIndex: tableColumn.dataIndexEmail,
    },
    {
      title: tableColumn.markUp,
      dataIndex: tableColumn.mark,
    },
    {
      title: tableColumn.scriptCP,
      render: (record: ContentWriterDetail) => {
        return copyScriptLink(record?.vendorId?.vendorIdentity, record?._id)
      },
    },
    {
      title: tableColumn.registrationDate,
      dataIndex: tableColumn.createdAt,
      render: (date: string) => DateTimeFormat(date || '', dataFormat.MMM_DD_YYYY_hh_mm_a)
    },
    {
      title: tableColumn.block,
      render: (record: ContentWriterDetail) => {
        return (
          <>
            <ToggleComponent
              loading={loadingStatus}
              id={record._id}
              idtoMutate={idToMutate}
              checked={!record.status} //
              onClick={async (e) => {
                setIdToMutate(record._id)

                const messageValue = e
                  ? messageHelper.ContentProviderBlock
                  : messageHelper.ContentProviderUnblock

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
      render: (record) => {
        return (
          <div className='vender-list-action'>
            <UserEdit
              onEdit={() => {
                Router.push({
                  pathname: routPath.webHostContentProviderEdit,
                  query: {
                    id: record._id,
                  },
                })
                // getContentWriter({ TODO:need this code
                //   variables: { id: record._id },
                // })
                // setModal({
                //   state: true,
                //   data:
                //     (record._id === singleData?.singleContentWriter?._id &&
                //       singleData?.singleContentWriter) ||
                //     '',
                //   typeName: 'Edit Content Writer',
                // })
              }}
            />
            <WSDivider type='vertical' />
            <WSToolTip title='Delete'>
              <WSButton
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record._id)}
                type='primary'
              />
            </WSToolTip>
          </div>
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
            <WSButton
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => {
                setModal({
                  state: true,
                  data: '',
                  typeName: formLabelName.addContentProvider,
                })
              }}
            >
              {formLabelName.add}
            </WSButton>
          </WSSpace>
        </SubHeader>
        <AddContentWriterModel
          visible={modal.state}
          onModalClose={() => {
            setModal({ state: false, data: '', typeName: '' })
          }}
          initData={modal.data}
          modelTitle={modal.typeName}
          dateBetween={dateBetween}
          sortBy={sortBy}
        />
        <WSTable
          columns={columns}
          dataSource={
            PaginatedUserListType &&
            PaginatedUserListType?.contentWriterList?.nodes
          }
          loading={loading}
          pagination={{
            pageSize,
            current,
            total:
              PaginatedUserListType &&
              PaginatedUserListType?.contentWriterList?.totalCount,
          }}
          bordered
          showSizeChanger={
            PaginatedUserListType?.contentWriterList?.totalCount >= 10
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

export default withAuth(ContentWriterList, UserRoleType.Vendor)
