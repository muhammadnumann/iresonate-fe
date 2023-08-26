import React, { useState } from 'react'
import { MutationFunction, useMutation } from '@apollo/react-hoc'

// component
import { WSCard, WSForm, WSInput, WSButton, WSFormItem, WSPassword, WSMessage, WSRow, WSCol, WSImage } from 'src/component/common'
import ForgotPassword from 'pages/donor/login/forgotpassword'

// constant
import { FORGOT_PASSWORD } from 'src/graphql/Mutations/mutation'
import messageHelper from 'src/utils/message'
import { formLabelName } from 'src/utils/enums'
import routPath from 'src/routes/routes'
import { images } from 'src/utils/image'

// style
import './login.module.less'

export interface LoginFormProps {
  onLoginSuccess?: (user: any) => void
  onForgotPassword?: (email: string) => void
  handleSubmit?: () => void
  rememberMe?: boolean
  isUser?: boolean
  formTitle?: string
  values?: LoginInput
  venderId?: string
  loginUser?: MutationFunction
  loading?: boolean
  handleOpenModal?: (data: any) => void
  loginAsDonor?: boolean

  signUpRoute?: string

}

export interface LoginInput {
  email: string
  password: string
}

const LoginPage: React.FC<LoginFormProps> = ({
  onForgotPassword,
  venderId,
  ...props
}) => {
  const { handleSubmit, formTitle, isUser, loading, loginAsDonor, signUpRoute } = props
  const [isChecking, setIsChecking] = useState<boolean>(false)

  const onkeyPress = (e) => {
    e.keyCode == 13 && handleSubmit()
  }
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  }

  const [mutate, { loading: forgotPasswordLoading }] = useMutation(
    FORGOT_PASSWORD,
    {
      onCompleted: () => {
        WSMessage({
          type: 'success',
          messageValue: messageHelper.ForgotPassword,
        })
        setIsChecking(false)
      },
    }
  )

  return (
    <>
      {loginAsDonor ?
        <div className="login-as-donor-container">
          <WSRow gutter={[10, 10]}>
            <WSCol span={24}>
              <WSInput
                name='email'
                placeholder={formLabelName.emailAddress}
                onKeyDown={onkeyPress}
                inputLabel
                label='Email Address*'
                className='login-as-donor-input'
              />
            </WSCol>
            <WSCol span={24}>
              <WSPassword
                name='password'
                onKeyDown={onkeyPress}
                placeholder={formLabelName.password}
                inputLabel
                label='Password*'
                className='login-as-donor-input'
              />
            </WSCol>
            <WSCol span={24}>
              <WSFormItem wrapperCol={{ span: 24 }} className="forget-link">
                <a
                  className='forget-password-link'
                  onClick={(e) => {
                    e.preventDefault()
                    setIsChecking(true)
                  }}
                >
                  {formLabelName.forgotPassword}
                </a>
                {isChecking && (
                  <ForgotPassword
                    forgotPassword={mutate}
                    onSetForgotPassword={() => {
                      setIsChecking(false)
                    }}
                    loading={forgotPasswordLoading}
                  />
                )}
              </WSFormItem>
            </WSCol>
          </WSRow>
          <WSRow justify="center" >
            <WSCol>
              <div className='btn-login'>
                <WSButton
                  type='primary'
                  loading={loading}
                  onClick={handleSubmit}
                >
                  {formLabelName.loginBtn}
                </WSButton>

              </div>
            </WSCol>
            <WSCol span={24}>
              <div className="sign-up-link">
                {formLabelName.noAccount}
                <a href={routPath.donorRegistration} className="link">
                  {formLabelName.SignUp}
                </a>
              </div>
            </WSCol>
            <WSCol>
              <div className='iresonate-logo-section'>
                <WSImage
                  src={images.iResonate}
                  className='img-fluid iresonate-logo'
                />
                <WSImage
                  src={images.stripeIcon}
                  className='img-fluid strip-logo'
                />
              </div>
            </WSCol>
          </WSRow>
        </div>
        : <div className='login-align'>
          <WSCard title={formTitle}>
            <WSForm className='loginForm' {...layout} labelAlign='left'>
              <WSFormItem required label={formLabelName.emailAddress}>
                <WSInput
                  name='email'
                  placeholder={formLabelName.emailAddress}
                  onKeyDown={onkeyPress}
                />
              </WSFormItem>
              <WSFormItem required label={formLabelName.password}>
                <WSPassword
                  name='password'
                  onKeyDown={onkeyPress}
                  placeholder={formLabelName.password}
                />
              </WSFormItem>
              {isUser && (
                <WSFormItem wrapperCol={{ span: 24 }} className="forget-link">
                  <a
                    className='forget-password-link'
                    onClick={(e) => {
                      e.preventDefault()
                      setIsChecking(true)
                    }}
                  >
                    {formLabelName.forgotPassword}
                  </a>
                  {isChecking && (
                    <ForgotPassword
                      forgotPassword={mutate}
                      onSetForgotPassword={() => {
                        setIsChecking(false)
                      }}
                      loading={forgotPasswordLoading}
                    />
                  )}
                </WSFormItem>
              )}
              <div className='d-flex gap-3 justify-content-center'>
                <WSFormItem className='btn-login'>
                  <WSButton
                    type='primary'
                    loading={loading}
                    onClick={handleSubmit}
                  >
                    {formLabelName.loginBtn}
                  </WSButton>
                </WSFormItem>

                <WSFormItem className='btn-login'>
                  <WSButton
                    href={signUpRoute}
                    type='primary'>
                    {formLabelName.SignUp}
                  </WSButton>
                </WSFormItem>
              </div>

            </WSForm>
          </WSCard>
        </div>}
    </>
  )
}

export default LoginPage
