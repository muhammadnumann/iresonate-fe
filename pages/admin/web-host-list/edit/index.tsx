import { useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { withFormik } from 'formik'
import { useRouter } from 'next/router'
import { clientAdmin } from 'pages/_app'
import { WSMessage } from 'src/component/common/message/WSMessage'
import WebHostAdminEdit, { EditAdminWebHostFormikProps, EditAdminWebHostFormProps } from 'src/form/admin/webhost-edit-page/web-Host-edit'
import { UPDATE_VENDOR_FROM_ADMIN } from 'src/graphql/Mutations/mutation'
import { GET_USER } from 'src/graphql/Queries/queries'
import routPath from 'src/routes/routes'
import { AddressType, Vendor } from 'src/typeGeneratedAdmin'
import { NetworkOnly } from 'src/utils/enums'
import { editWebHostAdminSchema } from 'src/utils/formikValidation'

const EditWebHostFormikApp = withFormik<EditAdminWebHostFormikProps, any>({
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
      // Mailing Address

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
  handleSubmit(values, { props }) {
    props?.mutate({
      variables: {
        input: {
          primaryTelePhoneNumber: values?.primaryTelephoneNumber,
          _id: props?.initialData?._id || '',
          webhostCorporateName: values?.webhostCorporateName,
          websites: values?.websites,
          address: [
            {
              street: values.pStreetAddress,
              city: values.pCity,
              postalCode: values.pPostalCode,
              addressType: AddressType.Physical,
              country: values.pCountry,
              state: values.pState,
            }
          ],
          // finansialContact: {
          //   firstName: values?.f_firstName,
          //   title: values?.f_title,
          //   lastName: values?.f_lastName,
          //   jobTitle: values?.f_designation,
          //   email: values?.f_email,
          //   officeTelePhoneNumber: values?.f_phoneNumber,
          //   directTelePhoneNumber: values?.f_telephoneNumber,
          // },
          // technicalContact: {
          //   firstName: values?.t_firstName,
          //   title: values?.t_title,
          //   lastName: values?.t_lastName,
          //   jobTitle: values?.t_designation,
          //   email: values?.t_email || "",
          //   officeTelePhoneNumber: values?.t_phoneNumber,
          //   directTelePhoneNumber: values?.t_telephoneNumber,
          // },
          primaryFocus: '',
          platformCharges: values?.platformCharges || "",
          userDetail: {
            title: values?.userDetail_title || '',
            lastName: values?.userDetail_lastName || '',
            firstName: values?.userDetail_firstName || '',
          },
          userRole: values?.userRole || '',
          hosting: '',
          email: values?.f_email || '',
        },
      },
    })
  },
})(WebHostAdminEdit)

const EditWebHostFormikWrapper = () => {
  const router = useRouter()

  const { id } = router?.query
  const [getMember, { data, loading }] = useLazyQuery<{
    getUser: Vendor
  }>(GET_USER, {
    fetchPolicy: NetworkOnly,
    client: clientAdmin,
    variables: {
      id,
    },
  })

  useEffect(() => {
    id && getMember()
  }, [id])

  const [updateMutate, { loading: updateLoading }] =
    useMutation(UPDATE_VENDOR_FROM_ADMIN, {
      client: clientAdmin,
      onCompleted: (data) => {
        if (data) {
          router?.push(routPath.webHostList)
          return WSMessage({
            type: 'success',
            messageValue: data?.updateVendor?.message,
          })
        }
      },
    })

  return (
    <EditWebHostFormikApp
      mutate={updateMutate}
      loading={loading}
      btnLoading={updateLoading}
      initialData={data?.getUser}
    />
  )
}
export default EditWebHostFormikWrapper
