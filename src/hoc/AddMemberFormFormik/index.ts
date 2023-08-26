import { MutateProps } from '@apollo/react-hoc'
import { withFormik } from 'formik'
import { WSMessage } from 'src/component/common/message/WSMessage'
import { AdddNewMemberSchema } from 'src/utils/formikValidation'
import messageHelper from 'src/utils/message'
import routPath from 'src/routes/routes'
import { AddressType } from 'src/typeGeneratedAdmin'
import { WithRouterProps } from 'src/types'

export interface IAddMemberForm {
  id?: string
  firstName: string
  title: string
  lastName: string
  email: string
  mobileNumber: string
  mStreetAddress: string
  mCity: string
  mState: string
  mPostalCode: string
  mCountry: string
  password: string
  confirm_password: string
}

export const withAddMemberForm = withFormik<
  MutateProps<any, any> & WithRouterProps,
  IAddMemberForm
>({
  mapPropsToValues: (props) => {
    return {
      firstName: '',
      title: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      mStreetAddress: '',
      mCity: '',
      mState: '',
      mPostalCode: '',
      mCountry: '',
      password: '',
      confirm_password: '',
    }
  },
  enableReinitialize: true,
  validationSchema: AdddNewMemberSchema,
  handleSubmit: (values, { props }) => {
    const { id } = props.router.query
    const { firstName , title, lastName, mobileNumber ,mCity, mState,mCountry,mPostalCode,mStreetAddress} = values
    let input = {
      firstName,
      title,
      lastName,
      mobileNumber,
      address: [
        {
          addressType: AddressType.Mailing,
          city:mCity,
          country:mCountry,
          postalCode:mPostalCode,
          state:mState,
          street: mStreetAddress,
        },
      ],
    }

    if (id) {
      input['_id'] = id
    } else {
      input['email'] = values.email
      input['password'] = values.password
    }
    props
      .mutate({
        variables: {
          input,
        },
      })
      .then(() => {
        props.router.push(routPath.DonorList)
        WSMessage({
          type: 'success',
          messageValue: messageHelper.donorUpdate,
        })
      })
  },
})
