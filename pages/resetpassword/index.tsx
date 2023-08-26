import React from "react";
import { useRouter } from "next/router";

import { ResetPasswordMutation } from "src/schema/memberSchema";
import PasswordForm from "./resetpassword";

const ResetPasswordForm: React.FC<{}> = (props: any) => {
  const router = useRouter();
  const { mutate, loading } = ResetPasswordMutation();

  const { token } = router.query;

  return (
    <>
      {token && (
        <PasswordForm
          type={token.toString()}
          resFunc={mutate}
          loading={loading}
        />
      )}
    </>
  );
};

export default ResetPasswordForm;
