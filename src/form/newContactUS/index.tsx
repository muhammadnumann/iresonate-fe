import React, { useState } from 'react'
import { MutationFunction, useMutation } from '@apollo/client'
import { withFormik } from 'formik'
import { SAVE_CONTACT_US } from 'src/graphql/Mutations/mutation'
import NewContactUsPage from './newContact'


export interface ContactUsIProps {
  loading: boolean
  successMessage: boolean
  mutate?: MutationFunction
  setSuccessMessage: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ContactUsFormProps {
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  message: string
  gender: string
}

const ContactUsFormHandler = withFormik<ContactUsIProps, ContactUsFormProps>({
  mapPropsToValues: () => ({
    email: '',
    firstName: '',
    lastName: '',
    message: '',
    mobileNumber: '',
    gender: ''
  }),
  // validationSchema: ContactUsValidation,
  handleSubmit: async (values, { props }) => {
    const { firstName, lastName, email, mobileNumber, message, gender } = values
    console.log(values)
    await props?.mutate({
      variables: {
        input: {
          fullname: firstName + " " + lastName,
          email,
          message,
          mobileNumber,
          gender
        },
      },
    })
  },
})(NewContactUsPage)

const NewContactUsForm = () => {
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

export default NewContactUsForm
