import React from "react";
import { Col } from "antd";
import { ColProps } from "antd/lib/col";

export const WSCol: React.FC<ColProps> = ({ children, ...props }) => {
  return <Col {...props}>{children}</Col>;
};
