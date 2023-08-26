import React, { useEffect, useState } from 'react'
import { InjectedFormikProps, withFormik } from 'formik'
import routPath from 'src/routes/routes'
import { WithRouterProps } from 'src/types'
import { useRouter } from 'next/router'
import { MutationFunction, useLazyQuery, useMutation } from '@apollo/client'

// components
import {Navigation, RegisterStepsCommon, TermsConditionsCommon, HeadElement, NewNavigation} from 'src/component/core'
import { ContactDetails } from 'src/form/registration-form/contentProviderForm'
import { WSMessage } from 'src/component/common/message/WSMessage'

//constant
import metaTitle from 'src/utils/metaTitle'
import { ActiveStep, ContentWriterTermsCondition, LOCAL_STORAGE_KEY, NetworkOnly } from 'src/utils/enums'
import { AddressType, UserWithToken } from 'src/typeGeneratedAdmin'
import { clientAdmin } from 'pages/_app'
import { UPDATE_CONTENT_WRITER, ADD_CONTENT_WRITER } from 'src/graphql/Mutations/mutation'
import { GET_USER_DETAIL_BY_TOKEN } from 'src/graphql/Queries/queries'
import { UpdateContentWriter } from 'src/utils/formikValidation'
import { setLocalStorageItem } from 'src/utils/helper'
import {CallMutation} from "src/graphql/graphqlHandler";

interface IContentWriterForm {
  // Step 1
  acceptTc: any;
  step1?: Number
  firstName: string
  activeStep: number
  title: string
  markUp: number
  lastName: string
  // Physical Address
  sameAddressCheck?: string
  // pApartmentOrSuiteNumber: stringTODO:Need this code
  pStreetAddress: string
  pPostalCode: string
  pCity: string
  pState: string
  pCountry: string
  // Mailing Address
  // Step 2
  email: string
  mobileNumber: string
  landLineNumber: string
  password: string
  confirmPassword: string
}

interface ContentWriterInitialData {
  getContentWriterData: any
  loading: boolean
  updateLoading: boolean
  mutate: MutationFunction
}

const CompleteContentWriterRegistrationForm: React.FC<
  InjectedFormikProps<WithRouterProps, IContentWriterForm> &
    ContentWriterInitialData
> = ({
  handleChange,
  handleSubmit,
  setFieldValue,
  setErrors,
  validateForm,
  setFieldError,
  values,
  updateLoading,
  ...props
}) => {
  const [currentTab, setCurrentTab] = useState<number>(0)
  const steps = [
    {
      title: 'Step 1. Content Provider Details',
      description: `Enter Mailing Details`,
      content: "<ContentProviderDetails setFieldValue={setFieldValue} value={values} />",
    },
    {
      title: 'Step 2. Contact Details',
      description: `Enter your contact information and create password`,
      content: <ContactDetails />,
    },
    {
      title: 'Step 3. Terms & Condition',
      description: `Read our Terms & Condition carefully and hit the agree button.`,
      content: <TermsConditionsCommon
                value={values?.acceptTc}
                stepName={ContentWriterTermsCondition?.stepName}
                stepDescription={ContentWriterTermsCondition?.stepDescription}
                title={ContentWriterTermsCondition?.title}
                firstParagraph={ContentWriterTermsCondition?.firstParagraph}
                secondParagraph={ContentWriterTermsCondition?.secondParagraph}
                thirdParagraph={ContentWriterTermsCondition?.thirdParagraph}
                fourParagraph={ContentWriterTermsCondition?.fourParagraph}
                fiveParagraph={ContentWriterTermsCondition?.fiveParagraph}
      />,
    },
  ]

  const goToStep = (step: number) => {
    setFieldValue('activeStep', step)
    setCurrentTab(step)
    // setErrors({})
  }

  const handleTabChange = (tab: number) => {

    if (tab < values.activeStep) {
      goToStep(tab)
      setCurrentTab(tab)
      return
    }

    validateForm().then((errors) => {
      if (Object.keys(errors).length) {
        handleSubmit()
      } else {
        goToStep(tab)
      }
    })
  }
  const handleFormSubmit = () => {
    if (values.acceptTc.length) {
      handleSubmit()
    } else {
      setFieldError('acceptTc', 'Please check this box if you want to process')
    }
  }

  return (
    <>
      <HeadElement title={metaTitle.MainScreen} />
      <NewNavigation />
      <RegisterStepsCommon
        currentTab={currentTab}
        commonStepsArray={steps}
        loginUrl={routPath.contentProviderLogin}
        onTabChange={handleTabChange}
        loading={updateLoading}
        agreeBtnOnClick={handleFormSubmit}
        account='Have an account ?'
        login='Login'
        nextBtnText='Next Step'
        agreeBtnText='Agree'
      />
    </>
  )
}

