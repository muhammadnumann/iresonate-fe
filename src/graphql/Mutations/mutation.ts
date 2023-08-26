import gql from 'graphql-tag'
const ContactDetail = `
firstName title lastName jobTitle email officeTelePhoneNumber directTelePhoneNumber`
const commonAddressDetail = `
street city state postalCode addressType apartment postboxNumber`

export const CHANGE_USER_STATUS = gql`
  mutation changeUserStatus($id: String!) {
    changeUserStatus(id: $id) {
      _id
      role {
        name
      }
      status
    }
  }
`

export const REGISTER_USER = gql`
  mutation registerUser($input: UserInput!) {
    registerUser(input: $input) {
      userInfo {
        _id
        name
        email
      }
      token
    }
  }
`

export const LOGIN_MEMBER_USER = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
      userInfo {
        _id
        status
        firstName
        lastName
      }
    }
  }
`

export const LOGIN_USER = gql`
  mutation adminLogin($input: AdminLoginInput!) {
    login(input: $input) {
      token
      userInfo {
        __typename
        ... on Vendor {
          _id
          # name
          firstName
          lastName
          webhostCorporateName
          status
          primaryTelePhoneNumber
          address {
            ${commonAddressDetail}
          }
        
          websites {
          url
          clickTip
        }
          vendorIdentity
          stripeAccountStatus
        }
        ... on ContentWriter {
          _id
          stripeAccountStatus
          firstName
          lastName
          title
          email
          role {
            _id
            # name
          }
        }
        ... on Admin {
          _id
          # name
          email
          mobileNumber
          role {
            _id
            # name
          }
        }
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      _id
      name
      email
      vendorIdentity
      role {
        name
      }
    }
  }
`

export const MAKE_PAYMENT = gql`
  mutation makePayment($input: CreateChargeInout!) {
    makePayment(input: $input) {
      amount
      paymentStatus
    }
  }
`

export const RESET_PASSWORD_MEMBER = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      firstName
    }
  }
`

//ADMIN queries
export const REGISTER_USER_ADMIN = gql`
  mutation registerUser($input: UserInput!) {
    registerUser(input: $input) {
      userInfo {
        _id
        name
        email
        status
        role {
          _id
          name
        }
      }
      token
    }
  }
`
export const UPDATE_ADMIN_PROFILE = gql`
  mutation updateAdmin($input: UpdateAdminInput!) {
    updateAdmin(input: $input) {
      _id
      message
    }
  }
`

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($input: ForgotpasswordInput!) {
    forgotPassword(input: $input)
  }
`

export const FORGOT_RESET_PASSWORD = gql`
  mutation forgotRestPassword($input: ForgotResetPasswordInput!) {
    forgotRestPassword(input: $input) {
      firstName
      email
    }
  }
`
export const VERIFY_ACCOUNT = gql`
  mutation verifyAccount($token: String!) {
    verifyAccount(token: $token) {
      token
    }
  }
`

// CONTENT WRITER ADD

export const CREATE_CONTENT_WRITER = gql`
  mutation createContentWriter($input: ContentWriterCreateInput!) {
    createContentWriter(input: $input) {
      createdAt
      firstName
      title
      lastName
      email
      markUp
    }
  }
`

// CONTENT WRITER DELETE

export const DELETE_CONTENT_WRITER = gql`
  mutation deleteContentWriter($id: String!) {
    deleteContentWriter(id: $id) {
      _id
      message
    }
  }
`
// CONTENT WRITER PROFILE

export const UPDATE_CONTENT_WRITER_PROFILE = gql`
  mutation updateContentWriterProfile($input: UpdateWriterProfileInput!) {
    updateContentWriterProfile(input: $input) {
      _id
      message
    }
  }
`

// CONTENT WRITER UPDATE

export const UPDATE_CONTENT_WRITER = gql`
  mutation updateContentWriter($input: UpdateWriterCreateInput!) {
    updateContentWriter(input: $input) {
      token
      userInfo {
        _id
      }
    }
  }
`
// CONTENT WRITER UPDATE

export const ADD_CONTENT_WRITER = gql`
  mutation addContentWriter($input: AddWriterCreateInput!) {
    addContentWriter(input: $input) {
      userInfo {
        _id
      }
  }
  }
`

// SAVE PROFILE VENDOR

export const SAVE_PROFILE = gql`
  mutation saveProfile($input: ProfileInput!) {
    saveProfile(input: $input) {
      url
    }
  }
`

export const ADD_MEMBER_MUTATION = gql`
  mutation addMember($input: UserInput!) {
    registerUser(input: $input) {
      userInfo {
        __typename
      }
    }
  }
`

export const UPDATE_MEMBER_MUTATION = gql`
  mutation donorUpdate($input: UpdateUserInput!) {
    updateDonor(input: $input) {
      _id
      message
    }
  }
`
export const UPDATE_DONOR_PROFILE_MUTATION = gql`
  mutation updateDonorProfile($input: DonorUpdateInput!) {
    updateDonorProfile(input: $input) {
      _id
      message
    }
  }
`

//* Change Status

export const CHANGE_ACTIVE_STATUS = gql`
  mutation changeUserStatus($id: String!) {
    changeUserStatus(id: $id) {
      _id
      role {
        name
      }
      status
    }
  }
`

export const DELETE_VENDOR = gql`
  mutation deleteVendor($id: String!) {
    deleteVendor(id: $id) {
      _id
      message
    }
  }
`

// Create Vendor MutationRegisterUserArgs
export const CREATE_VENDOR = gql`
  mutation createVendor($input: VendorRegisterInput!) {
    createVendor(input: $input) {
      token
      userInfo {
        _id
      }
    }
  }
`

// Update Content Writer From Vendor

export const UPDATE_CONTENT_WRITER_FROM_VENDOR = gql`
  mutation updateContentWriterByVendor(
    $input: UpdateWriterCreateInputByVendor!
  ) {
    updateContentWriterByVendor(input: $input) {
      _id
      message
    }
  }
`
// Update Vendor From Admin

export const UPDATE_VENDOR_FROM_ADMIN = gql`
  mutation updateVendor($input: UpdateVendorInput!) {
    updateVendor(input: $input) {
      _id
      message
    }
  }
`

export const SAVE_CONTACT_US = gql`
  mutation saveContactUs($input: ContactUsInput!) {
    saveContactUs(input: $input) {
      message
    }
  }
`
// delete Donor
export const DELETE_DONOR = gql`
  mutation deleteDonor($id: String!) {
    deleteDonor(id: $id) {
      _id
      message
    }
  }
`
