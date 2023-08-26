import React, { useEffect, useMemo, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_VENDOR_TRANSACTIONS } from "src/graphql/Queries/queries";
import moment from "moment";
import { ColumnsType } from "antd/lib/table";
// component
import { SubHeader, HeadElement } from "src/component/core";
import { WSTable, WSDate, WSSpace, MyInput } from "src/component/common";
import SliderComponent from "src/layouts/MainLayout";
import { withAuth } from "src/routecheck";
// constant
import {
  PaginatedTransactionListType,
  TransactionList,
  Transactions,
} from "src/typeGeneratedAdmin";
import {
  DateProps,
  PaginationProps,
  UserRoleType,
} from "src/types";
import { constantPageSize } from "src/utils/staticData";
import { clientAdmin } from "pages/_app";
import metaTitle from "src/utils/metaTitle";
import { DateTimeFormat } from "src/utils/helper";
import { dataFormat, formLabelName, NetworkOnly, PAYMENT_STATUS } from "src/utils/enums";

const TotalVendorTransactions: React.FC<PaginatedTransactionListType> = ({
  ...props
}) => {
  const [current, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(constantPageSize)
  const [showSearch, setshowSearch] = useState<string>("");
  const [showDate, setShowDate] = useState<DateProps>();
  const [filter, setFilter] = useState<string>(null)

  const dateBetween = showDate
    ? {
      datesBetween: {
        fromDate: showDate && showDate.fromDate,
        toDate: showDate && showDate.toDate,
      },
    }
    : {};

  const [getAllAdminTransactions, { data, loading }] = useLazyQuery(
    GET_ALL_VENDOR_TRANSACTIONS,
    {
      fetchPolicy: NetworkOnly,
      client: clientAdmin,
    }
  );

  const handleTableChange = (pagination: PaginationProps, filters) => {
    filters && (setFilter(Object.values(filters).toString()))
    setCurrentPage(pagination.current)
    setPageSize(pagination.pageSize)
  };

  const moduleFilter = useMemo(() => {
    if (filter === PAYMENT_STATUS.CLEARED) {
      return true
    } else if (filter === PAYMENT_STATUS.PENDING) {
      return false
    }
  }, [filter]);

  useEffect(() => {
    getAllAdminTransactions({
          variables: {
            limit: pageSize,
            offset: current,
            searchTerm: showSearch,
            isPaidToVendor: moduleFilter,
            ...dateBetween,
          },
        });
  }, [showSearch, pageSize, current, showDate, filter]);

  const columns : ColumnsType = [
    {
      title: "Website URL",
      fixed: "left",
      className:"transaction-column-fixed cursor-pointer",
      render:({ websiteUrl }:Transactions) => <a href={websiteUrl} target="_blank" rel="noreferrer"> {websiteUrl}</a>
    },
    {
      title: "Donars",
      render: ({ payer }: Transactions) => {
        return (<>
          <div>{`${payer?.firstName} ${payer?.lastName}`}</div>
          <div>{payer?.email}</div>
        </>)
      },
      fixed: "left",
      className:"transaction-column-fixed",
    },
    {
      title: "Content Provider",
      render: (record: Transactions) => record?.contentWriter ? `${record?.contentWriter?.firstName} ${record?.contentWriter?.lastName}` : "-",
      fixed: "left",
      className:"transaction-column-fixed",
    },
    {
      title: "Donation",
      dataIndex: "amount",
      key: "amount",
      render: (record: Transactions) => {
        const amount = record;
        return `$ ` + amount;
      },
    },
    {
      title: "Revenue",
      dataIndex: "vendorPaidAmount",
      key: "vendorPaidAmount",
      render: (record: TransactionList) => {
        const vendorPaidAmount = record;
        return `$ ` + vendorPaidAmount;
      },
    },
    {
      title: "To CP",
      dataIndex: "contentWriterPaidAmount",
      key: "contentWriterPaidAmount",
      render: (record: Transactions) => {
        const contentWriterPaidAmount = record;
        return contentWriterPaidAmount ? `$ ` + contentWriterPaidAmount : "-";
      },
    },
    {
      title: "Transaction Date",
      dataIndex: "createdAt",
      render: (date: string) => DateTimeFormat(date || "-", dataFormat.MMM_DD_YYYY_hh_mm_a)
    },
    {
      title: "Payment Status",
      render: (record: Transactions) => record?.isPaidToVendor ? PAYMENT_STATUS.CLEARED : PAYMENT_STATUS.PENDING,
      filterMultiple: false,
      filters: Object.keys(PAYMENT_STATUS).map((k) => {
        return {
          text: PAYMENT_STATUS[k],
          value: PAYMENT_STATUS[k],
        };
      }),
    },
    {
      title: "WH Payment Date",
      dataIndex: "whPaymentDate",
      render: (date: string) =>  date ? DateTimeFormat(date , dataFormat.MMM_DD_YYYY_hh_mm_a) : "-"
    },
  ];

  return (
    <div>
      <SliderComponent>
        <HeadElement title={metaTitle.Transactions} />
        <SubHeader level={4} title="Transactions">
          <WSSpace>
            <MyInput
              type="search"
              placeholder={formLabelName.search}
              onChange={(e) => {
                if (current >= 1) {
                  setCurrentPage(1);
                }
                setshowSearch(e.target.value);
              }}
            />
            <WSDate
              format={dataFormat.ddmmyyyy}
              onChange={(date, dateString) => {
                if (current >= 1) {
                  setCurrentPage(1);
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
                  );
                }
              }}
            />
          </WSSpace>
        </SubHeader>
        <WSTable
          columns={columns}
          dataSource={data && data?.getAllVendorPayments?.nodes}
          loading={loading}
          pagination={{
            pageSize,
            current,
            total: data && data?.getAllVendorPayments?.totalCount,
          }}
          bordered
          onChange={handleTableChange}
          showSizeChanger={
            data?.getAllVendorPayments?.totalCount >= 10 ? true : false
          }
          className="main-transactions-table"
          scroll={{ x: "max-content" }}
        />
      </SliderComponent>
    </div>
  );
};
export default withAuth(TotalVendorTransactions, UserRoleType.Vendor);
