import { withFormik } from "formik";
import React from "react";

import { AddFormProps } from "src/component/core/Addprofile/addNewModel";
import AddNewModel from "src/component/core/Addprofile/addNewModel";

import { AddNewSchema, EditSchema } from "src/utils/formikValidation";
import { CallMutation } from "src/graphql/graphqlHandler";
import { Roles, Usertype } from "src/typeGeneratedAdmin";
import {
  updateAdminAllProfileDetails,
  useRegisterUser,
} from "src/schema/memberSchema";

// const { mutate, loading } = updateAdminAllProfileDetails();
export interface UserInput {
  email: string;
  name: string;
  password?: string;
  _id?: string;
}

const AddNewProfile = withFormik<AddFormProps, UserInput>({
  enableReinitialize: true,
  mapPropsToValues: ({ initData }) => ({
    email: (initData && initData.email) || "",
    userType: null,
    name: (initData && initData.name) || "",
    password: "",
    _id: (initData && initData._id) || "",
  }),
  validationSchema: ({ initData }) =>
    initData?._id ? EditSchema : AddNewSchema,
  handleSubmit: async (
    values,
    { setSubmitting, setFieldError, resetForm, props }
  ) => {
    const { addFunc, onModalClose, initData } = props;

    if (props.type == Usertype.Admin) {
      if (initData?._id) {
        CallMutation(addFunc, {
          variables: {
            input: {
              _id: values._id,
              email: values.email,
              name: values.name
                .trim()
                .split(" ")
                .filter((val) => val)
                .join(" "),
            },
          },
        });
      } else {
        CallMutation(
          addFunc,
          {
            variables: {
              input: {
                email: values.email,
                name: values.name
                  .trim()
                  .split(" ")
                  .filter((val) => val)
                  .join(" "),
                password: values.password,
                userType: Roles.Admin,
              },
            },
          },
          resetForm
        );
      }
    } else if (props.type == Usertype.Vendor) {
      if (initData?._id) {
        CallMutation(addFunc, {
          variables: {
            input: {
              _id: values._id,
              email: values.email,
              name: values.name
                .trim()
                .split(" ")
                .filter((val) => val)
                .join(" "),
            },
          },
        });
      } else {
        CallMutation(
          addFunc,
          {
            variables: {
              input: {
                email: values.email,
                name: values.name
                  .trim()
                  .split(" ")
                  .filter((val) => val)
                  .join(" "),
                password: values.password,
                userType: Roles.Vendor,
              },
            },
          },
          resetForm
        );
      }
    } else if (props.type == Usertype.Member) {
      if (initData?._id) {
        CallMutation(addFunc, {
          variables: {
            input: {
              _id: values._id,
              email: values.email,
              name: values.name
                .trim()
                .split(" ")
                .filter((val) => val)
                .join(" "),
            },
          },
        });
      } else {
        CallMutation(
          addFunc,
          {
            variables: {
              input: {
                email: values.email,
                name: values.name
                  .trim()
                  .split(" ")
                  .filter((val) => val)
                  .join(" "),
                password: values.password,
                userType: Roles.Enduser,
              },
            },
          },
          resetForm
        );
      }
    } else {
      console.log("err");
    }
  },
})(AddNewModel);

const AddUserFormikWrapper = (props: AddFormProps) => {
  const { onModalClose, initData, type } = props;

  const { mutate: addNewMember, loading: addLoading } = useRegisterUser(
    type,
    onModalClose
  );
  const {
    mutate: editProfile,
    loading: editLoading,
  } = updateAdminAllProfileDetails(type, onModalClose);

  const schema = initData?._id ? editProfile : addNewMember;
  const loading = initData?._id ? editLoading : addLoading;
  return (
    <>
      <AddNewProfile {...props} addFunc={schema} loading={loading} />
    </>
  );
};

export default AddUserFormikWrapper;
