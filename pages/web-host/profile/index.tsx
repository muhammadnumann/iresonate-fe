
import { useEffect } from "react";
import { withFormik } from "formik";
import { useLazyQuery, useMutation } from "@apollo/client";
import WebHostProfileUpdate, { EditProfileWebHostFormikProps, EditProfileWebHostFormProps } from "src/form/webHost/profile/updateProfile";
import { WSMessage } from "src/component/common";
import {  UPDATE_VENDOR_FROM_ADMIN } from "src/graphql/Mutations/mutation";
import { GET_USER } from "src/graphql/Queries/queries";
import { AddressType, Vendor } from "src/typeGeneratedAdmin";
import { NetworkOnly } from "src/utils/enums";
import { getCurrentUser } from "src/utils/helper";
import { clientAdmin } from "pages/_app";
import { withAuth } from "src/routecheck";
import { UserRoleType } from "src/types";
import { editWebHostAdminSchema } from "src/utils/formikValidation";


const EditWebHostProfileFormikApp = withFormik<EditProfileWebHostFormikProps,EditProfileWebHostFormProps>({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { initialData } = props
    const PhysicalAddress = initialData?.address?.find(
      (item) => item?.addressType === AddressType.Physical
    )

    return {
      webhostCorporateName: initialData?.webhostCorporateName,
      irsEinNumber: initialData?.irsEinNumber,
      // Physical Address
      pStreetAddress: PhysicalAddress?.street,
      pPostalCode: PhysicalAddress?.postalCode,
      pCity: PhysicalAddress?.city,
      pState: PhysicalAddress?.state,
      pCountry: PhysicalAddress?.country,
      // Primary Telephone Number
      primaryTelephoneNumber: initialData?.primaryTelePhoneNumber || '',

      // Add WebSite
      websites:
        initialData?.websites.map(({ __typename, ...item }) => item) || [],
      websiteTitle: '',

      // Financial Contact Information
      f_firstName: initialData?.finansialContact?.firstName,
      f_title: initialData?.finansialContact?.title,
      f_lastName: initialData?.finansialContact?.lastName,
      f_designation: initialData?.finansialContact?.jobTitle,
      f_email: initialData?.finansialContact?.email,
      f_phoneNumber: initialData?.finansialContact?.officeTelePhoneNumber,
      f_telephoneNumber: initialData?.finansialContact?.directTelePhoneNumber,

      // Technical Contact Information
      t_firstName: initialData?.technicalContact?.firstName,
      t_title: initialData?.technicalContact?.title,
      t_lastName: initialData?.technicalContact?.lastName,
      t_designation: initialData?.technicalContact?.jobTitle,
      t_email: initialData?.technicalContact?.email,
      t_phoneNumber: initialData?.technicalContact?.officeTelePhoneNumber,
      t_telephoneNumber: initialData?.technicalContact?.directTelePhoneNumber,
    }
  },
  validationSchema: editWebHostAdminSchema,
  handleSubmit: (values, { props }) => {
    props?.mutate({
      variables: {
        input: {
          primaryTelePhoneNumber: values?.primaryTelephoneNumber,
          _id: props?.initialData?._id || '',
          webhostCorporateName: values?.webhostCorporateName,
          irsEinNumber: values?.irsEinNumber,
          websites: values?.websites,
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
              street: values.pStreetAddress,
              city: values.pCity,
              postalCode: values.pPostalCode,
              addressType: AddressType.Mailing,
              country: values.pCountry,
              state: values.pState,
            },
          ],
          finansialContact: {
            firstName: values?.f_firstName,
            title: values?.f_title,
            lastName: values?.f_lastName,
            jobTitle: values?.f_designation,
            email: values?.f_email,
            officeTelePhoneNumber: values?.f_phoneNumber,
            directTelePhoneNumber: values?.f_telephoneNumber,
          },
          technicalContact: {
            firstName: values?.t_firstName,
            title: values?.t_title,
            lastName: values?.t_lastName,
            jobTitle: values?.t_designation,
            email: values?.t_email,
            officeTelePhoneNumber: values?.t_phoneNumber,
            directTelePhoneNumber: values?.t_telephoneNumber,
          },
        },
      },
    })
  },
})(WebHostProfileUpdate);

const EditWebHostProfileFormikWrapper = (props:EditProfileWebHostFormikProps) => {
 const currentUser = getCurrentUser();
  const [getVender, { data,loading }] = useLazyQuery<{
    getUser: Vendor
  }>(GET_USER, {
    fetchPolicy: NetworkOnly,
    client: clientAdmin,
    variables: {
      id : currentUser?._id,
    },
  })
  useEffect(() => {
    getVender()
  }, [currentUser?._id])

  const [updateMutate, { loading: updateLoading }] =
  useMutation(UPDATE_VENDOR_FROM_ADMIN, {
    client: clientAdmin,
    onCompleted: (data) => {
      if (data) {
        return WSMessage({
          type: 'success',
          messageValue: data?.updateVendor?.message,
        })
      }
    },
  })
  return <EditWebHostProfileFormikApp mutate={updateMutate} loading={loading} initialData={data?.getUser} btnLoading={updateLoading} />
}

export default withAuth(EditWebHostProfileFormikWrapper, UserRoleType.Vendor)

