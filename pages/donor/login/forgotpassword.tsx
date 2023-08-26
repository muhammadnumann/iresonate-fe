import React, { useState } from 'react'
import { withFormik } from 'formik'
import { CallMutation } from 'src/graphql/graphqlHandler'
// component
import { WSInput, WSButton, WSForm, WSFormItem, WSModal} from 'src/component/common'
// constant
import {ForgotPasswordSchema} from 'src/utils/formikValidation'
import { formLabelName } from 'src/utils/enums'
// style
import './forgot.module.less'

interface ForgotPasswordProps {
  loading?: boolean
  onSetForgotPassword?: (boolean: boolean) => void
  handleSubmit?: () => void
  forgotPassword?: () => void
}
interface InputProps {
  email?: string
}
const ForgotPassword: React.FC<ForgotPasswordProps> = (
  props: ForgotPasswordProps
) => {
  const { handleSubmit } = props
  const { loading, onSetForgotPassword } = props

  const [showModal, setShowModal] = useState({
    visible: true,
  })

  const cancelFunction = () => {
    setShowModal({
      visible: false,
    })
    onSetForgotPassword(false)
  }
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  }

  return (
          <WSModal visible={showModal.visible} 
          title={formLabelName.forgotPassword}
          className="forgot-password-model"
          footerFunction={[
           <>
            <WSButton
              type='primary'
              loading={loading}
              onClick={handleSubmit}
            >
              {formLabelName.submit}
            </WSButton>
            <WSButton
              type='primary'
              onClick={cancelFunction}
            >
              {formLabelName.cancel}
            </WSButton>
          </>
          ]}
          >
            <WSForm {...layout} labelAlign="left">
            <WSFormItem className="email-label" required label={formLabelName.emailAddress}>
              <WSInput name='email' placeholder={formLabelName.emailAddress} />
            </WSFormItem>
            </WSForm>
          </WSModal>
  )
}

const withFormikHandle = withFormik<ForgotPasswordProps, InputProps>({
  enableReinitialize: true,

  mapPropsToValues: (props: any) => ({
    email: props.email,
  }),
  validationSchema: ForgotPasswordSchema,
  handleSubmit: async (values, { setSubmitting, props }) => {
    const { forgotPassword } = props
    setSubmitting(true)
    CallMutation(forgotPassword, {
      variables: {
        input: {
          email: values.email,
        },
      },
    })
  },
})(ForgotPassword)

export default withFormikHandle
