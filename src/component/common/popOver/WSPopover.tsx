import React, { FC, ReactNode } from "react";
import { Popover } from "antd";
import { PopoverProps } from "antd/lib/popover";

export const WSPopover: FC<PopoverProps> = ({ children, ...props }) => {
  return (
    <>
      <Popover {...props}>{children}</Popover>
    </>
  );
};
export default WSPopover;
