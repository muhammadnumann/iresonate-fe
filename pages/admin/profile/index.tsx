import React, { useEffect } from "react";
import { withFormik } from "formik";
import UpdateAdminProfile, { UpdateAdminProfileProps, UpdateAdminProfileValues } from "src/form/admin/profile-form/updateProfile";
import { withAuth } from "src/routecheck";
import { UserRoleType } from "src/types";
import { getCurrentUser } from "src/utils/helper";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Admin } from "src/typeGeneratedAdmin";
import { clientAdmin } from "pages/_app";
import { GET_USER } from "src/graphql/Queries/queries";
import { UPDATE_ADMIN_PROFILE } from "src/graphql/Mutations/mutation";
import { WSMessage } from "src/component/common";
import { CallMutation } from "src/graphql/graphqlHandler";
import { UpdateAdminProfileSchema } from "src/utils/formikValidation";

const EditAdminProfileFormikApp = withFormik<UpdateAdminProfileProps,UpdateAdminProfileValues> ({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { initialData } = props
    return {
      name:initialData?.name,
      email: initialData?.email,
      mobileNumber:initialData?.mobileNumber,
    }
  },
  validationSchema:UpdateAdminProfileSchema,
  handleSubmit(values, { props }) {
    const { initialData, mutate } = props
    const { _id } = initialData
    const { name, email, mobileNumber } = values
    CallMutation(mutate,{ 
      variables: {
        input: {
          _id,
          name,
          email,
          mobileNumber,
        },
      }
    })
  }
})
(UpdateAdminProfile)

const EditAdminProfileFormikWrapper = (props:UpdateAdminProfileProps) => {
  const currentUser = getCurrentUser();
  const [getAdmin,{ data, loading}] = useLazyQuery<{getUser: Admin}>(GET_USER,{
    client: clientAdmin,
    variables: {
      id:currentUser?._id,
    }
  })
  useEffect(() => {
    getAdmin()
  }, [currentUser?._id])

  const [ updateAdmin,{loading:updateLoading}] = useMutation(UPDATE_ADMIN_PROFILE,{
    client: clientAdmin,
    onCompleted:(data) => {
      if(data) {
        return WSMessage({
          type:"success",
          messageValue:data?.updateAdmin?.message,
        })
      }
    }
  });
  return (
    <EditAdminProfileFormikApp mutate={updateAdmin} btnLoading={updateLoading} initialData={data?.getUser} loading={loading} />
  )
}
export default withAuth(EditAdminProfileFormikWrapper, UserRoleType.Admin)