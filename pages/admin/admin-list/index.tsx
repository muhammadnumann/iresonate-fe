import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import moment from 'moment'

// component
import { SubHeader,HeadElement } from 'src/component/core'
import { WSTable,WSSpace,WSDate, MyInput} from 'src/component/common'
import SliderComponent from 'src/layouts/MainLayout'
import { withAuth } from 'src/routecheck'

// constant
import { Usertype, UserListUnion } from 'src/typeGeneratedAdmin'
import { DateProps, PaginationProps, SortProps, UserRoleType } from 'src/types'
import { GET_ALL_USERS } from 'src/graphql/Queries/queries'
import { clientAdmin } from 'pages/_app'
import { constantPageSize } from 'src/utils/staticData'
import { DateTimeFormat } from 'src/utils/helper'
import metaTitle from 'src/utils/metaTitle'
import { cardTitle, dataFormat, formLabelName, NetworkOnly, SortFieldTableEnum, SortOrderTableEnum } from 'src/utils/enums'

const AdminList: React.FC<{}> = () => {
  const [current, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(constantPageSize)
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

  const [getAdminList, { data: PaginatedTransactionListType, loading }] =
    useLazyQuery<{ getAllUsers: UserListUnion }>(GET_ALL_USERS, {
      fetchPolicy: NetworkOnly,
      client: clientAdmin,
    })

  useEffect(() => {
    getAdminList({
      variables: {
        limit: pageSize,
        offset: current,
        userType: Usertype.Admin,
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: 'Registration Date',
      dataIndex: 'createdAt',
      render: (date: string) => DateTimeFormat(date || '', dataFormat.MMM_DD_YYYY_hh_mm_a),
    },
  ]

  return (
    <>
      <SliderComponent>
        <HeadElement title={metaTitle.AdminUserList} />
        <SubHeader level={4} title={cardTitle.adminUsers}>
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
                if (current >= 1) {
                  setCurrentPage(1)
                }
                if (dateString.length === 2) {
                  setShowDate(
                    date
                      ? {
                          fromDate: moment(dateString[0],dataFormat.ddmmyyyy).format(
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
            PaginatedTransactionListType.getAllUsers.admin
          }
          loading={loading}
          pagination={{
            pageSize,
            current,
            total:
              PaginatedTransactionListType &&
              PaginatedTransactionListType.getAllUsers.totalCount,
          }}
          bordered
          showSizeChanger={
            PaginatedTransactionListType?.getAllUsers?.totalCount >= 10
              ? true
              : false
          }
          onChange={handleTableChange}
        />
      </SliderComponent>
    </>
  )
}

export default withAuth(AdminList, UserRoleType.Admin)
