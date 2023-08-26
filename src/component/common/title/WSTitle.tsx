import React from "react";
import { Typography } from "antd";
import { TitleProps } from "antd/lib/typography/Title";

import "./WSTitle.less";

const { Title } = Typography;

interface CustomTitleProps {
  name?: string;
  inlineClassName?: string;
  onClick?: (e) => void;
  className?:string
}
export const title = Title;

export const WSTitle: React.FC<TitleProps & CustomTitleProps> = ({ children,className, ...props }) => {
  return (
    <Title {...props} className={`ws-title ${className}`}>
      {children}
    </Title>
  );
};

export const MenuTitle = ({
  name,
  inlineClassName,
  onClick,
}: CustomTitleProps) => {
  return (
    <p className={`small-gray-text ${inlineClassName}`} onClick={onClick}>
      {name}
    </p>
  );
};
