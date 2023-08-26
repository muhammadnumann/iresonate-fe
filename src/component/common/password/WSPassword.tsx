import React from "react";
import { Field, FieldProps } from "formik";
import Password, { PasswordProps } from "antd/lib/input/Password";

import { WSError } from "../errorMessage/WSError";

import "./WSPassword.less";
import { camelCaseToNormalCase } from "src/utils/helper";

interface CustomPasswordProps extends PasswordProps {
  name: string;
  label?: string;
  inputLabel?:boolean
  normalLabel?:string
}
const MyPassword = ({ field, ...props }: FieldProps & PasswordProps) => (
  <Password {...props} {...field} />
);
export const WSPassword: React.FC<CustomPasswordProps> = ({
  name,
  label,
  inputLabel,
  normalLabel,
  placeholder,
  onKeyDown,
  className,
  type,
  required
}) => {
  return (
    <div className="ws-password">
       {inputLabel && <div className="input-label">
        <label>{normalLabel ? normalLabel : camelCaseToNormalCase(label || name || '')}</label>
      </div>}
      <Field name={name} type={type} required={required} placeholder={placeholder} className={className} onKeyDown={onKeyDown} component={MyPassword} />
      <WSError name={name} />
    </div>
  );
};
