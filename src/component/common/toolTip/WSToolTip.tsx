import React, { FC } from "react";
import { Tooltip } from "antd";
import "./WSToolTip.less";
import { TooltipProps } from 'antd/lib/tooltip';

export const WSToolTip: FC<TooltipProps> = ({
  children,
  ...props
}) => {
  return (
    <Tooltip {...props}>
      {children}
    </Tooltip>
  );
};
