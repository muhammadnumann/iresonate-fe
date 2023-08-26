import React, { useState, useEffect } from 'react'
import { withFormik } from 'formik'
import { useRouter } from 'next/router'
import { useLazyQuery, useMutation } from '@apollo/client'

// Component
import { WSMessage } from 'src/component/common/message/WSMessage'
import WebHostContentProviderUpdate,{EditWebHostCPFormikProps,EditWebHostCPFormProps}from 'src/form/webHost/contentProviderList/Edit/webHostContentProviderUpdate'
// constant
import {
  AddressType,
  ContentWriterDetail,
} from 'src/typeGeneratedAdmin'
import { GET_USER } from 'src/graphql/Queries/queries'
import { clientAdmin } from 'pages/_app'
import { UPDATE_CONTENT_WRITER_FROM_VENDOR } from 'src/graphql/Mutations/mutation'
import { UpdateVendorContentWriterSchema } from 'src/utils/formikValidation'
import routPath from 'src/routes/routes'
import { NetworkOnly } from 'src/utils/enums'

const EditContentWriterFormikApp = withFormik<
EditWebHostCPFormikProps,
EditWebHostCPFormProps
>({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { initialData } = props
    const PhysicalAddress = initialData?.address?.find(
      (item) => item?.addressType === AddressType.Physical
    )

    return {
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      title: initialData?.title || '',
      markUp: initialData?.markUp || '',
      email: initialData?.email || '',
      mobileNumber: initialData?.mobileNumber || '',
      // Physical Address
      pStreetAddress: PhysicalAddress?.street,
      pPostalCode: PhysicalAddress?.postalCode,
      pCity: PhysicalAddress?.city,
      pState: PhysicalAddress?.state,
      pCountry: PhysicalAddress?.country,
    }
  },
  validationSchema: UpdateVendorContentWriterSchema,
  handleSubmit(values, { props }) {
    props.mutate({
      variables: {
        input: {
          firstName: values.firstName,
          title: values.title,
          lastName: values.lastName,
          mobileNumber: values.mobileNumber,
          // landlineNumber: values.landlineNumber,
          markUp: +values?.markUp || '',
          _id: props?.initialData?._id || '',
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
        },
      },
    })
  },
})(WebHostContentProviderUpdate)

const EditContentWriterFormikWrapper = () => {
  const router = useRouter()
  const [disabledField, setDisabledField] = useState(false)
  const { id } = router?.query

  const [getMember, { data, loading }] = useLazyQuery<{
    getUser: ContentWriterDetail
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

  useEffect(() => {
    if (router?.query?.view) {
      setDisabledField(true)
    }
  }, [router?.query])

  const [updateMutate, { loading: updateLoading }] =
    useMutation(UPDATE_CONTENT_WRITER_FROM_VENDOR, {
      client: clientAdmin,
      onCompleted: (data) => {
        if (data) {
          router?.push(routPath.webHostContentProvider)
          return WSMessage({
            type: "success",
            messageValue: data?.updateContentWriterByVendor?.message,
          });
        }
      }
    })

  return (
    <EditContentWriterFormikApp
      mutate={updateMutate}
      loading={loading}
      mutateLoading={updateLoading}
      initialData={data?.getUser}
      disabledFieldView={disabledField}
    />
  )
}
export default EditContentWriterFormikWrapper