const CompleteContentWriterHandler = withFormik<
  ContentWriterInitialData,
  IContentWriterForm
>({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { getContentWriterData } = props
    return {
      activeStep: ActiveStep.stepZero,
      firstName: getContentWriterData?.firstName || '',
      title: getContentWriterData?.title || '',
      lastName: getContentWriterData?.lastName || '',
      // Physical Address
      // pApartmentOrSuiteNumber: '',TODO:Need this code
      sameAddressCheck: '',
      pStreetAddress: '',
      pPostalCode: '',
      pCity: '',
      pState: '',
      pCountry: '',
      // Mailing Address
      // mStreetAddress: '',
      // // mPostOfficeBoxNumber: '',TODO:Need this code
      // mPostalCode: '',
      // mCity: '',
      // mState: '',
      // mCountry: '',
      markUp: getContentWriterData?.markUp || 0,
      // Step 2
      email: getContentWriterData?.email || '',
      mobileNumber: '',
      landLineNumber: '',
      password: '',
      confirmPassword: '',
      acceptTc: [],
    }
  },
  validationSchema: UpdateContentWriter,
  handleSubmit: (values, { props }) => {
    const { getContentWriterData } = props
    const inp = {
          firstName: values.firstName,
          email: values.email,
          title: values.title,
          markUp: values.markUp,
          lastName: values.lastName,
          mobileNumber: values.mobileNumber,
          password: values.password,
          // landlineNumber: values.landLineNumber,
          address: [
            {
              street: values.pStreetAddress,
              city: values.pCity,
              postalCode: values.pPostalCode,
              // apartment: values.pApartmentOrSuiteNumber,TODO:Need this code
              addressType: AddressType.Physical,
              country: values.pCountry,
              state: values.pState,
              // postboxNumber: values.postal_code,TODO:Need this code
            },
            // {
            //   street: values.pStreetAddress,
            //   city: values.pCity,
            //   postalCode: values.pPostalCode,
            //   // apartment: values.pApartmentOrSuiteNumber,TODO:Need this code
            //   addressType: AddressType.Mailing,
            //   country: values.pCountry,
            //   state: values.pState,
            // },
          ],
        }
        if( getContentWriterData?._id)
        {
          inp['_id'] = getContentWriterData?._id
        }

    CallMutation(props.mutate, {variables: {
        input: inp
      }})
  },
})(CompleteContentWriterRegistrationForm)

const CompleteContentWriterRegistration = (props: IContentWriterForm) => {
  const router = useRouter()
  const { token } = router?.query

  const [
    getContentWriter,
    { data: getContentWriterData, loading: contentWriterLoading },
  ] = useLazyQuery<{ getUserDetailByToken: UserWithToken }>(
    GET_USER_DETAIL_BY_TOKEN,
    {
      client: clientAdmin,
      fetchPolicy: NetworkOnly,
      onCompleted:(data) => {
        setLocalStorageItem( LOCAL_STORAGE_KEY.ADMIN_TOKEN,
          data?.getUserDetailByToken?.token ? data?.getUserDetailByToken?.token : ''
        )
      }
    }
  )

  const [mutate, { loading: updateLoading }] = useMutation(
      token ? UPDATE_CONTENT_WRITER: ADD_CONTENT_WRITER,

    {
      client: clientAdmin,
      onCompleted: (data) => {
        router?.push({
          pathname: routPath.thankyouScreenCP,
          query: {
            path: 'c',
          },
        })
        WSMessage({
          type: 'success',
          messageValue: 'Profile Completed Successfully',
        })
      },
    }
  )

  useEffect(() => {
    if(token){
      getContentWriter({
        variables: {
          token,
        },
      })
    }
  }, [router?.query])

  return (
    <CompleteContentWriterHandler
      loading={contentWriterLoading}
      updateLoading={updateLoading}
      mutate={mutate}
      getContentWriterData={
        getContentWriterData?.getUserDetailByToken?.userInfo
      }
    />
  )
}

export default CompleteContentWriterRegistration
