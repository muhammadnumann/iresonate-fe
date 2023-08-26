import { useEffect, useState } from 'react'
import { withFormik } from 'formik'
import { useRouter } from 'next/router'
import { useLazyQuery } from '@apollo/client'

import EditContentWriters, {
  EditContentWriterFormProps,
  EditContentWriterProps,
} from 'src/form/vendor-contentwriterlist-edit-form/edit'

import { AddressType, ContentWriterDetail } from 'src/typeGeneratedAdmin'
import { GET_USER } from 'src/graphql/Queries/queries'
import { clientAdmin } from 'pages/_app'
import routPath from 'src/routes/routes'
import { cardTitle, NetworkOnly } from 'src/utils/enums'
import metaTitle from 'src/utils/metaTitle'
import { HeadElement } from 'src/component/core'


const ViewContentWriterFormikApp = withFormik<
  EditContentWriterProps,
  EditContentWriterFormProps
>({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { initialData } = props
    const PhysicalAddress = initialData?.address?.find(
      (item) => item?.addressType === AddressType.Physical
    )
    // const MailingAddress = initialData?.address?.find(
    //   (item) => item?.addressType === AddressType.Mailing
    // )
    return {
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      title: initialData?.title || '',
      email: initialData?.email || '',
      markUp: initialData?.markUp || '',
      mobileNumber: initialData?.mobileNumber || '',
      // landlineNumber: initialData?.landlineNumber || '',
      // Physical Address
      pStreetAddress: PhysicalAddress?.street,
      pPostalCode: PhysicalAddress?.postalCode,
      pCity: PhysicalAddress?.city,
      pState: PhysicalAddress?.state,
      pCountry: PhysicalAddress?.country,

      // // Mailing Address
      // mStreetAddress: MailingAddress?.street,
      // mPostOfficeBoxNumber: MailingAddress?.postboxNumber,
      // mPostalCode: MailingAddress?.postalCode,
      // mCity: MailingAddress?.city,
      // mState: MailingAddress?.state,
      // mCountry: MailingAddress?.country,
    }
  },
  handleSubmit(values, { props }) { },
})(EditContentWriters)

const ViewContentWriterFormikWrapper = () => {
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
    if (router?.pathname === routPath.ContentProviderView) {
      setDisabledField(true)
    }
  }, [router?.pathname])

  return (
    <>
      <HeadElement title={metaTitle?.ViewContentWriter} />
      <ViewContentWriterFormikApp
        loading={loading}
        initialData={data?.getUser}
        disabledFieldView={disabledField}
        cardTitle={cardTitle.viewContentProvider}
      />
    </>
  )
}

export default ViewContentWriterFormikWrapper
