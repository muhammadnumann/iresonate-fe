import React from "react";
import { withFormik } from "formik";

// component
import LoginPage, { LoginFormProps, LoginInput } from "src/form/LoginPage";
import { HeadElement } from "src/component/core/headElement";
import { WSMessage } from "src/component/common";

//constant
import metaTitle from "src/utils/metaTitle";
import { LoginSchema } from "src/utils/formikValidation";
import { CallMutation } from "src/graphql/graphqlHandler";
import { withAuthLogin } from "src/routecheck/authLogin";
import { Login_Usertype, Roles } from "src/typeGeneratedAdmin";
import { cardTitle, LOCAL_STORAGE_KEY } from "src/utils/enums";
import { LOGIN_USER } from "src/graphql/Mutations/mutation";
import { useMutation } from "@apollo/client";
import { clientAdmin } from "pages/_app";
import routPath from "src/routes/routes";
import messageHelper from "src/utils/message";
import { useRouter } from "next/router";
import { setLocalStorageItem } from "src/utils/helper";
import Router  from 'next/router';


const LoginFormHandler = withFormik<LoginFormProps, LoginInput>({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
  validationSchema: LoginSchema,

  handleSubmit: async (values, { setSubmitting, props }) => {
    const { loginUser } = props;
    setSubmitting(true);
    CallMutation(loginUser, {
      variables: {
        input: {
          email: values.email,
          password: values.password,
          userType: Login_Usertype.Admin,
        },
      },
    });
  },
})(LoginPage);

const AdminLoginForm = (props: LoginFormProps) => {
  // const router = useRouter();
  const [mutate, { loading }] = useMutation(LOGIN_USER, {
    client: clientAdmin,
    onCompleted: (data) => {
      const adminName: { firstName?: string } = {
        firstName: data?.login?.userInfo?.name
      }
      setLocalStorageItem(LOCAL_STORAGE_KEY.NAME, JSON.stringify(adminName))
      setLocalStorageItem(LOCAL_STORAGE_KEY.CURRENT_USER, JSON.stringify({ ...data?.login?.userInfo, role: Roles?.Admin }))
      setLocalStorageItem(
        LOCAL_STORAGE_KEY.ADMIN_TOKEN, data?.login?.token ? data?.login?.token : ""
      );

      Router.push(routPath.adminDashboard)
      WSMessage({
        type: 'success',
        messageValue: `${messageHelper.welcomeDashboard} ${data?.login?.userInfo?.name}`,
      })
    },
  })
  return (
    <>
      <HeadElement title={metaTitle.adminLogin} />
      <LoginFormHandler
        formTitle={cardTitle.adminLogin}
        loading={loading}
        loginUser={mutate}
        {...props}
      />
    </>
  );
};

export default withAuthLogin(AdminLoginForm);
