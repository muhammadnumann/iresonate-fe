import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useElements, CardElement, useStripe } from '@stripe/react-stripe-js';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import { Radio, Checkbox } from 'antd';
// components
import {
  WSForm,
  WSMessage,
  WSButton,
  WSCard,
  WSInput,
  WSRow,
  WSCol,
  WSImage,
} from 'src/component/common';
// constants
import { MAKE_PAYMENT } from 'src/graphql/Mutations/mutation';
import { donationAmount, donationAmountData } from 'src/utils/staticData';
import { getLocalStorageItem, getSessionStorageItem, setLocalStorageItem } from 'src/utils/helper';
import { DonationSchema, PaymentFormSchema } from 'src/utils/formikValidation';
import { images } from 'src/utils/image';
import { domainRegex, formLabelName, LOCAL_STORAGE_KEY, NetworkOnly } from 'src/utils/enums';
import {
  CONTENT_WRITER_LIST,
  GET_CONTENTPROVIDER_DETAIL,
  GET_WEBHOST_DETAIL,
} from 'src/graphql/Queries/queries';
// style
import './payment.module.less';
import { PaginatedContentWriterType, Roles } from 'src/typeGeneratedAdmin';
import { clientAdmin } from 'pages/_app';

const CheckoutForm: React.FC = () => {
  const router = useRouter();
  const [contentWriterId, SetContentWriterId] = useState('');
  const [webhostURL, SetWebHostURL] = useState<string>('https://360technosoft.com');

  const stripe = useStripe();
  const elements = useElements();

  const [createPayment, { loading }] = useMutation(MAKE_PAYMENT);

  const [getWebhostDetails, { data }] = useLazyQuery(GET_WEBHOST_DETAIL, {
    variables: {
      webhostURL: webhostURL,
    },
  })
  useEffect(() => {
    false && getWebhostDetails();
  }, []);

  let domainUrlName: string;
  if (webhostURL) {
    let domainUrl: URL | string = new URL(webhostURL);
    domainUrlName = domainUrl.hostname.match(domainRegex)[1];
  }

  const dateBetween = {};
  const sortBy = {};
  const [getContentWriterList, { data: PaginatedUserListType, loading: ContentWriterLoading }] =
    useLazyQuery<{ contentWriterList: PaginatedContentWriterType }>(
      CONTENT_WRITER_LIST,
      {
        fetchPolicy: NetworkOnly,
        client: clientAdmin,
      }
    )
  useEffect(() => {
    false && getContentWriterList({
      variables: {
        limit: 1,
        offset: 1,
        searchTerm: '',
        ...sortBy,
        ...dateBetween,
      },
    })
  }, [])

  console.log(data)
  console.log(PaginatedUserListType)
  let webhostId
  let cpFirstName
  let cpLastName
  let cpMarkUp
  let cpId
  if (!ContentWriterLoading && !loading) {
    webhostId = data?.getWebhostDetail._id
    cpFirstName = PaginatedUserListType?.contentWriterList.nodes[0]?.firstName || '';
    cpLastName = PaginatedUserListType?.contentWriterList.nodes[0]?.lastName || '';
    cpMarkUp = PaginatedUserListType?.contentWriterList.nodes[0].markUp;
    cpId = PaginatedUserListType?.contentWriterList.nodes[0]._id;
  }


  const { finansialContact } = data?.getWebhostDetail || {};
  const { firstName: whFirstName, lastName: whLastName } = finansialContact || {};

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };
  const getDonorFirstName = () => {
    if (getSessionStorageItem('webHostId')) {
      const name = JSON.parse(getLocalStorageItem('Name'));
      return name?.firstName;
    }
  };

  const authToken = getLocalStorageItem('auth_token');
  const redirectToHome = (price, donorFirstName) => {
    const donorName = donorFirstName ? donorFirstName : getDonorFirstName();
    router.push({
      pathname: '/payment/success',
      query: {
        price,
        domainUrlName,
        whFirstName,
        whLastName,
        donorName,
        cpFirstName,
        cpLastName,
      },
    });
  };

  return (
    <Formik
      initialValues={{
        donationAmount: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        registerAsDonor: false,
        otherDonation: '',
        websiteUrl: '',
      }}
      validationSchema={authToken ? DonationSchema : PaymentFormSchema}
      onSubmit={async (values) => {
        const {
          email,
          firstName,
          middleName,
          lastName,
          mobileNumber,
          donationAmount,
          otherDonation,
          registerAsDonor,
          websiteUrl
        } = values;

        const card = elements.getElement(CardElement);
        console.log(card)

        const result = await stripe.createToken(card);
        console.log(result)

        const guestUser = {
          email,
          firstName,
          middleName: middleName ? middleName : null,
          lastName,
          mobileNumber: mobileNumber ? mobileNumber : null,
        };



        const paymentDetails = {
          token: webhostId || '620384e306d49ac46e8e678d',
          contentWriterId: cpId || '6203b48bbd6397f7711da116',
          amount:
            values.donationAmount === 'other'
              ? parseInt(otherDonation)
              : parseInt(donationAmount),
          currency: 'usd',
          websiteUrl: webhostURL || '',
          sourceToken: result.token.id,
          registerAsDonor,
        };
        try {
          if (result?.error) {
            return WSMessage({
              type: 'error',
              messageValue: result?.error?.message || 'Error',
            });
          } else {
            let response = await createPayment({
              variables: {
                input: authToken
                  ? { ...paymentDetails }
                  : { ...paymentDetails, guestUser: guestUser },
              },
            });
            if (response?.data?.makePayment?.paymentStatus === 'succeeded') {
              card.clear();
              return redirectToHome(
                response.data.makePayment.amount,
                guestUser.firstName
              );
            }
          }
        } catch (error) {
          WSMessage({
            type: 'error',
            messageValue: error?.message || 'Error',
          });
        }
      }}
      render={({ setFieldValue, handleSubmit, values, touched }) => {
        return (
          <div
            className={`payment-form-section ${authToken ? 'payment-options-section' : ''
              }`}
          >
            <WSForm className='payment-form' {...layout} labelAlign='left'>
              {!authToken && (
                <div className='user-donation-form'>
                  <WSRow gutter={[8, 12]}>
                    <WSCol span={8}>
                      <WSInput
                        name='firstName'
                        placeholder={formLabelName.firstName}
                        label='Name'
                        inputLabel
                      />
                    </WSCol>
                    <WSCol span={8}>
                      <WSInput
                        name='middleName'
                        placeholder={formLabelName.middleName}
                        className='input-filed-col'
                      />
                    </WSCol>
                    <WSCol span={8}>
                      <WSInput
                        name='lastName'
                        placeholder={formLabelName.lastName}
                        className='input-filed-col'
                      />
                    </WSCol>
                    <WSCol span={14}>
                      <WSInput
                        name='email'
                        placeholder={formLabelName.email}
                        inputLabel
                      />
                    </WSCol>
                    <WSCol span={10}>
                      <WSInput
                        name='mobileNumber'
                        placeholder={formLabelName.mobileNumber}
                        inputLabel
                      />
                    </WSCol>
                    <WSCol span={24}>
                      <WSInput
                        name='websiteUrl'
                        placeholder={formLabelName.websiteURL}
                        inputLabel
                      />
                    </WSCol>
                    <WSCol span={12}>
                      <Checkbox
                        name='registerAsDonor'
                        value={values.registerAsDonor}
                        className='register-as-donor'
                        onChange={() =>
                          setFieldValue(
                            'registerAsDonor',
                            !values.registerAsDonor
                          )
                        }
                      >
                        {donationAmountData.registerDonor}
                      </Checkbox>
                    </WSCol>
                  </WSRow>
                </div>
              )}
              <WSCard className='make-donation-form'>
                <span className='donation-amount'>
                  {donationAmountData.donationAmount}
                </span>
                <div className='donation-amount-container'>
                  {donationAmount.map(({ title, id }) => (
                    <div key={id}>
                      <Radio.Group
                        className='donation-amount-radio'
                        onChange={(e) =>
                          setFieldValue('donationAmount', e.target.value)
                        }
                        value={values.donationAmount}
                        name='donationAmount'
                      >
                        <Radio value={id}>{title}</Radio>
                      </Radio.Group>
                    </div>
                  ))}
                </div>
                {values.donationAmount === 'other' && (
                  <WSCol span={24} className={`${touched.otherDonation && "other-donation-col"}`}>
                    <WSInput
                      name='otherDonation'
                      placeholder='Donate minimum $2 or max'
                      className='minimum-input'
                      onChange={(e) =>
                        setFieldValue('otherDonation', e.target.value)
                      }
                    />
                  </WSCol>
                )}
                <WSRow gutter={[16, 12]}>
                  {/* TODO:need this code */}
                  {/* <WSCol span={24}> */}
                  {/* <WSSelect
                        placeholder='Select Donation Amount'
                        name='donationAmount'
                        isFormik
                        setFieldValue={setFieldValue}
                        data={DonationAmount}
                        className='select-donation-amount'
                      /> */}
                  {/* </WSCol> */}
                  <WSCol span={24}>
                    <CardElement
                      options={{
                        hidePostalCode: true,
                        style: {
                          base: {
                            fontSize: '14px',
                            color: 'rgba(0, 0, 0, 0.85)',
                            '::placeholder': {
                              color: '#bfbfbf',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </WSCol>
                </WSRow>
              </WSCard>
              <WSRow>
                <WSCol span={24}>
                  <div className='make-payment-btn'>
                    <WSButton
                      type='primary'
                      loading={loading}
                      onClick={() => handleSubmit()}
                      disabled={!values.donationAmount}
                    >
                      {donationAmountData.makePayment}
                    </WSButton>
                  </div>
                </WSCol>
              </WSRow>
              <div className='iresonate-logo-section'>
                <WSImage
                  src={images.iResonate}
                  className='img-fluid iresonate-logo'
                />
                <WSImage
                  src={images.stripeIcon}
                  className='img-fluid strip-logo'
                />
              </div>
            </WSForm>
          </div>
        );
      }}
    />
  );
};

export default CheckoutForm;
