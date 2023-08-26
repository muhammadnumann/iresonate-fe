import { ActiveStep } from 'src/utils/enums'
import Yup from 'src/validation'
import { FormikValidation, Regex } from './enums'
import { regex } from './regex'

const commonStringField = (msg: string) => Yup.string().required(msg)

const phoneNumberField = commonStringField('Please enter your phone number')
  .test('phone-number', FormikValidation.phoneNumberNotValid, function (value) {
    return value ? value.length > 9 && value.length < 11 : true
  })
  .matches(Regex.PhoneRegEx, 'Invalid phone number')

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
})

export const fieldNotBlank = (msg = 'Name') =>
  commonStringField(msg).test(
    msg,
    `${msg} can not be Blank Spaces`,
    function (value) {
      return value?.trim() !== '' || false
    }
  )

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email is required'),
  name: fieldNotBlank('Please enter name'),
  password: fieldNotBlank('Password')
    .required('Password is required')
    .matches(
      regex.password,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf(
      [Yup.ref('password'), ''],
      "Password and Confirm Password doesn't match"
    ),
})

export const AddNewSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  name: fieldNotBlank('Name').required('Name is required'),
  password: fieldNotBlank('Password')
    .required('Password is required')
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
})

export const EditSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  name: fieldNotBlank('Name').required('Name is required'),
})

const digitsOnly = (value) => /^\d+$/.test(value)

export const ContentWriterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  markUp: Yup.string().test(
    'Digits only',
    'Mark Up field should have digits only',
    digitsOnly
  ),
})
export const WebHostSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  markUp: Yup.string().test(
    'Digits only',
    'Mark Up field should have digits only',
    digitsOnly
  ),
})

const twoDigitsOnly = (value) => value > 1

export const PaymentFormSchema = Yup.object().shape({
  donationAmount: Yup.string(),
  otherDonation: Yup.string().when('donationAmount', {
    is: (value) => value === "other",
    then: commonStringField('Please enter donation amount').test("Amount", 'Min. donation amount is $2', twoDigitsOnly),
    otherwise: Yup.string()
  }),
  websiteUrl: Yup.string().required('Website URL is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
})

export const DonationSchema = Yup.object().shape({
  donationAmount: Yup.string(),
  websiteUrl: Yup.string().required('Website URL is required'),
  otherDonation: Yup.string().when('donationAmount', {
    is: (value) => value === "other",
    then: commonStringField('Please enter donation amount').test("Amount", 'Min. donation amount is $2', twoDigitsOnly),
    otherwise: Yup.string()
  }),
})

export const EditProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  name: fieldNotBlank('Name is required'),
})

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: fieldNotBlank('Password')
    .required('Old Password is required')
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  newPassword: fieldNotBlank('New Password')
    .password()
    .required('New Password is required')
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match'),
})

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
})

export const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .password()
    .required('Password is required')
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match'),
})

export const AdddNewMemberSchema = Yup.object().shape({
  id: Yup.mixed(),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().required('Email is required'),
  mobileNumber: phoneNumberField,
  mStreetAddress: Yup.string().required('Street Address is required'),
  mCity: Yup.string().required('City is required'),
  mState: Yup.string().required('State is required'),
  mPostalCode: Yup.string().required('Postal Code is required'),
  mCountry: Yup.string().required('Country is required'),
  password: Yup.mixed().when(['id'], {
    is: (id) => !id,
    then: Yup.string().password().required('Country is required'),
  }),
  confirm_password: Yup.mixed().when(['id'], {
    is: (id) => !id,
    then: Yup.string()
      .password()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  }),
})
export const donorProfileSchema = Yup.object().shape({
  id: Yup.mixed(),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().required('Email is required'),
  mobileNumber: phoneNumberField,
  mStreetAddress: Yup.string().required('Street Address is required'),
  mCity: Yup.string().required('City is required'),
  mState: Yup.string().required('State is required'),
  mPostalCode: Yup.string().required('Postal Code is required'),
  mCountry: Yup.string().required('Country is required'),
})


