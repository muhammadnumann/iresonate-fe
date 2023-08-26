import gql from 'graphql-tag'

const ContactDetail = `
firstName title lastName jobTitle email officeTelePhoneNumber directTelePhoneNumber`

const commonAddressDetail = `
street city state postalCode addressType apartment postboxNumber`


// Donor User Only
export const GET_DONOR = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      _id
      firstName
      lastName
      title
      email
      role {
        _id
        name
      }
      address {
        ${commonAddressDetail}
      }
      status
      isVerified
      mobileNumber
    }
  }
`;
export const GET_ALL_DONATED_MEMBERS = gql`
  query getAllDonatedMembers($offset: Int!, $limit: Int!, $vendor: String!) {
    getAllDonatedMembers(offset: $offset, limit: $limit, vendor: $vendor) {
      nodes {
        _id
        name
        email
        status
        accountId
        vendorIdentity
        role {
          name
        }
      }
      totalCount
    }
  }
`

export const TransactionListFragment = gql`
  fragment TransactionListFields on TransactionList {
    _id
    createdAt
    paymentStatus
    amount
    payer {
      name
      email
    }
    vendor {
      name
      email
    }
    contentWriter {
      name
      email
    }
    chargeId
    admingotAmount
    vendorPaidAmount
    contentWriterPaidAmount
  }
`

export const GET_ALL_TRANSACTIONS = gql`
  query getAllTransactions(
    $offset: Int!
    $limit: Int!
    $sortBy: [SortByArgs!]
    $datesBetween: DateBetween
    $searchTerm: String
  ) {
    getAllTransactions(
      offset: $offset
      sortBy: $sortBy
      datesBetween: $datesBetween
      limit: $limit
      searchTerm: $searchTerm
    ) {
      nodes {
        _id
        createdAt
        paymentStatus
        amount
        chargeId
        contentWriter {
          firstName
          lastName
        }
        isPaidToCW
        payer{
          firstName
          lastName
          email
        }
        websiteUrl
        vendor{
          finansialContact{
            firstName
            lastName
          }
          technicalContact{
            firstName
            lastName
          }
          webhostCorporateName
          websites{
            url
            clickTip
          }
        }
        isPaidToVendor
        vendorPaidAmount
        admingotAmount
        contentWriterPaidAmount
        whPaymentDate
        cpPaymentDate
      }
      totalCount
    }
  }
`

export const GET_ALL_VENDOR_TRANSACTIONS = gql`
  query getAllVendorPayments(
    $offset: Int!
    $limit: Int!
    $searchTerm: String
    $datesBetween: DateBetween
    $sortBy: [SortByArgs!]
    $isPaidToVendor: Boolean
    $isPaidToCW: Boolean
  ) {
    getAllVendorPayments(
      offset: $offset
      limit: $limit
      sortBy: $sortBy
      searchTerm: $searchTerm
      datesBetween: $datesBetween
      isPaidToVendor: $isPaidToVendor
      isPaidToCW: $isPaidToCW
    ) {
      nodes {
        _id
        createdAt
        paymentStatus
        amount
        chargeId
        contentWriter {
          firstName
          lastName
          email
        }
        isPaidToVendor
        isPaidToCW
        admingotAmount
        contentWriterPaidAmount
        vendorPaidAmount
        websiteUrl
        whPaymentDate
        payer {
          firstName
          lastName
          email
        }
        vendor {
          _id
        }
      }
      totalCount
    }
  }
`

// GET ALL CONTENT WRITER PAYMENT
export const GET_ALL_CONTENT_WRITER_PAYMENT = gql`
  query getAllContentWriterPayments(
    $offset: Int!
    $limit: Int!
    $searchTerm: String
    $datesBetween: DateBetween
    $sortBy: [SortByArgs!]
    $isPaidToCW: Boolean
  ) {
    getAllContentWriterPayments(
      offset: $offset
      sortBy: $sortBy
      limit: $limit
      datesBetween: $datesBetween
      searchTerm: $searchTerm
      isPaidToCW: $isPaidToCW
    ) {
      nodes {
        _id
        createdAt
        paymentStatus
        amount
        isPaidToVendor
        isPaidToCW
        payer {
          firstName
          lastName
          middleName
          email
        }
        vendor {
          finansialContact {
            firstName
          }
        }
        websiteUrl
        cpPaymentDate
        chargeId
        admingotAmount
        vendorPaidAmount
        contentWriterPaidAmount
      }
      totalCount
    }
  }
