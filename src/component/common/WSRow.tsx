import React from "react";
import { Row } from "antd";
import { RowProps } from "antd/lib/row";

export const WSRow: React.FC<RowProps> = ({ children, ...props }) => {
  return <Row {...props}>{children}</Row>;
};
