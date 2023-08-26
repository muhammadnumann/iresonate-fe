import * as React from "react";
import { DatePicker } from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
const { RangePicker } = DatePicker;
import "./WSDate.less"

export const WSDate: React.FC<RangePickerProps> = ({
  className,
  children,
  ...props
}) => {
  function disabledDate(current: any) {
    // Can not select days after today
    return current && current.valueOf() > new Date();
  }
  return (
    <>
      <RangePicker disabledDate={disabledDate} {...props} dropdownClassName="ws-date-dropdown" inputReadOnly />
    </>
  );
};