`

export const GET_ALL_USERS = gql`
  query getAllUsers(
    $offset: Int!
    $limit: Int!
    $userType: USERTYPE!
    $sortBy: [SortByInput!]
    $datesBetween: DateBetween
    $searchTerm: String
  ) {
    getAllUsers(
      offset: $offset
      limit: $limit
      sortBy: $sortBy
      userType: $userType
      datesBetween: $datesBetween
      searchTerm: $searchTerm
    ) {
      vendor {
        ... on Vendor {
          createdAt
          updatedAt
          _id
          name
          email
          irsEinNumber
          status
          vendorIdentity
          primaryTelePhoneNumber
          websites {
            url
            clickTip
          }
          finansialContact{
            ${ContactDetail}
          }
          technicalContact {
            ${ContactDetail}
          } 
        }
      }
      contentWriter {
        ... on ContentWriter {
            createdAt
            _id
            lastName
            title
            isProfileCompleted
            firstName
            markUp
            stripeAccountStatus
            status
            isVerified
            updatedAt
            email
            vendorId {
              ...on Vendor {
                _id
                webhostCorporateName
                irsEinNumber
                vendorIdentity
                finansialContact {
                  ... on ContactDetail {
                    firstName
                    lastName
                    email
                  }
                }
              }
            }
        }
      }
      admin {
        ...on Admin {
            _id
            name
            mobileNumber
            email
            createdAt
        }
      }
      member {
        ... on Donor {
          createdAt
          _id
          email
          lastName
          firstName
          updatedAt
          status
        }
      }
      totalCount
    }
  }
`

//ADMIN queries
export const AUDIT_LOG_LIST = gql`
  query auditLogList(
    $offset: Int!
    $limit: Int!
    $logType: LogType
    $moduleName: AuditLogModuleNames
    $userName: String
    $datesBetween: DateBetween
  ) {
    auditLogList(
      offset: $offset
      limit: $limit
      logType: $logType
      moduleName: $moduleName
      userName: $userName
      datesBetween: $datesBetween
    ) {
      nodes {
        createdAt
        updatedAt
        _id
        moduleName
        logType
        ipAddress
        message
        data
        userId {
          ... on VendorDetail {
            _id
            webhostCorporateName
            role {
              _id
              name
            }
            finansialContact {
            ${ContactDetail}
          }
          technicalContact {
            ${ContactDetail}
          }
          }
          ... on ContentWriterDetail {
              _id 
              firstName
              lastName
              title
              email
              mobileNumber
              role {
              _id
              name
            }
          }
          ... on Admin {
              _id 
              name
              mobileNumber
              email
              role {
              _id
              name
            }
          }
          ... on DonorDetail {
              _id 
              firstName
              lastName
              email
              mobileNumber
              role {
              _id
              name
            }
          }
        }
      }
      totalCount
    }
  }
`

//VENDOR queries
export const GET_SINGLE_TRANSACTION = gql`
  query getSingleTransaction($id: String!) {
    getSingleTransaction(id: $id) {
      _id
      name
      email
    }
  }
`

// CONTENT WRITER QUERYIES

export const CONTENT_WRITER_LIST = gql`
  query contentWriterList(
    $offset: Int!
    $limit: Int!
    $searchTerm: String
    $datesBetween: DateBetween
    $sortBy: [SortByInputContentWriter!]
    $available:Boolean
  ) {
    contentWriterList(
      offset: $offset
      limit: $limit
      searchTerm: $searchTerm
      datesBetween: $datesBetween
      sortBy: $sortBy
      available:$available
    ) {
      nodes {
        _id
        firstName
        email
        lastName
        markUp
        status
        createdAt
        address {
        ${commonAddressDetail}
      }
      vendorId {
              ...on Vendor {
                _id
                webhostCorporateName
                vendorIdentity
              }
            }
      }
      totalCount
    }
  }
