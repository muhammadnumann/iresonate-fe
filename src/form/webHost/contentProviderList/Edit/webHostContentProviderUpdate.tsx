import React from "react";
import { MutationFunction } from "@apollo/client";
import { Form, InjectedFormikProps } from "formik";

// component
import { WSLoader } from "src/component/common";
import { HeadElement } from "src/component/core";
import EditContentWriters from "src/form/vendor-contentwriterlist-edit-form/edit";

// constant
import metaTitle from "src/utils/metaTitle";
import { ContentWriterDetail } from 'src/typeGeneratedAdmin'
import { cardTitle } from "src/utils/enums";

export interface EditWebHostCPFormikProps {
  loading?: boolean
  initialData?: ContentWriterDetail
  mutate?: MutationFunction
  mutateLoading?: boolean
  disabledFieldView:boolean
}

export interface EditWebHostCPFormProps {
  firstName?: string
  title?: string
  lastName?: string
  email?: string
  mobileNumber?: string
  markUp?: string | number
  // Physical Address
  pStreetAddress?: string
  pPostalCode?: string
  pCity?: string
  pState?: string
  pCountry?: string

}

const WebHostContentProviderUpdate: React.FC<
  InjectedFormikProps<EditWebHostCPFormikProps, EditWebHostCPFormProps >
> = ({ handleSubmit,loading, mutateLoading }) => {
  return (
    <>
      <HeadElement title={metaTitle.EditContentProvider} />
        {loading ? (
          <WSLoader className="d-flex justify-content-center align-items-center h-100vh" />
         ) : (
        <Form>
            <EditContentWriters onSubmit={handleSubmit} mutateLoading={mutateLoading}
            cardTitle={cardTitle.editContentProvider} />
          </Form>
        )}
    </>
  )
}
export default WebHostContentProviderUpdate;
