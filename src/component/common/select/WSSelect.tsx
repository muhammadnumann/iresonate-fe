import React from "react";
import { Select } from "antd";
import { Field, FieldProps } from "formik";
import { WSError} from "../errorMessage/WSError";

const { Option } = Select;

interface IListData {
  title: string;
  id?: string;
}

interface WSSelectProps  {
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  data?: IListData[];
  isFormik?: boolean;
  name: string;
  mode?: "multiple" | "tags" | undefined;
  setFieldValue?: (name: string, event: []) => void;
  onSelectItem?: (e: any) => void;
  placeholder?: string;
  value?: number | string | string[];
  onSelect?: (name: string, event: []) => void;
  titleIndex?: string;
  className?:string
}

export const WSSelect = (props: WSSelectProps) => {
  const {
    data: listData,
    name,
    setFieldValue,
    mode,
    isFormik,
    onSelectItem,
    placeholder,
    value,
    className
  } = props;

  
  return (
    <>
      {isFormik ? (
        <>
          <div className="form-component">
            <Field name={name}>
              {(field: FieldProps) => (
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder={placeholder}
                  {...field}
                  value={value}
                  className={`${className} fullwidth`}
                  mode={mode}
                  onChange={(event: any) => {
                    if (setFieldValue) {
                      setFieldValue(
                        name,
                        event || (listData && listData[0].title)
                      );
                    }
                  }}
                >
                  {listData &&
                    listData.map((dataArr: any, index) => (
                      <Option key={index.toString()} value={dataArr.id}>
                        {dataArr.title}
                      </Option>
                    ))}
                </Select>
              )}
            </Field>
          </div>
          <WSError name={name} />
        </>
      ) : (
        <>
          {placeholder}
          <Select
            getPopupContainer={(trigger) => trigger.parentNode}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              onSelectItem && onSelectItem(e);
            }}
          >
            {listData &&
              listData.map((dataArr: any, index) => (
                <Option key={index.toString()} value={dataArr.id}>
                  {dataArr.title}
                </Option>
              ))}
          </Select>
        </>
      )}
    </>
  );
};