`
export const CONTENT_WRITER_LIST_AVAILABLE = gql`
  query contentWriterListAvailable(
    $offset: Int!
    $limit: Int!
    $searchTerm: String
    $datesBetween: DateBetween
    $sortBy: [SortByInputContentWriter!]
    $available:Boolean
  ) {
    contentWriterListAvailable(
      offset: $offset
      limit: $limit
      searchTerm: $searchTerm
      datesBetween: $datesBetween
      sortBy: $sortBy
      available:$available
    ) {
      nodes {
        _id
        firstName
        email
        lastName
        markUp
        status
        createdAt
        address {
        ${commonAddressDetail}
      }
      vendorId {
              ...on Vendor {
                _id
                webhostCorporateName
                vendorIdentity
              }
            }
      }
      totalCount
    }
  }
`
export const WEB_HOST_LIST = gql`
  query vendorList(
    $offset: Int!
    $limit: Int!
    $searchTerm: String
    $datesBetween: DateBetween
    $sortBy: [SortByInputWebHost!]
  ) {
    vendorList(
      offset: $offset
      limit: $limit
      searchTerm: $searchTerm
      datesBetween: $datesBetween
      sortBy: $sortBy
    ) {
      nodes {
        _id
        email
        markUp
        status
        createdAt
        name
        address {
        ${commonAddressDetail}
        }
      }
      totalCount
    }
  }
`

//SINGLE GET CONTENT WRITER
export const GET_SINGLE_CONTENT_WRITER = gql`
  query singleContentWriter($id: String!) {
    singleContentWriter(id: $id) {
      _id
      firstName
      email
      lastName
      markUp
      status
      createdAt
    }
  }
`
// Admin,ContentProvider,WebHost User Only
export const GET_USER = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      #Admin
      ... on Admin {
        _id
        name
        mobileNumber
        email
        role {
              _id
              name
          }
      }
      # VendorDetail
      ... on VendorDetail {
          _id
          webhostCorporateName
          # firstName
          # lastName
          # title
          irsEinNumber
          address {
          
              ${commonAddressDetail}
          
          }
          primaryTelePhoneNumber
          websites {
                url
                clickTip
            }
          finansialContact {
            ${ContactDetail}
          }
          technicalContact {
            ${ContactDetail}
          }
          vendorIdentity
          isVerified
          status 
          stripeAccountStatus
          isBankAccountAdded
          role {
              _id
              name
          }
      }
      # ContentWriterDetail
      ... on ContentWriterDetail {
          _id
          firstName
          lastName
          title
          email
          status
          isProfileCompleted
          markUp
          stripeAccountStatus
          isVerified
          role {
            _id
            name
        }
        vendorId {
          vendorIdentity
        }
        mobileNumber
        address {
            ${commonAddressDetail}
        }
       
        isBankAccountAdded
      }
      # DonorDetail
      ... on DonorDetail {
        _id
        firstName
        lastName
        title
        email
        role {
            _id
            name
        }
        address {
            ${commonAddressDetail}
        }
        status
        isVerified
        mobileNumber
      }
      
    }
  }
`
export const GET_USER_DETAIL_BY_TOKEN = gql`
  query getUserDetailByToken($token: String!) {
    getUserDetailByToken(token: $token) {
      userInfo {
        ... on ContentWriter {
          _id
          firstName
          lastName
          title
          email
          status
          markUp
          createdAt
          isProfileCompleted
          updatedAt
          role {
            _id
          }
          isVerified
          stripeAccountStatus
        }
      }
      token
    }
  }
`

export const GET_BANK_URL_VERIFICATION = gql`
  query getUserDetailByToken($country: String!) {
    getUrlForBankVerification(country: $country)
  }
`
export const GET_DASHBOARD_GROUPS = gql`
  query dashboardGroups($group: DashboardFilter!) {
    dashboardGroups(group: $group)
  }
`
export const GET_WEBHOST_DETAIL = gql`
query getWebhostDetail($webhostURL: String!) {
    getWebhostDetail(webhostURL: $webhostURL) {
      _id
      webhostCorporateName
      firstName
      lastName
      irsEinNumber
      websites {
        url
        clickTip
      }
       finansialContact {
        firstName
        lastName
      }
      technicalContact {
        firstName
        lastName
      }
    }
  }
`
export const GET_CONTENTPROVIDER_DETAIL = gql`
query getContentProviderDetail($cpId: String!) {
  getContentProviderDetail(cpId: $cpId) {
    _id
    firstName
    lastName
    title
    }
  }
`
