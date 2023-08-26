
import { useLazyQuery, useMutation } from "@apollo/client";
import { withFormik } from "formik";
import { useEffect } from "react";
import DonorProfileUpdate, { DonorFormProps, EditDonorFormikProps } from "./updateProfile";
import { WSMessage } from "src/component/common";
import { CallMutation } from "src/graphql/graphqlHandler";
import { UPDATE_DONOR_PROFILE_MUTATION } from "src/graphql/Mutations/mutation";
import { GET_DONOR } from "src/graphql/Queries/queries";
import { Donor,AddressType } from "src/typeGeneratedAdmin";
import { NetworkOnly } from "src/utils/enums";
import { donorProfileSchema } from "src/utils/formikValidation";
import { getCurrentUser } from "src/utils/helper";
import { withAuth } from "src/routecheck";
import { UserRoleType } from "src/types";


const EditDonorProfileFormikApp = withFormik<EditDonorFormikProps, DonorFormProps>({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const {initialData} = props
    const MailingAddress = initialData?.address?.find(
      (item) => item?.addressType === AddressType.Mailing
    )
    return {
      firstName: initialData?.firstName,
      middleName: initialData?.middleName,
      lastName: initialData?.lastName,
      mobileNumber: initialData?.mobileNumber,
      email: initialData?.email,
      mStreetAddress: MailingAddress?.street,
      mPostalCode: MailingAddress?.postalCode,
      mCity: MailingAddress?.city,
      mState: MailingAddress?.state,
      mCountry: MailingAddress?.country,
    }
  },
  validationSchema: donorProfileSchema,

  handleSubmit: (values, { props }) => {
    const { mutate,initialData } = props;
    const { _id } = initialData
    const { firstName,lastName,middleName,mobileNumber,mStreetAddress,mCity,mPostalCode,mCountry,mState} = values
    CallMutation(mutate, {
      variables: {
        input: {
          _id,
          firstName,
          middleName,
          lastName,
          mobileNumber,
          address: [
            {
              street: mStreetAddress,
              city: mCity,
              postalCode: mPostalCode,
              country: mCountry,
              state: mState,
              addressType: AddressType.Mailing,
            },
          ],
        },
      },
    });
  },
})(DonorProfileUpdate);

const EditDonorProfileFormikWrapper = (props:EditDonorFormikProps) => {
 const currentUser = getCurrentUser();
  const [getDonor, { data }] = useLazyQuery<{
    getUser: Donor
  }>(GET_DONOR, {
    fetchPolicy: NetworkOnly,
    variables: {
      id : currentUser?._id,
    },
  })
  useEffect(() => {
    currentUser?._id && getDonor()
  }, [currentUser?._id])

    const [ updateDonor,{loading:donorProfileLoading} ] = useMutation(UPDATE_DONOR_PROFILE_MUTATION,{
      onCompleted:(data) => {
        if(data) {
          return WSMessage({
            type:"success",
            messageValue:data?.updateDonorProfile?.message,
          })
        }
      }
    } );

  return <EditDonorProfileFormikApp mutate={updateDonor} initialData={data?.getUser} updateLoading={donorProfileLoading} />
}

export default withAuth(EditDonorProfileFormikWrapper, UserRoleType.Member);

