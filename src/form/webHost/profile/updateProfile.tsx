import React from "react";
import { MutationFunction, useLazyQuery } from "@apollo/client";
import { Form, InjectedFormikProps } from "formik";

// component
import { WSLoader } from "src/component/common";
import SliderComponent from "src/layouts/MainLayout";
import { HeadElement } from "src/component/core";
import EditVendorForm from "src/form/admin/webHostList-edit-form/edit";

// constant
import metaTitle from "src/utils/metaTitle";
import { Vendor } from 'src/typeGeneratedAdmin'
import { cardTitle, formLabelName, LOCAL_STORAGE_KEY } from "src/utils/enums";
import { clientAdmin } from "pages/_app";
import { GET_BANK_URL_VERIFICATION } from "src/graphql/Queries/queries";
import { localStorageRemoveItem } from "src/utils/helper";
import { copyScriptLink } from "src/utils/commonFunction";

export interface EditProfileWebHostFormikProps {
  loading?: boolean
  isEdit?: boolean
  initialData?: Vendor
  mutate?: MutationFunction
  btnLoading?:boolean
}

export interface EditProfileWebHostFormProps {
  webhostCorporateName?: string
  irsEinNumber?: string
  primaryTelephoneNumber: string
  // Physical Address
  pStreetAddress: string
  pPostalCode: string
  pCity: string
  pState: string
  pCountry: string
  // Mailing Address
  // mStreetAddress: string
  // mPostOfficeBoxNumber: string
  // mPostalCode: string
  // mCity: string
  // websites: any
  // mState: string
  // mCountry: string

  f_firstName: string
  f_title: string
  f_lastName: string
  f_designation: string
  f_email: string
  f_phoneNumber: string
  f_telephoneNumber: string

  t_firstName: string
  t_title: string
  t_lastName: string
  t_designation: string
  t_email: string
  t_phoneNumber: string
  t_telephoneNumber: string
  websiteTitle?: string
  websites: {
    url: string
    clickTip: boolean
  }[]
}



const WebHostProfileUpdate: React.FC<
  InjectedFormikProps<EditProfileWebHostFormikProps, any >
> = ({ handleSubmit, loading, btnLoading, errors, setFieldValue, values, initialData }) => {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const [getWebsiteUrl, { loading:bankBtnLoading }] = useLazyQuery(GET_BANK_URL_VERIFICATION,{
      client: clientAdmin,
      onCompleted: (data) => {
        openInNewTab(data?.getUrlForBankVerification)
        localStorageRemoveItem(LOCAL_STORAGE_KEY.STRIPE_ACCOUNT_STATUS)
      },
    }
  )

  const okFunction =  () => {
    getWebsiteUrl({
      variables: {
        country: 'us',
      },
    })
  }
  return (
    <>
      <HeadElement title={metaTitle?.webHostProfile} />
      <SliderComponent>
        {loading ? (
          <WSLoader className="d-flex justify-content-center align-items-center h-100" />
        ) : (
          <Form>
            <EditVendorForm onSubmit={() => handleSubmit()}
              btnLoading={btnLoading}
              errors={errors}
              values={values}
              setFieldValue={setFieldValue}
              cardTitle={cardTitle?.editWebHostProfile}
              addBankAccount
              addBankButtonName={initialData?.isBankAccountAdded ? formLabelName.editYourBankAccount : formLabelName.addYourBankAccount }
              bankBtnSubmit={okFunction}
              bankBtnLoading={bankBtnLoading}
              copyScriptClickURL={copyScriptLink(initialData?.vendorIdentity)}
            />
          </Form>
        )}
      </SliderComponent>
    </>
  )
}
export default WebHostProfileUpdate;
