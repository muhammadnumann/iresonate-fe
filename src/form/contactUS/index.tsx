import React, { useState } from 'react'
import { MutationFunction, useMutation } from '@apollo/client'
import { withFormik } from 'formik'

import ContactUsPage from './Contact'

import { SAVE_CONTACT_US } from 'src/graphql/Mutations/mutation'
import { ContactUsValidation } from 'src/utils/formikValidation'


export interface ContactUsIProps {
  loading?: boolean
  successMessage?: boolean
  mutate?: MutationFunction
  setSuccessMessage: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ContactUsFormProps {
  fullname: string
  email: string
  mobileNumber: string
  message: string
}

const ContactUsFormHandler = withFormik<ContactUsIProps, ContactUsFormProps>({
  mapPropsToValues: () => ({
    email: '',
    fullname: '',
    message: '',
    mobileNumber: '',
  }),
  validationSchema: ContactUsValidation,
  handleSubmit: async (values, { props, resetForm }) => {
    const { fullname, email, mobileNumber, message } = values
    await props?.mutate({
      variables: {
        input: {
          fullname,
          email,
          message,
          mobileNumber,
        },
      },
    })
    resetForm()
  },
})(ContactUsPage)

const ContactUsForm = () => {
  const [successMessage, setSuccessMessage] = useState<boolean>(false)
  const [mutate, { loading }] = useMutation(SAVE_CONTACT_US, {
    onCompleted: (data) => {
      if (data?.saveContactUs) {
        setSuccessMessage(true)
      }
    },
  })
  return (
    <>
      <ContactUsFormHandler
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        loading={loading}
        mutate={mutate}
      />
    </>
  )
}

export default ContactUsForm
