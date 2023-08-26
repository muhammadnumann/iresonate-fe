import React, { useState } from 'react'
import { compose } from 'recompose'
import { withRouter } from 'next/router'
import { MutateProps } from '@apollo/react-hoc'
import { FormikProps, withFormik } from 'formik'
import { WithRouterProps } from 'next/dist/client/with-router'
import routPath from 'src/routes/routes'
// Component
import { NewNavigation, TermsConditionsCommon, HeadElement } from 'src/component/core'
import { WebsiteDetails, WebHostCorporateDetails } from 'src/form/registration-form/web-host-registration-form'
//constant
import { withNewVendor } from 'src/hoc/Mutations/addVendor'
import {
  AddressType,
  MutationCreateVendorArgs,
  UserRoles,
  VendorWithToken,
} from 'src/typeGeneratedAdmin'
import { webHostRegisterSchema } from 'src/utils/formikValidation'
import { stepFormDetails, WebHostTermsCondition } from 'src/utils/enums'
import metaTitle from 'src/utils/metaTitle'
import PrimaryTheme from 'src/form/registration-form/primarytheme'
import { WSButton, WSTitle, } from 'src/component/common'
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

  websiteDemo: any

  userRole: string

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
      values.userRole = UserRoles.VENDOR;
      values.platformCharges = 5;
      validateForm().then((errors) => {
        console.log(errors)
        if (Object.keys(errors).length) {
          handleSubmit()
        }
      })
      // console.log(errors);
      if (values.acceptTc.length) {
        handleSubmit()
      } else {
        setFieldError(stepFormDetails.acceptTc, stepFormDetails.acceptCheckbox)
      }
    }

    return (
      <div className='donor-registration gap-5'>
        <HeadElement title={metaTitle.MainScreen} />
        <NewNavigation />
        <div style={{ marginTop: "98px" }}>
          <div className='pt-5 text-center'>
            <WSTitle level={1}>WebHost Registration</WSTitle>
          </div>
        </div>
        <div className="registration-steps">
          <section >
            <div className="container">
              <div className="my-5">
                <WebHostCorporateDetails setFieldValue={setHandleTitle} value={handleTitle}
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
                <WebsiteDetails
                  setFieldValue={setFieldValue}
                  initialData={values}
                  errors={errors?.websiteTitle} />
                <PrimaryTheme setHosting={setHosting} hosting={hosting} setPrimaryFocus={setPrimaryFocus} primaryFocus={primaryFocus} />

                <TermsConditionsCommon
                  value={values?.acceptTc}
                  stepName={WebHostTermsCondition?.stepName}
                  stepDescription={WebHostTermsCondition?.stepDescription}
                  title={WebHostTermsCondition?.title}
                  firstParagraph={WebHostTermsCondition?.firstParagraph}
                  secondParagraph={WebHostTermsCondition?.secondParagraph}
                  thirdParagraph={WebHostTermsCondition?.thirdParagraph}
                  fourParagraph={WebHostTermsCondition?.fourParagraph}
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

      platformCharges: 5
    }
  },
  validationSchema: webHostRegisterSchema,
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
          pathname: routPath.thankyouScreen,
          query: { title: 'wh' }
        },)
      })
  },
})

export default compose(
  withRouter,
  withNewVendor,
  withContentHandler
)(VendorRegistrations)