export const AddDonorFormSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is required'),
  last_name: Yup.string().required('Last Name is required'),
  street_address: Yup.string().required('Street Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  mobile: Yup.string().required('Mobile Number is required'),
  postal_code: Yup.string().required('Postal Code is required'),
  country: Yup.string().required('Country is required'),
  password: Yup.string().password().required('Password is required'),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf(
      [Yup.ref('password'), ''],
      "Password and Confirm Password doesn't match"
    ),
})

export const UpdateContentWriter = Yup.object().shape({
  firstName: Yup.mixed().when(['activeStep'], {
    is: (activeStep) => activeStep == ActiveStep.stepZero,
    then: Yup.string().required('firstName is required'),
  }),

  lastName: Yup.mixed().when(['activeStep'], {
    is: (activeStep) => activeStep == ActiveStep.stepZero,
    then: Yup.string().required('lastName is required'),
  }),
  // Physical Address
  // pApartmentOrSuiteNumber: Yup.mixed().when(['activeStep'], { TODO:Need this code
  //   is: (activeStep) => activeStep == ActiveStep.stepZero,
  //   then: Yup.string().required('ApartmentOrSuiteNumber is required'),
  // }),
  pStreetAddress: Yup.mixed().when(['activeStep'], {
    is: (activeStep) => activeStep == ActiveStep.stepZero,
    then: Yup.string().required('StreetAddress is required'),
  }),
  pState: Yup.mixed().when(['activeStep'], {
    is: (activeStep) => activeStep == ActiveStep.stepZero,
    then: Yup.string().required('State is required'),
  }),

  // Mailing Address
  // mStreetAddress: Yup.mixed().when(['activeStep'], {
  //   is: (activeStep) => activeStep == ActiveStep.stepZero,
  //   then: Yup.string().required('StreetAddress is required'),
  // }),
  // // mPostOfficeBoxNumber: Yup.mixed().when(['activeStep'], {TODO:Need this code
  // //   is: (activeStep) => activeStep == ActiveStep.stepZero,
  // //   then: Yup.string().required('PostOfficeBoxNumber is required'),
  // // }),
  // mPostalCode: Yup.mixed().when(['activeStep'], {
  //   is: (activeStep) => activeStep == ActiveStep.stepZero,
  //   then: Yup.string().required('PostalCode is required'),
  // }),
  // mCity: Yup.mixed().when(['activeStep'], {
  //   is: (activeStep) => activeStep == ActiveStep.stepZero,
  //   then: Yup.string().required('City is required'),
  // }),
  // mState: Yup.mixed().when(['activeStep'], {
  //   is: (activeStep) => activeStep == ActiveStep.stepZero,
  //   then: Yup.string().required('State is required'),
  // }),
  // mCountry: Yup.mixed().when(['activeStep'], {
  //   is: (activeStep) => activeStep == ActiveStep.stepZero,
  //   then: Yup.string().required('Country is required'),
  // }),

  // Step 2
  email: Yup.mixed().when(['activeStep'], {
    is: (activeStep) => activeStep == ActiveStep.stepOne,
    then: Yup.string().required('Email is required'),
  }),
  mobileNumber: Yup.mixed().when(['activeStep'], {
    is: (activeStep) => activeStep == ActiveStep.stepOne,
    then: Yup.string().required('Mobile Number is required'),
  }),
  // landLineNumber: Yup.mixed().when(['activeStep'], {
  //   is: (activeStep) => activeStep == ActiveStep.stepOne,
  //   then: Yup.string().required('LandLine Number is required'),
  // }),
  password: Yup.mixed().when(['activeStep', 'id'], {
    is: (activeStep, id) => activeStep == ActiveStep.stepOne && !id,
    then: Yup.string().password().required('Password is required'),
  }),
  confirmPassword: Yup.mixed().when(['activeStep', 'id'], {
    is: (activeStep, id) => activeStep == ActiveStep.stepOne && !id,
    then: Yup.string()
      .password()
      .oneOf([Yup.ref('password'), ''], 'Password must match'),
  }),
})

