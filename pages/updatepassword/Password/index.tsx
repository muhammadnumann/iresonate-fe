import React from 'react'
import { withFormik } from 'formik'

// component
import SliderComponent from 'src/layouts/MainLayout'
import { WSForm, WSButton, WSCard, WSFormItem, WSPassword } from 'src/component/common'

// constant
import { ResetPasswordInput } from 'src/typeGenerated'
import { CallMutation } from 'src/graphql/graphqlHandler'
import { ChangePasswordSchema } from 'src/utils/formikValidation'
import { formLabelName } from 'src/utils/enums'
// style
import './style.less'
interface ResetFormProps {
  handleSubmit?: () => void
  updatefun?: () => void
  loading?: boolean
}

const UpdatePassword: React.FC<ResetFormProps> = (props: ResetFormProps) => {
  const { handleSubmit, loading } = props
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  }
  return (
    <>
    <SliderComponent>
    <div className='change-password'>
    <WSForm {...layout} labelAlign="left">
        <WSCard title={formLabelName.changePassword} className="change-password-card">   
          <WSFormItem required label={formLabelName.oldPassword}>
          <WSPassword name='oldPassword'  placeholder={formLabelName.oldPassword}  />
          </WSFormItem>
         <WSFormItem label={formLabelName.newPassword} required>
            <WSPassword name='newPassword'
              placeholder={formLabelName.newPassword} />
          </WSFormItem>
            <WSFormItem label={formLabelName.confirmPassword} required>
          <WSPassword name='confirmPassword'
              placeholder={formLabelName.confirmPassword} />
          </WSFormItem>
        <WSButton
          loading={loading}
          type='primary'
          onClick={handleSubmit}
        >
          {formLabelName.submit}
        </WSButton>
        </WSCard>
      </WSForm>
      </div>
      </SliderComponent>
    </>
  )
}

const PasswordUpdate = withFormik<ResetFormProps, ResetPasswordInput>({
  mapPropsToValues: (props: any) => ({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }),
  validationSchema: ChangePasswordSchema,
  handleSubmit: async (values, { props }) => {
    const { updatefun } = props
    CallMutation(updatefun, {
      variables: {
        input: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
      },
    })
  },
})(UpdatePassword)

export default PasswordUpdate
