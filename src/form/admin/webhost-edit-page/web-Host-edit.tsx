import React from "react";
import { MutationFunction } from "@apollo/client";
import { Form, InjectedFormikProps } from "formik";

// component
import { WSLoader } from "src/component/common";
import SliderComponent from "src/layouts/MainLayout";
import { HeadElement } from "src/component/core";
import EditVendorForm from "src/form/admin/webHostList-edit-form/edit";
// constant
import metaTitle from "src/utils/metaTitle";
import { Vendor } from 'src/typeGeneratedAdmin'
import { cardTitle } from "src/utils/enums";

export interface EditAdminWebHostFormikProps {
  loading?: boolean
  isEdit?: boolean
  initialData?: Vendor
  mutate?: MutationFunction
  btnLoading?: boolean
}

export interface EditAdminWebHostFormProps {
  webhostCorporateName?: string
  primaryTelephoneNumber: string
  platformCharges: string

  pCountry: string
  websites: any
  userRole: string
  hosting: string

  userDetail_title: string
  userDetail_lastName: string
  userDetail_firstName: string


  websiteTitle?: string
}

const WebHostAdminEdit: React.FC<
  InjectedFormikProps<EditAdminWebHostFormikProps, any>
> = ({ handleSubmit, btnLoading, loading, values, errors, setFieldValue }) => {
  return (
    <>
      <HeadElement title={metaTitle.EditWebHost} />
      <SliderComponent>
        {loading ? (
          <WSLoader className="d-flex justify-content-center align-items-center h-100" />
        ) : (
          <Form>
            <EditVendorForm onSubmit={() => handleSubmit()} btnLoading={btnLoading} errors={errors}
              values={values}
              setFieldValue={setFieldValue}
              cardTitle={cardTitle.editWebHost}
            />
          </Form>
        )}
      </SliderComponent>
    </>
  )
}
export default WebHostAdminEdit;
