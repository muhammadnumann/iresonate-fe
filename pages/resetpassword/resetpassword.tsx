import React from "react";
import { withFormik } from "formik";

// component
import { WSCard ,WSForm ,WSButton, WSFormItem, WSPassword  } from "src/component/common";

// constant
import { CallMutation } from "src/graphql/graphqlHandler";
import { ForgotResetPasswordInput } from "src/typeGeneratedAdmin";
import { ResetPasswordSchema } from "src/utils/formikValidation";

interface ResetFormProps {
  type: String;
  handleBlur?: () => void;
  handleSubmit?: () => void;
  resFunc?: () => void;
  isSubmitting?: boolean;
  loading?: boolean;
}

const PasswordForm: React.FC<ResetFormProps> = (props: ResetFormProps) => {
  const { handleSubmit, loading } = props;
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };

  return (
    <>
          <div className="login-align">
            <WSCard title="Reset Password">
              <WSForm className="loginForm" {...layout} labelAlign="left">
                <WSFormItem required label="New Password">
                <WSPassword name="newPassword" placeholder="New Password" />
                </WSFormItem>
                <WSFormItem required label="Confirm Password">
              <WSPassword
                name="confirmPassword"
                placeholder="Confirm Password"
              />
            </WSFormItem>
                <WSFormItem className="btn-login">
                  <WSButton
                    type="primary"
                    loading={loading}
                    onClick={handleSubmit}
                  >
                    Submit
                  </WSButton>
                </WSFormItem>
              </WSForm>
            </WSCard>
          </div>
    </>
  );
};

const withFormikHandle = withFormik<ResetFormProps, ForgotResetPasswordInput>({
  mapPropsToValues: (props: any) => ({
    token: props.type || "",
    newPassword: "",
    confirmPassword: "",
  }),
  validationSchema:ResetPasswordSchema,
  handleSubmit: async (values, { setSubmitting, props }) => {
    const { resFunc } = props;
    setSubmitting(true);
    CallMutation(resFunc, {
      variables: {
        input: {
          token: values.token,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
      },
    });
  },
})(PasswordForm);

export default withFormikHandle;
