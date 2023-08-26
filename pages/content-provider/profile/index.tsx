import React, { useEffect } from 'react'
import { withFormik } from 'formik'
import { useLazyQuery, useMutation } from '@apollo/client'

// Component
import { WSMessage } from 'src/component/common'
import ContentProviderProfileUpdate, { EditProfileContentProviderFormikProps, EditProfileContentProviderFormProps } from 'src/form/contentProvider/profile/updateProfile'
// constant
import {
  AddressType,
  ContentWriterDetail,
} from 'src/typeGeneratedAdmin'
import { GET_USER } from 'src/graphql/Queries/queries'
import { clientAdmin } from 'pages/_app'
import { UPDATE_CONTENT_WRITER_PROFILE } from 'src/graphql/Mutations/mutation'
import { UpdateVendorContentWriterSchema } from 'src/utils/formikValidation'
import { getCurrentUser } from 'src/utils/helper'
import { withAuth } from 'src/routecheck'
import { UserRoleType } from 'src/types'

const EditProfileContentProviderFormikApp = withFormik<
  EditProfileContentProviderFormikProps,
  EditProfileContentProviderFormProps
>({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { initialData } = props
    const PhysicalAddress = initialData?.address?.find(
      (item) => item?.addressType === AddressType.Physical
    )
    const MailingAddress = initialData?.address?.find(
      (item) => item?.addressType === AddressType.Mailing
    )
    return {
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      // middleName: initialData?.middleName || '',
      markUp: initialData?.markUp || '',
      email: initialData?.email || '',
      mobileNumber: initialData?.mobileNumber || '',
      // landlineNumber: initialData?.landlineNumber || '',
      // Physical Address
      pStreetAddress: PhysicalAddress?.street,
      pPostalCode: PhysicalAddress?.postalCode,
      pCity: PhysicalAddress?.city,
      pState: PhysicalAddress?.state,
      pCountry: PhysicalAddress?.country,

      // Mailing Address
      mStreetAddress: MailingAddress?.street,
      mPostalCode: MailingAddress?.postalCode,
      mCity: MailingAddress?.city,
      mState: MailingAddress?.state,
      mCountry: MailingAddress?.country,
    }
  },
  validationSchema: UpdateVendorContentWriterSchema,
  handleSubmit(values, { props }) {
    props.mutate({
      variables: {
        input: {
          firstName: values.firstName,
          middleName: values.middleName,
          lastName: values.lastName,
          mobileNumber: values.middleName,
          landlineNumber: values.landlineNumber,
          markUp: values.markUp || '',
          _id: props?.initialData?._id || '',
          address: [
            {
              street: values.pStreetAddress,
              city: values.pCity,
              postalCode: values.pPostalCode,
              addressType: AddressType.Physical,
              country: values.pCountry,
              state: values.pState,
            },
            {
              street: values.mStreetAddress,
              city: values.mCity,
              postalCode: values.mPostalCode,
              addressType: AddressType.Mailing,
              country: values.mCountry,
              state: values.mState,
            },
          ],
        },
      },
    })
  },
})(ContentProviderProfileUpdate)

const EditProfileContentWriterFormikWrapper = (props: EditProfileContentProviderFormikProps) => {
  const currentUser = getCurrentUser();
  const [getContentProvider, { data, loading }] = useLazyQuery<{
    getUser: ContentWriterDetail
  }>(GET_USER, {
    client: clientAdmin,
    variables: {
      id: currentUser?._id,
    },
  })

  useEffect(() => {
    getContentProvider()
  }, [currentUser?._id])

  const [updateMutate, { loading: updateLoading }] =
    useMutation(UPDATE_CONTENT_WRITER_PROFILE, {
      client: clientAdmin,
      onCompleted: (data) => {
        if (data) {
          return WSMessage({
            type: "success",
            messageValue: data?.updateContentWriterProfile?.message,
          });
        }
      }
    })

  return (
    <EditProfileContentProviderFormikApp
      mutate={updateMutate}
      loading={loading}
      btnLoading={updateLoading}
      initialData={data?.getUser}
    />
  )
}
export default withAuth(EditProfileContentWriterFormikWrapper, UserRoleType.ContentWriter)

