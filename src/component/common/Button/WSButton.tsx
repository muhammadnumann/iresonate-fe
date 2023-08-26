import React, { FC } from "react";
import Button ,{ ButtonProps } from "antd/lib/button";
import './WSButton.less'

export const WSButton: FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button {...props} className={className}>
      {children}
    </Button>
  );
};

