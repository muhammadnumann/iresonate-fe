import React from "react";
import { MutationFunction, useQuery } from "@apollo/client";
import { Form, InjectedFormikProps } from "formik";

// component
import { WSLoader } from "src/component/common";
import SliderComponent from "src/layouts/MainLayout";
import { HeadElement } from "src/component/core";
import AddMemberForm from "src/form/admin/adminDonor-edit-form/editDonor";

// constant
import { GET_DONOR, } from "src/graphql/Queries/queries";
import { getCurrentUser } from "src/utils/helper";
import metaTitle from "src/utils/metaTitle";
import { Donor } from "src/typeGeneratedAdmin";
import { cardTitle } from "src/utils/enums";

export interface EditDonorFormikProps {
  initialData?:Donor
  loading?: boolean
  mutate?: MutationFunction
  updateLoading: boolean;
}

export interface DonorFormProps {
  firstName?: string
  middleName?: string
  lastName?: string
  email?: string
  mobileNumber?: string
  mStreetAddress?: string
  mCity?: string
  mState?: string
  mPostalCode?: string
  mCountry?: string
}

const DonorProfileUpdate: React.FC<
  InjectedFormikProps<EditDonorFormikProps, DonorFormProps>
> = ({ handleSubmit, updateLoading }) => {
  const currentUser = getCurrentUser();
  const { loading: userLoading } = useQuery(GET_DONOR, {
    variables: {
      id: currentUser?._id,
    },
  });

  return (
    <>
      <HeadElement title={metaTitle.DonorProfile} />
      <SliderComponent>
        {userLoading ? (
          <WSLoader className="d-flex justify-content-center align-items-center h-100" />
        ) : (
          <Form>
            <AddMemberForm onSubmit={() => handleSubmit()} loading={updateLoading} isEdit mainCardTitle={cardTitle.donorsProfile} />
          </Form>
        )}
      </SliderComponent>
    </>
  )
}
export default DonorProfileUpdate;