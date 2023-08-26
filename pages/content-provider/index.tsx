import React from 'react'
import { withFormik } from 'formik'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import Router  from 'next/router';

// components
import { LoginFormProps, LoginInput } from 'src/form/LoginPage'
import LoginPage from 'src/form/LoginPage'
import { HeadElement } from 'src/component/core/headElement'
import { withAuthLogin } from 'src/routecheck/authLogin'
import { WSMessage } from 'src/component/common'

// constants
import { LoginSchema } from 'src/utils/formikValidation'
import { CallMutation } from 'src/graphql/graphqlHandler'
import metaTitle from 'src/utils/metaTitle'
import { setLocalStorageItem } from 'src/utils/helper'
import { Login_Usertype, Roles } from 'src/typeGeneratedAdmin'
import routPath from 'src/routes/routes'
import { clientAdmin } from 'pages/_app'
import { cardTitle, LOCAL_STORAGE_KEY } from 'src/utils/enums'

//schema
import { LOGIN_USER } from 'src/graphql/Mutations/mutation'
import messageHelper from 'src/utils/message'
const LoginFormHandler = withFormik<LoginFormProps, LoginInput>({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: LoginSchema,
  handleSubmit: async (values, { setSubmitting, props }) => {
    const { loginUser } = props
    setSubmitting(true)
    CallMutation(loginUser, {
      variables: {
        input: {
          email: values.email,
          password: values.password,
          userType: Login_Usertype.ContentWriter,
        },
      },
    })
  },
})(LoginPage)

const ContentWriterLoginForm = () => {
  // const router = useRouter()
  const [mutate, { loading }] = useMutation(LOGIN_USER, {
    client: clientAdmin,
    onCompleted: (data) => {
      const contentProviderUserName: { firstName?: string, lastName?: string } = {
        firstName: data?.login?.userInfo?.firstName || "",
        lastName: data?.login?.userInfo?.lastName || ""
      }
      setLocalStorageItem(LOCAL_STORAGE_KEY.NAME, JSON.stringify(contentProviderUserName))
      Router.push(routPath.contentProviderDashboard)
      const responseData = data?.login
      setLocalStorageItem(
        LOCAL_STORAGE_KEY.CURRENT_USER,
        JSON.stringify({
          ...responseData?.userInfo,
          role: Roles?.ContentWriter,
        })
      )
      setLocalStorageItem(LOCAL_STORAGE_KEY.ADMIN_TOKEN,
        responseData?.token ? responseData?.token : ''
      )
      setLocalStorageItem(LOCAL_STORAGE_KEY.STRIPE_ACCOUNT_STATUS,
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
      <HeadElement title={metaTitle.contentProviderLogin} />
      <LoginFormHandler
        signUpRoute={routPath.contentProviderRegistrations}
        formTitle={cardTitle.contentProviderLogin}
        loading={loading}
        loginUser={mutate}
      />
    </>
  )
}

export default withAuthLogin(ContentWriterLoginForm)
