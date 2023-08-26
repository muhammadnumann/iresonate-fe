import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import moment from 'moment'

// component
import { SubHeader, HeadElement } from 'src/component/core'
import { MyInput, WSDate, WSSpace, WSTable } from 'src/component/common'
import SliderComponent from 'src/layouts/MainLayout'
import { withAuth } from 'src/routecheck'

// constant
import { AUDIT_LOG_LIST } from 'src/graphql/Queries/queries'
import { clientAdmin } from 'pages/_app'
import {
  AuditLogModuleNames,
  AuditLogs,
  LogType,
  PaginatedAuditLogsType,
} from 'src/typeGeneratedAdmin'
import {
  DateProps,
  PaginationProps,
  UserRoleType,
} from 'src/types'
import metaTitle from 'src/utils/metaTitle'
import { Admin, cardTitle, contentProvider, dataFormat, DonorDetail, formLabelName, NetworkOnly, roleTitle, roleTypes, VendorDetail } from 'src/utils/enums'
import { DateTimeFormat } from 'src/utils/helper'



const AuditLog: React.FC<{}> = () => {
  const [current, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [showSearch, setShowSearch] = useState<string>()
  const [showDate, setShowDate] = useState<DateProps>()
  const [filter, setFilter] = useState<any>({
    moduleName: '',
  })

  const dateBetween = showDate
    ? {
      datesBetween: {
        fromDate: showDate && showDate.fromDate,
        toDate: showDate && showDate.toDate,
      },
    }
    : {}

  const moduleFilter =
    filter.moduleName !== ''
      ? {
        ...filter,
      }
      : {}

  const [getAuditLogList, { data, loading }] = useLazyQuery<{
    auditLogList: PaginatedAuditLogsType
  }>(AUDIT_LOG_LIST, {
    fetchPolicy: NetworkOnly,
    client: clientAdmin,
  })

  useEffect(() => {
    getAuditLogList({
      variables: {
        limit: pageSize,
        offset: current,
        userName: showSearch,
        ...moduleFilter,
        ...dateBetween,
      },
    })
  }, [showSearch, filter, pageSize, current, showDate])

  const handleTableChange = (pagination: PaginationProps, filters, sorting) => {
    setFilter(
      filters
        ? {
          ...filter,
          moduleName: Object.values(filters).toString(),
        }
        : {}
    )

    setCurrentPage(pagination.current)
    setPageSize(pagination.pageSize)
  }
  const nameRender = (record: AuditLogs) => {
    switch (record?.userId?.__typename) {
      case contentProvider:
        return record?.userId.firstName + " " + record?.userId.lastName;
      case VendorDetail:
        return record.userId.finansialContact.firstName  + " " + record?.userId.finansialContact.lastName
      case Admin: 
      return record.userId.name
      case DonorDetail:
        return record?.userId.firstName + " " + record?.userId.lastName;
    }
  }
  const userTypeRender = (record: AuditLogs) => {
    switch (record?.userId?.role.name) {
      case roleTitle.contentProvider:
        return roleTypes.contentProvider;
      case roleTitle.webHost:
        return roleTypes.webHosts
      case roleTitle.admin: 
      return  roleTypes.admin
      case roleTitle.donor:
        return roleTypes.donor;
    }
  }

  const columns = [
    {
      title: 'Name',
      render: (record: AuditLogs) => nameRender(record)
    },
    {
      title: 'Log Type',
      key: 'logtype',
      render: (record: AuditLogs) => {
        const { logType } = record
        return LogType[logType]
      },
    },
    {
      title: 'Module Name',
      key: 'modulename',
      render: (record: AuditLogs) => {
        const { moduleName } = record
        return AuditLogModuleNames[moduleName]
      },
      filterMultiple: false,
      filters: Object.keys(AuditLogModuleNames).map((k) => {
        return {
          text: AuditLogModuleNames[k],
          value: AuditLogModuleNames[k],
        }
      }),
    },
    {
      title: 'User Type',
      render: (record: AuditLogs) => userTypeRender(record), 
    },
    {
      title: 'Log Date',
      dataIndex: 'createdAt',
      render: (date: string) => DateTimeFormat(date || '', dataFormat.MMM_DD_YYYY_hh_mm_a )
    },
    {
      title: 'Description',
      dataIndex: 'message',
    },
  ]

  return (
    <>
      <SliderComponent>
          <HeadElement title={metaTitle.AuditLog} />
          <SubHeader level={4} title={cardTitle.auditLogs}>
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
                          fromDate: moment(dateString[0],dataFormat.ddmmyyyy).format(dataFormat.yyyymmdd),
                          toDate: moment(dateString[1], dataFormat.ddmmyyyy).format(dataFormat.yyyymmdd),
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
            dataSource={data && data?.auditLogList?.nodes}
            loading={loading}
            pagination={{
              pageSize,
              current,
              total: data && data?.auditLogList?.totalCount,
            }}
            bordered
            showSizeChanger={
              data?.auditLogList?.totalCount >= 10 ? true : false
            }
            onChange={handleTableChange}
          />

      </SliderComponent>
    </>
  )
}
export default withAuth(AuditLog, UserRoleType.Admin)
