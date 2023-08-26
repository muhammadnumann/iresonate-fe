import React, { FC } from "react";
import Input, { InputProps } from "antd/lib/input";
import { Field, FieldProps } from "formik";
import { WSError } from "../errorMessage/WSError";
import { camelCaseToNormalCase } from "src/utils/helper";
//style
import "./WSInput.less";
export interface CustomInputProps extends InputProps {
  label?: string;
  inputLabel?: boolean
  normalLabel?: string
  parentClassName?: string

}

export const MyInput = ({ ...props }: InputProps) => (
  <Input {...props} />
);

export const WSInput: FC<CustomInputProps> = ({
  type,
  onKeyDown,
  name,
  label,
  inputLabel,
  placeholder,
  normalLabel,
  parentClassName,
  ...props
}) => {
  return (
    <div className={`ws-input ${parentClassName}`}>
      {inputLabel && <div className="input-label">
        <label>{normalLabel ? normalLabel : camelCaseToNormalCase(label || name || '')}</label>
      </div>}
      <Field name={name} >
        {({ field }: FieldProps) => (
          <MyInput type={type} placeholder={placeholder} onKeyDown={onKeyDown} {...field} {...props} />
        )}
      </Field>
      <WSError name={name} />
    </div>
  );
};
