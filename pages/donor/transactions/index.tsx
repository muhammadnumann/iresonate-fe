import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import moment from "moment";

// component
import { SubHeader,HeadElement } from "src/component/core";
import { WSTable, WSDate, WSSpace, MyInput } from "src/component/common";
import SliderComponent from "src/layouts/MainLayout";
import { withAuth } from "src/routecheck";

// constant
import { GET_ALL_TRANSACTIONS } from "src/graphql/Queries/queries";
import {
  PaginatedTransactionListType,
  Transactions,
} from "src/typeGeneratedAdmin";
import {
  DateProps,
  MODULE_NAME_ENUM,
  PaginationProps,
  SortProps,
  UserRoleType,
} from "src/types";
import { DateTimeFormat } from "src/utils/helper";
import { constantPageSize } from "src/utils/staticData";
import metaTitle from "src/utils/metaTitle";
import { cardTitle, dataFormat, formLabelName, NetworkOnly, SortOrder, TransactionSortFieldTableEnum } from "src/utils/enums";

const MemberTransactions: React.FC<PaginatedTransactionListType> = ({
  ...props
}) => {
  const [current, setcurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(constantPageSize);
  const [showDate, setShowDate] = useState<DateProps>();
  const [showSearch, setshowSearch] = useState<string>("");

  const [sort] = useState<SortProps>({
    order: SortOrder.ASCENDING,
    field: TransactionSortFieldTableEnum.MEMBER_NAME,
  });

  const dateBetween = showDate
    ? {
      datesBetween: {
        fromDate: showDate && showDate.fromDate,
        toDate: showDate && showDate.toDate,
      },
    }
    : {};

  const handleTableChange = (pagination: PaginationProps) => {
    setcurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const [
    getAllMemberTransactions,
    { data, loading },
  ] = useLazyQuery(GET_ALL_TRANSACTIONS, {
    fetchPolicy: NetworkOnly,
  });

  useEffect(() => {
    getAllMemberTransactions({
      variables: {
        limit: pageSize,
        offset: current,
        searchTerm: showSearch,
        ...dateBetween,
      },
    });
  }, [sort, showSearch, pageSize, current, showDate]);

  const columns = [
    {
      title: "Website URL",
      render: (record: Transactions) => {
        return <a href={record?.websiteUrl} target="_blank" rel="noreferrer"> {record?.websiteUrl}</a>
      },
    },
    {
      title:"Web Host", 
      render:(record:Transactions) => record.vendor.webhostCorporateName
    },
    {
      title:"Content Provider", 
      render:(record:Transactions) => record?.contentWriter ? `${record?.contentWriter?.firstName} ${record?.contentWriter?.lastName}` : "-"
    },
    {
      title: "Donation",
      dataIndex: "amount",
      render: (record: Transactions) => {
        const amount = record;
        return `$ ` + amount;
      },
      sorter: (a: Transactions, b: Transactions) => a.amount - b.amount,
    },
    {
      title: "Transaction Date",
      dataIndex: "createdAt",
      render: (date: string) => DateTimeFormat(date || "-", dataFormat.MMM_DD_YYYY_hh_mm_a)
    },
    {
      title: "Payment Status",
      render: (record: Transactions) => {
        const { paymentStatus } = record;
        return `${MODULE_NAME_ENUM[paymentStatus]}`;
      },
      filters: Object.keys(MODULE_NAME_ENUM).map((k) => {
        return {
          text: MODULE_NAME_ENUM[k],
          value: MODULE_NAME_ENUM[k],
        };
      }),
      onFilter: (value, record) => {
        return MODULE_NAME_ENUM[record.paymentStatus].indexOf(value) === 0;
      },
    },
  ];

  return (
    <>
      <SliderComponent>
        <HeadElement title={metaTitle.Transactions} />
        <SubHeader level={4} title={cardTitle.transactions}>
          <WSSpace>
            <MyInput
              type="search"
              placeholder={formLabelName.search}
              onChange={(e) => {
                if (current >= 1) {
                  setcurrentPage(1);
                }
                setshowSearch(e.target.value);
              }}
            />
            <WSDate
              format={dataFormat.ddmmyyyy}
              onChange={(date, dateString) => {
                if (current >= 1) {
                  setcurrentPage(1);
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
          dataSource={data && data.getAllTransactions.nodes}
          loading={loading}
          pagination={{
            pageSize,
            current,
            total: data && data.getAllTransactions.totalCount,
          }}
          bordered
          showSizeChanger={
            data?.getAllTransactions?.totalCount >= 10 ? true : false
          }
          onChange={handleTableChange}
        />
      </SliderComponent>
    </>
  );
};
export default withAuth(MemberTransactions, UserRoleType.Member);
