import React from "react";
import { MutationFunction, useLazyQuery } from "@apollo/client";
import { Form, InjectedFormikProps } from "formik";

// component
import { WSLoader } from "src/component/common";
import { HeadElement } from "src/component/core";
import EditContentWriters from "src/form/vendor-contentwriterlist-edit-form/edit";

// constant
import metaTitle from "src/utils/metaTitle";
import { ContentWriterDetail } from 'src/typeGeneratedAdmin'
import { UserRoleType } from "src/types";
import { withAuth } from "src/routecheck";
import { localStorageRemoveItem } from "src/utils/helper";
import { clientAdmin } from "pages/_app";
import { GET_BANK_URL_VERIFICATION } from "src/graphql/Queries/queries";
import { cardTitle, formLabelName, LOCAL_STORAGE_KEY } from "src/utils/enums";
import { copyScriptLink } from "src/utils/commonFunction";

export interface EditProfileContentProviderFormikProps {
  loading?: boolean
  initialData?: ContentWriterDetail
  mutate?: MutationFunction
  btnLoading?:boolean
  disabledFieldView?:boolean
}

export interface EditProfileContentProviderFormProps {
  firstName?: string
  middleName?: string
  lastName?: string
  email?: string
  mobileNumber?: string
  landlineNumber?: string
  markUp?: string | number
  // Physical Address
  pStreetAddress?: string
  pPostalCode?: string
  pCity?: string
  pState?: string
  pCountry?: string
  // Mailing Address
  mStreetAddress?: string
  mPostalCode?: string
  mCity?: string
  mState?: string
  mCountry?: string
}

const ContentProviderProfileUpdate: React.FC<
  InjectedFormikProps<EditProfileContentProviderFormikProps, EditProfileContentProviderFormProps >
> = ({ handleSubmit,loading, btnLoading, initialData }) => {
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
      <HeadElement title={metaTitle.contentProviderProfile} />
        {loading ? (
          <WSLoader className="d-flex justify-content-center align-items-center h-100vh" />
        ) : ( 
        <Form>
            <EditContentWriters onSubmit={handleSubmit} 
            mutateLoading={btnLoading} 
            markupDisabled 
            addBankAccount  
            addBankButtonName={initialData?.isBankAccountAdded ? formLabelName.editYourBankAccount : formLabelName.addYourBankAccount }
            bankBtnSubmit={okFunction}
            bankBtnLoading={bankBtnLoading}
            cardTitle={cardTitle.editContentProviderProfile}
            copyScriptClickURL={copyScriptLink(initialData?.vendorId?.vendorIdentity,initialData?._id)}
            />
          </Form> 
        )}
    </>
  )
}
export default withAuth(ContentProviderProfileUpdate,UserRoleType.ContentWriter);