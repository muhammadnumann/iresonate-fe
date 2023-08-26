import React from 'react'
import { withFormik } from 'formik'
import { CallMutation } from 'src/graphql/graphqlHandler'
import AddContentWriterModel, {
  AddContentWriterProps,
} from './AddContentWriterModel'
import { useMutation } from '@apollo/client'
import { clientAdmin } from 'pages/_app'
import { CREATE_CONTENT_WRITER, UPDATE_CONTENT_WRITER } from 'src/graphql/Mutations/mutation'

interface ContentWriterFormikProps {
  email: string
  firstName: string
  title: string
  lastName: string
  markUp: string
  _id?: string
}

const AddContentWriterFormikApp = withFormik<
  AddContentWriterProps,
  ContentWriterFormikProps
>({
  enableReinitialize: true,
  mapPropsToValues: ({ initData }) => ({
    firstName: (initData && initData.firstName) || '',
    title: (initData && initData.title) || '',
    lastName: (initData && initData.lastName) || '',
    email: (initData && initData.email) || '',
    markUp: (initData && initData.markUp) || '',
    _id: (initData && initData._id) || '',
  }),
  // validationSchema: ContentWriterSchema,
  handleSubmit: async (values, { props }) => {
    const { addNewContentWriter, initData } = props
    if (initData?._id) {
      CallMutation(addNewContentWriter, {
        variables: {
          input: {
            _id: values._id,
            email: values.email,
            firstName: values.firstName,
            title: values.title,
            lastName: values.lastName,
            markUp: parseInt(values.markUp),
          },
        },
      })
    } else {
      CallMutation(addNewContentWriter, {
        variables: {
          input: {
            email: values.email,
            firstName: values.firstName,
            title: values.title,
            lastName: values.lastName,
            markUp: parseInt(values.markUp),
          },
        },
      })
    }
  },
})(AddContentWriterModel)

const AddContentWriterFormikWrapper = (props: AddContentWriterProps) => {
  const { initData, onModalClose } = props

  const [addContentWriter, { loading: addLoading }] = useMutation(
    CREATE_CONTENT_WRITER,
    {
      client: clientAdmin,
      onCompleted: () => {
        onModalClose && onModalClose()
      },
      refetchQueries: ['contentWriterList'],
    }
  )

  const [editContentWriter, { loading: editLoading }] = useMutation(
    UPDATE_CONTENT_WRITER,
    {
      client: clientAdmin,
      onCompleted: () => {
        onModalClose && onModalClose()
      },
      refetchQueries: ['contentWriterList'],
    }
  )

  const schema = initData?._id ? editContentWriter : addContentWriter
  const loading = initData?._id ? editLoading : addLoading
  return (
    <AddContentWriterFormikApp
      {...props}
      addNewContentWriter={schema}
      loading={loading}
    />
  )
}
export default AddContentWriterFormikWrapper
