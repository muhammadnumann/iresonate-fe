import React from 'react'
import { withFormik } from 'formik'
import { useMutation } from '@apollo/client'
// Component
import { LoginFormProps, LoginInput } from 'src/form/LoginPage'
import LoginPage from 'src/form/LoginPage'
import { HeadElement } from 'src/component/core'
import { WSMessage } from 'src/component/common'
// constants
import { LoginSchema } from 'src/utils/formikValidation'
import { CallMutation } from 'src/graphql/graphqlHandler'
import metaTitle from 'src/utils/metaTitle'
import { withAuthLogin } from 'src/routecheck/authLogin'
import { Login_Usertype, Roles } from 'src/typeGeneratedAdmin'
import { setLocalStorageItem } from 'src/utils/helper'
import { clientAdmin } from 'pages/_app'
import { useRouter } from 'next/router'
import routPath from 'src/routes/routes'
import messageHelper from 'src/utils/message'
import { cardTitle, LOCAL_STORAGE_KEY } from 'src/utils/enums'
// schema
import { LOGIN_USER } from 'src/graphql/Mutations/mutation'
import Router  from 'next/router';

const LoginFormHandler = withFormik<LoginFormProps, LoginInput>({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: LoginSchema,
  handleSubmit: async (values, { props }) => {
    const { loginUser } = props
    CallMutation(loginUser, {
      variables: {
        input: {
          email: values.email,
          password: values.password,
          userType: Login_Usertype.Vendor,
        },
      },
    })
  },
})(LoginPage)

const VendorLoginForm = () => {
  const router = useRouter()
  const [mutate, { loading }] = useMutation(LOGIN_USER, {
    client: clientAdmin,
    onCompleted: (data) => {
      const webHostUserName: { firstName?: string, lastName?: string } = {
        firstName: data?.login?.userInfo?.firstName || "",
        lastName: data?.login?.userInfo?.lastName || ""
      }
      setLocalStorageItem(LOCAL_STORAGE_KEY.NAME, JSON.stringify(webHostUserName))
      Router.push(routPath.webHostDashboard)
      const responseData = data?.login
      setLocalStorageItem(
        LOCAL_STORAGE_KEY.CURRENT_USER,
        JSON.stringify({ ...responseData?.userInfo, role: Roles?.Vendor })
      )
      setLocalStorageItem(
        LOCAL_STORAGE_KEY.ADMIN_TOKEN,
        responseData?.token ? responseData?.token : ''
      )
      setLocalStorageItem(
        LOCAL_STORAGE_KEY.STRIPE_ACCOUNT_STATUS,
        responseData?.userInfo?.stripeAccountStatus
      )
      WSMessage({
        type: 'success',
        messageValue: `${messageHelper.welcomeDashboard} ${responseData?.userInfo?.firstName}`,
      })
    },
  })

  return (
    <>
      <HeadElement title={metaTitle.webHostLogin} />
      <LoginFormHandler
        formTitle={cardTitle.webHostLogin}
        loading={loading}
        signUpRoute={routPath.webHostRegistrations}
        loginUser={mutate}

      />
    </>
  )
}

export default withAuthLogin(VendorLoginForm)
