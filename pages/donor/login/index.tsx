import React from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { withFormik } from "formik";
import routPath from "src/routes/routes";
import Router from 'next/router'

// component
import { WSMessage } from "src/component/common";
import { LoginFormProps, LoginInput } from "src/form/LoginPage";
import LoginPage from "src/form/LoginPage";
// constant
import { LoginSchema } from "src/utils/formikValidation";
import { getSessionStorageItem, setLocalStorageItem } from "src/utils/helper";
import { CallMutation } from "src/graphql/graphqlHandler";
import { Roles } from "src/typeGeneratedAdmin";
import { cardTitle, LOCAL_STORAGE_KEY } from "src/utils/enums";
import messageHelper from "src/utils/message";
// Schema
import { LOGIN_MEMBER_USER } from "src/graphql/Mutations/mutation";

const LoginFormikApp = withFormik<LoginFormProps, LoginInput>({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
  validationSchema: LoginSchema,

  handleSubmit(values, { props }) {
    CallMutation(props.loginUser, {
      variables: {
        input: {
          email: values.email,
          password: values.password,
        },
      },
    });
  },
})(LoginPage);

const DonorLogin = (props: LoginFormProps) => {
  const router = useRouter();
  const [loginUser, { loading }] = useMutation(LOGIN_MEMBER_USER, {
    onCompleted: (data) => {
      const donorUserName: { firstName?: string, lastName?: string } = {
        firstName: data?.login?.userInfo?.firstName || "",
        lastName: data?.login?.userInfo?.lastName || ""
      }
      setLocalStorageItem(LOCAL_STORAGE_KEY.NAME, JSON.stringify(donorUserName))
      setLocalStorageItem(
        LOCAL_STORAGE_KEY.CURRENT_USER,
        JSON.stringify({ ...data?.login?.userInfo, role: Roles.Enduser })
      );
      setLocalStorageItem(
        LOCAL_STORAGE_KEY.AUTH_TOKEN,
        data?.login.token ? data?.login.token : ""
      );
      if (getSessionStorageItem('webHostId')) {
        Router.push(routPath.Payment);
      }
      else {
        Router.push(routPath.donorDashboard);
        WSMessage({
          type: "success",
          messageValue: `${messageHelper.welcomeDashboard} ${data?.login?.userInfo?.firstName}`,
        });
      }
    },
  });
  return (
    <LoginFormikApp
      isUser
      signUpRoute={routPath.donorRegistration}
      formTitle={cardTitle.donorLogin}
      loginUser={loginUser}
      loading={loading}
      {...props}
    />
  );
};

export default DonorLogin;
