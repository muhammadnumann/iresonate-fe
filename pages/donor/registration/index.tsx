import React, { useState } from 'react'
import { compose } from 'recompose'
import { withRouter } from 'next/router'
import { MutateProps } from '@apollo/react-hoc'
import { FormikProps, withFormik } from 'formik'
import { WithRouterProps } from 'next/dist/client/with-router'
import routPath from 'src/routes/routes'
// Component
import { NewNavigation, HeadElement } from 'src/component/core'
//constant
import { withNewVendor } from 'src/hoc/Mutations/addVendor'
import {
  AddressType,
  MutationCreateVendorArgs,
  UserRoles,
  VendorWithToken,
} from 'src/typeGeneratedAdmin'
import { DonorRegisterSchema } from 'src/utils/formikValidation'
import metaTitle from 'src/utils/metaTitle'
import { WSButton, WSTitle, } from 'src/component/common'
import DonorForm from 'src/form/registration-form/donor-forms/personalDetails'
import Router  from 'next/router';


interface IVendorForm {

  firstTitle: string,

  firstNameCorporate: string,
  primaryFocus: string[],
  hosting: string,

  lastNameCorporate: string,

  emailCorporatePrimary: string,

  telephoneNumberCorporate: string,

  streetAddressCorporate: string,

  cityCorporate: string,

  stateCorporate: string,

  postalCodeCorporate: string,

  emailCorporate: string,

  passwordCorporate: string,

  websiteTitle: string,

  acceptTc: string[]

  websiteDemo: any,

  userRole: string,

  platformCharges: number
}

const VendorRegistrations: React.FC<
  FormikProps<IVendorForm> &
  MutateProps<{ createVendor: VendorWithToken }, MutationCreateVendorArgs>
> = ({
  handleSubmit,
  validateForm,
  setFieldValue,
  values,
  result,
  setErrors,
  setFieldError,
  errors,
}) => {
    const [handleTitle, setHandleTitle] = React.useState('');
    const [hosting, setHosting] = useState('');
    const [primaryFocus, setPrimaryFocus] = useState([]);

    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');

    const handleFormSubmit = () => {
      values.firstTitle = handleTitle;
      values.primaryFocus = primaryFocus.map(v => v.value);
      values.hosting = hosting;
      values.stateCorporate = state;
      values.streetAddressCorporate = address;
      values.cityCorporate = city;
      values.postalCodeCorporate = postalCode;
      values.userRole = UserRoles.ENDUSER;
      values.platformCharges = 0;

      validateForm().then((errors) => {
        console.log(errors)
        if (Object.keys(errors).length) {
          handleSubmit()
        }
      })
      handleSubmit()
    }

    return (
      <div className='donor-registration gap-5'>
        <HeadElement title={metaTitle.MainScreen} />
        <NewNavigation />
        <div style={{ marginTop: "98px" }}>
          <div className='pt-5 text-center'>
            <WSTitle level={1}>Donor Registration</WSTitle>
          </div>
        </div>
        <div className="registration-steps">
          <section >
            <div className="container">
              <div className="my-5">
                <DonorForm setFieldValue={setHandleTitle} value={handleTitle}
                  city={city}
                  country={country}
                  postalCode={postalCode}
                  state={state}
                  address={address}
                  setCity={setCity}
                  setCountry={setCountry}
                  setPostalCode={setPostalCode}
                  setState={setState}
                  setAddress={setAddress}
                />

                <WSButton
                  type='primary'
                  className='ant-btn w-100 rounded-3 ms-3 mb-5'
                  typeof='submit'
                  onClick={() => handleFormSubmit()}
                >
                  Sign up
                </WSButton>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }

export const withContentHandler = withFormik<
  MutateProps<{ createVendor: VendorWithToken }, MutationCreateVendorArgs> &
  WithRouterProps,
  IVendorForm
>({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      firstTitle: '',

      firstNameCorporate: '',

      lastNameCorporate: '',

      emailCorporatePrimary: '',

      telephoneNumberCorporate: '',

      streetAddressCorporate: '',

      cityCorporate: '',

      stateCorporate: '',

      postalCodeCorporate: '',

      emailCorporate: '',

      passwordCorporate: '',

      websiteTitle: '',

      acceptTc: [],

      websiteDemo: [],

      userRole: '',
      primaryFocus: [],
      hosting: '',

      platformCharges: 0

    }
  },
  validationSchema: DonorRegisterSchema,
  handleSubmit: (values, { props }) => {
    props
      .mutate({
        variables: {
          input: {
            websites: values.websiteDemo,
            password: values?.passwordCorporate,
            webhostCorporateName: values?.websiteTitle,
            primaryTelePhoneNumber: values?.telephoneNumberCorporate,
            email: values?.emailCorporate,
            address: [
              {
                street: values?.streetAddressCorporate.toString(),
                city: values?.cityCorporate.toString(),
                postalCode: values?.postalCodeCorporate.toString(),
                addressType: AddressType.Physical,
                state: values?.stateCorporate.toString(),
              }
            ],
            primaryFocus: values.primaryFocus,
            hosting: values.hosting,
            userDetail: {
              firstName: values?.firstNameCorporate,
              lastName: values?.lastNameCorporate,
              title: values?.firstTitle,
            },
            userRole: values.userRole,
            platformCharges: values.platformCharges
          },
        },
      })
      .then(() => {
        Router.push({
          pathname: routPath.thankyouScreenDonor,
          query: { title: 'cp' }
        },)
      })
  },
})

export default compose(
  withRouter,
  withNewVendor,
  withContentHandler
)(VendorRegistrations)
