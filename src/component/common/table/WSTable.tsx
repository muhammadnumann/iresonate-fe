import React, { FC } from "react";
import { Table } from "antd";
import { TableProps } from "antd/lib/table";

import "./WSTable.less";

interface CustomTableProps extends TableProps<any> {
  className?: string;
  showSizeChanger?: boolean;
}

export const WSTable: FC<CustomTableProps> = ({
  className,
  pagination = false,
  dataSource,
  loading,
  columns,
  onChange,
  expandable,
  bordered,
  expandedRowRender,
  scroll

}) => {

  return (
    <Table
      className={`${className} ws-table`}
      pagination={pagination ? { ...pagination, showSizeChanger: true } : pagination}
      rowKey="_id"
      dataSource={dataSource}
      loading={loading}
      columns={columns}
      onChange={onChange}
      expandable={expandable}
      bordered={bordered}
      expandedRowRender={expandedRowRender}
      scroll={scroll}
    />
  );
};
