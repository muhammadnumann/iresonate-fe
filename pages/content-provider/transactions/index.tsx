import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { useLazyQuery } from "@apollo/client";
import { ColumnsType } from "antd/lib/table";
// component
import { WSTable, WSSpace, WSDate, MyInput } from "src/component/common";
import { HeadElement,SubHeader } from "src/component/core";
import SliderComponent from "src/layouts/MainLayout";

// constant
import { withAuth } from "src/routecheck";
import metaTitle from "src/utils/metaTitle";
import {
  PaginatedTransactionListType,
  Transactions,
} from "src/typeGeneratedAdmin";
import {
  DateProps,
  PaginationProps,
  UserRoleType,
} from "src/types";
import { GET_ALL_CONTENT_WRITER_PAYMENT } from "src/graphql/Queries/queries";
import { constantPageSize } from "src/utils/staticData";
import { clientAdmin } from "pages/_app";
import { DateTimeFormat } from "src/utils/helper";
import { dataFormat, formLabelName, NetworkOnly, PAYMENT_STATUS } from "src/utils/enums";

const ContentWriterTransactions: React.FC<PaginatedTransactionListType> = ({
  ...props
}) => {
  const [current, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(constantPageSize);
  const [showSearch, setShowSearch] = useState<string>("");
  const [showDate, setShowDate] = useState<DateProps>();
  const [filter, setFilter] = useState<string>(null)

  const handleTableChange = (pagination: PaginationProps,filters) => {
    filters && (setFilter(Object.values(filters).toString()))
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const dateBetween = showDate
    ? {
      datesBetween: {
        fromDate: showDate && showDate.fromDate,
        toDate: showDate && showDate.toDate,
      },
    }
    : {};

  const [getContentWriterList, { data, loading }] = useLazyQuery(
    GET_ALL_CONTENT_WRITER_PAYMENT,
    {
      fetchPolicy: NetworkOnly,
      client: clientAdmin,
    }
  );
  const moduleFilter = useMemo(() => {
    if (filter === PAYMENT_STATUS?.CLEARED) {
      return true
    } else if (filter === PAYMENT_STATUS?.PENDING) {
      return false
    }
  }, [filter]);

  useEffect(() => {
    getContentWriterList({
      variables: {
        limit: pageSize,
        offset: current,
        searchTerm: showSearch,
        isPaidToCW: moduleFilter,
        ...dateBetween,
      },
    });
  }, [showSearch, pageSize, current, showDate, filter]);

  const columns : ColumnsType = [
    {
      title: "Donors",
      render: ({ payer }: Transactions) => {
        return (
          <>
          <div>{`${payer?.firstName} ${payer?.lastName}`}</div>
          <div>{payer.email}</div>
          </>
        )
      },
      fixed: "left",
      className:"transaction-column-fixed",
    },
    {
      title: "WebHost URL",
      render: (record: Transactions) => {
        return <a href={record?.websiteUrl} target="_blank" rel="noreferrer"> {record?.websiteUrl}</a>
      },
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
    // { TODO:need this code
    //   title: "To iResonate",
    //   dataIndex: "admingotAmount",
    //   key: "admingotAmount",
    //   render: (record: Transactions) => {
    //     const admingotAmount = record;
    //     return `$ ${admingotAmount}`;
    //   },
    // },
    // {
    //   title: "To WebHost",
    //   dataIndex: "vendorPaidAmount",
    //   key: "vendorPaidAmount",
    //   render: (record: TransactionList) => {
    //     const vendorPaidAmount = record;
    //     return `$ ` + vendorPaidAmount;
    //   },
    // },
    {
      title: "Revenue",
      dataIndex: "contentWriterPaidAmount",
      key: "contentWriterPaidAmount",
      render: (record: Transactions) => {
        const contentWriterPaidAmount = record;
        return contentWriterPaidAmount ? `$ ` + contentWriterPaidAmount : "";
      },
    },
    {
      title: "Transaction Date",
      dataIndex: "createdAt",
      render: (date:string) => DateTimeFormat(date || '', dataFormat.MMM_DD_YYYY_hh_mm_a )
    },
    {
      title: "Payment Status",
      render: (record: Transactions) =>  record?.isPaidToCW ? PAYMENT_STATUS.CLEARED : PAYMENT_STATUS.PENDING,
      filterMultiple: false,
      filters: Object.keys(PAYMENT_STATUS).map((k) => {
        return {
          text: PAYMENT_STATUS[k],
          value: PAYMENT_STATUS[k],
        };
      }),
    },
    {
      title: "CP Payment Date",
      dataIndex: "cpPaymentDate",
      render: (date:string) => date ? DateTimeFormat(date, dataFormat.MMM_DD_YYYY_hh_mm_a ) : "-"
    },
  ];

  return (
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
              setShowSearch(e.target.value);
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
        dataSource={data && data?.getAllContentWriterPayments?.nodes}
        loading={loading}
        pagination={{
          pageSize,
          current,
          total: data && data?.getAllContentWriterPayments?.totalCount,
        }}
        bordered
        showSizeChanger={
          data?.getAllContentWriterPayments?.totalCount >= 10 ? true : false
        }
        onChange={handleTableChange}
        className="main-transactions-table"
        scroll={{ x: "max-content" }}
      />
    </SliderComponent>
  );
};
export default withAuth(ContentWriterTransactions, UserRoleType.ContentWriter);