export const webHostRegisterSchema = Yup.object().shape({

  firstTitle: Yup.string().required('Title required'),

  firstNameCorporate: Yup.string().required('First Name required'),

  lastNameCorporate: Yup.string().required('Last Name required'),

  // emailCorporatePrimary: Yup.string().required('Email required'),

  telephoneNumberCorporate: Yup.string().required('Telephone Number required'),

  streetAddressCorporate: Yup.string().required('Street Address required'),


  cityCorporate: Yup.string().required('City required'),

  stateCorporate: Yup.string().required('State required'),

  postalCodeCorporate: Yup.string().required('Portal Code required'),

  emailCorporate: Yup.string().required('Email required'),

  passwordCorporate: Yup.string().password().required('Passwords is required'),

  platformCharges: Yup.string(),

  // websiteTitle: Yup.string().matches(/^(www+\.)[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/, "Please enter valid website URL").required("Please enter at least one website URL"),
  otherwise: Yup.string().matches(/^(www+\.)[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/, "Please enter valid website URL"),

  websiteDemo: Yup.array(Yup.object()).required('Please enter at least one website URL'),

  userRole: Yup.string().required('Role required')

})
export const ContentProviderRegisterSchema = Yup.object().shape({

  firstTitle: Yup.string().required('Title required'),

  firstNameCorporate: Yup.string().required('First Name required'),

  lastNameCorporate: Yup.string().required('Last Name required'),

  // emailCorporatePrimary: Yup.string().required('Email required'),

  telephoneNumberCorporate: Yup.string().required('Telephone Number required'),

  streetAddressCorporate: Yup.string().required('Street Address required'),


  cityCorporate: Yup.string().required('City required'),

  stateCorporate: Yup.string().required('State required'),

  postalCodeCorporate: Yup.string().required('Portal Code required'),

  emailCorporate: Yup.string().required('Email required'),

  passwordCorporate: Yup.string().password().required('Passwords is required'),

  // websiteTitle: Yup.string().matches(/^(www+\.)[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/, "Please enter valid website URL").required("Please enter at least one website URL"),
  otherwise: Yup.string().matches(/^(www+\.)[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/, "Please enter valid website URL"),
  websiteDemo: Yup.array(Yup.object()).required('Please enter at least one website URL'),
  userRole: Yup.string().required('ROle required')


})
export const editWebHostAdminSchema = Yup.object().shape({
  websiteTitle: Yup.string().url("Please enter valid website URL"),

  plateformCharges: Yup.string().url("Please enter valid website URL"),
})
export const DonorRegisterSchema = Yup.object().shape({

  firstTitle: Yup.string().required('Title required'),

  firstNameCorporate: Yup.string().required('First Name required'),

  lastNameCorporate: Yup.string().required('Last Name required'),

  // emailCorporatePrimary: Yup.string().required('Email required'),

  telephoneNumberCorporate: Yup.string().required('Telephone Number required'),

  streetAddressCorporate: Yup.string().required('Street Address required'),


  cityCorporate: Yup.string().required('City required'),

  stateCorporate: Yup.string().required('State required'),

  postalCodeCorporate: Yup.string().required('Portal Code required'),

  emailCorporate: Yup.string().required('Email required'),

  passwordCorporate: Yup.string().password().required('Passwords is required'),

  // websiteTitle: Yup.string().matches(/^(www+\.)[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/, "Please enter valid website URL").required("Please enter at least one website URL"),
  otherwise: Yup.string().matches(/^(www+\.)[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/, "Please enter valid website URL"),
  // websiteDemo: Yup.array(Yup.object()).required('Please enter at least one website URL'),
  userRole: Yup.string().required('ROle required')


})
export const UpdateVendorContentWriterSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  pCity: Yup.string().required('City is required'),

  pStreetAddress: Yup.string().required('Street is required'),

  pState: Yup.string().required('State is required'),

  pPostalCode: Yup.string().required('Postal Code is required'),

  pCountry: Yup.string().required('Country is required'),
})

export const ContactUsValidation = Yup.object().shape({
  fullname: Yup.string().required('Please enter your full name'),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Please enter your email'),
  mobileNumber: phoneNumberField,

})
export const UpdateAdminProfileSchema = Yup.object().shape({
  name: Yup.string().required('Please enter name'),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Please enter your email'),
  mobileNumber: phoneNumberField,
})
