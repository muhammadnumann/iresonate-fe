import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { ColumnsType } from 'antd/lib/table'

// component
import SliderComponent from 'src/layouts/MainLayout'
import { SubHeader, HeadElement } from 'src/component/core'
import { WSTable, WSSpace, WSDate, MyInput } from 'src/component/common'
import { withAuth } from 'src/routecheck'

// constant
import metaTitle from 'src/utils/metaTitle'
import { constantPageSize } from 'src/utils/staticData'
import { DateTimeFormat } from 'src/utils/helper'
import { Transactions } from 'src/typeGeneratedAdmin'
import { dataFormat, formLabelName, NetworkOnly, PAYMENT_STATUS, SortOrder, TransactionSortFieldTableEnum } from 'src/utils/enums'
import { GET_ALL_TRANSACTIONS } from 'src/graphql/Queries/queries'
import {
  DateProps,
  PaginationProps,
  SortProps,
  UserRoleType,
} from 'src/types'
import { clientAdmin } from 'pages/_app'

const Transaction: React.FC<{}> = () => {
  const [current, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(constantPageSize)
  const [showSearch, setShowSearch] = useState<string>('')
  const [showDate, setShowDate] = useState<DateProps>()

  const [sort] = useState<SortProps>({
    order: SortOrder.ASCENDING,
    field: TransactionSortFieldTableEnum.MEMBER_NAME,
  })

  const dateBetween = showDate
    ? {
      datesBetween: {
        fromDate: showDate && showDate.fromDate,
        toDate: showDate && showDate.toDate,
      },
    }
    : {}

  const handleTableChange = (pagination: PaginationProps, sorting) => {
    setCurrentPage(pagination.current)
    setPageSize(pagination.pageSize)
  }

  const [getAllAdminTransactions, { data, loading }] = useLazyQuery(
    GET_ALL_TRANSACTIONS,
    {
      client: clientAdmin,
      fetchPolicy: NetworkOnly,
    }
  )

  useEffect(() => {
    getAllAdminTransactions({
      variables: {
        limit: pageSize,
        offset: current,
        searchTerm: showSearch,
        ...dateBetween,
      },
    })
  }, [sort, showSearch, pageSize, current, showDate])

  const columns : ColumnsType = [
    {
      title: 'Donors',
      sorter: true,
      render: ({ payer }: Transactions) => {
        return (
          <>
            <div>{payer?.firstName} {payer?.lastName}</div>
            <div>{payer?.email}</div>
          </>)
      },
      className:"transaction-column-fixed",
      fixed: "left",
    },
    {
      title: 'Web Hosts',
      render: ({ vendor }: Transactions) => {
        return vendor?.webhostCorporateName
      },
      fixed:"left",
      className:"transaction-column-fixed",
    },
    {
      title: "Web Host URL",
      render: (record: Transactions) => {
        return <a href={record?.websiteUrl} target="_blank" rel="noreferrer"> {record?.websiteUrl}</a>
      },
      fixed:"left",
      className:"transaction-column-fixed",
    },
    {
      title: 'Content Providers',
      render: (record: Transactions) => record?.contentWriter ? `${record?.contentWriter?.firstName} ${record?.contentWriter?.lastName}` : "-",
      fixed:"left",
      className:"transaction-column-fixed",
    },
    {
      title: 'Donation',
      dataIndex: 'amount',
      key: 'amount',
      render: (record: Transactions) => {
        const amount = record
        return amount ? `$ ` + amount : '-'
      },
    },
    {
      title: 'To iResonate',
      dataIndex: 'admingotAmount',
      key: 'admingotAmount',
      render: (record: Transactions) => {
        const admingotAmount = record
        return `$ ${admingotAmount}`
      },
    },
    {
      title: 'To WH',
      dataIndex: 'vendorPaidAmount',
      key: 'vendorPaidAmount',
      render: (record: Transactions) => {
        const vendorPaidAmount = record
        return vendorPaidAmount ? `$ ` + vendorPaidAmount : '-'
      },
    },
    {
      title: 'To CP',
      dataIndex: 'contentWriterPaidAmount',
      key: 'contentWriterPaidAmount',
      render: (record: Transactions) => {
        const contentWriterPaidAmount = record
        return contentWriterPaidAmount ? `$ ` + contentWriterPaidAmount : '-'
      },
    },
    {
      title: 'Transaction Date',
      dataIndex: 'createdAt',
      render: (date: string) => DateTimeFormat(date || '', dataFormat.MMM_DD_YYYY_hh_mm_a)
    },
    {
      title: 'WH Pmt Status',
      render: (record: Transactions) => record.isPaidToVendor ? PAYMENT_STATUS.CLEARED : PAYMENT_STATUS.PENDING
    },
    {
      title: 'WH Pmt Date',
      dataIndex: 'whPaymentDate',
      render: (date: string) => date ? DateTimeFormat(date, dataFormat.MMM_DD_YYYY_hh_mm_a) : "-"
    },
    {
      title: 'CP Pmt Status',
      render: (record: Transactions) => record.isPaidToCW ? PAYMENT_STATUS.CLEARED : record.contentWriterPaidAmount == null ? "-" : PAYMENT_STATUS.PENDING
    },
    {
      title: 'CP Pmt Date',
      dataIndex: 'cpPaymentDate',
      render: (date: string) => date ? DateTimeFormat(date, dataFormat.MMM_DD_YYYY_hh_mm_a) : "-"
    },
    // { TODO:Need this code
    //   title: 'Status',
    //   render: (record: Transactions) => {
    //     const { paymentStatus } = record
    //     return `${MODULE_NAME_ENUM[paymentStatus]}`
    //   },
    // },
  ]

  return (
    <>
      <SliderComponent>
        <HeadElement title={metaTitle.Transactions} />
        <SubHeader level={4} title='Transactions'>
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
          dataSource={data && data?.getAllTransactions?.nodes}
          loading={loading}
          pagination={{
            pageSize,
            current,
            total: data && data?.getAllTransactions?.totalCount,
          }}
          showSizeChanger={
            data?.getAllTransactions?.totalCount >= 10 ? true : false
          }
          onChange={handleTableChange}
          bordered
          className="main-transactions-table"
          scroll={{ x: "max-content" }}
        />
      </SliderComponent>
    </>
  )
}

export default withAuth(Transaction, UserRoleType.Admin)
