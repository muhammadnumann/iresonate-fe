export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AUDIT_LOG_DATA: any;
  /** A date and time, represented as an ISO-8601 string */
  DateTimeScalar: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};


export type Address = {
  __typename?: 'Address';
  street?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state: Scalars['String'];
  postalCode: Scalars['String'];
  country: Scalars['String'];
  addressType: AddressType;
  apartment?: Maybe<Scalars['String']>;
  postboxNumber?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  street?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state: Scalars['String'];
  postalCode: Scalars['String'];
  addressType: AddressType;
};
export type NameInput = {
  firstName?: Scalars['String'];
  lastName: Scalars['String'];
  title: Scalars['String']
};
export type EmailInput = {
  email?: Scalars['String'];
  primaryEmail: Scalars['String'];
};

export enum AddressType {
  Physical = 'Physical',
  Mailing = 'Mailing'
}

export type Admin = {
  __typename?: 'Admin';
  _id: Scalars['String'];
  name: Scalars['String'];
  mobileNumber?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  role: Role;
  createdAt: Scalars['DateTimeScalar'];
  updatedAt: Scalars['DateTimeScalar'];
};

export type AdminLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  userType: Login_Usertype;
};

export type AdminRevenues = {
  __typename?: 'AdminRevenues';
  group: Scalars['String'];
  adminRevenue: Scalars['Float'];
  website?: Maybe<Scalars['String']>;
  cwName?: Maybe<Scalars['String']>;
  vendorName?: Maybe<Scalars['String']>;
};

export enum AuditLogModuleNames {
  User = 'User',
  Payment = 'Payment',
  Transaction = 'Transaction',
  Login = 'Login',
  SaveBankAccount = 'SaveBankAccount',
  EditBankAccount = 'EditBankAccount'
}

export type AuditLogUserDetail = VendorDetail | ContentWriterDetail | Admin | DonorDetail;

export type AuditLogs = {
  __typename?: 'AuditLogs';
  createdAt: Scalars['DateTimeScalar'];
  updatedAt: Scalars['DateTimeScalar'];
  _id: Scalars['String'];
  ipAddress?: Maybe<Scalars['String']>;
  moduleName: Scalars['String'];
  logType: Scalars['String'];
  message: Scalars['String'];
  data: Scalars['AUDIT_LOG_DATA'];
  userId?: Maybe<AuditLogUserDetail>;
};

export type CwRevenues = {
  __typename?: 'CWRevenues';
  group: Scalars['String'];
  cwRevenue: Scalars['Float'];
  cwName?: Maybe<Scalars['String']>;
  vendorName?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type ContactDetail = {
  __typename?: 'ContactDetail';
  firstName?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  jobTitle?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  officeTelePhoneNumber?: Maybe<Scalars['String']>;
  directTelePhoneNumber?: Maybe<Scalars['String']>;
};

export type ContactDetailInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  jobTitle: Scalars['String'];
  title: Scalars['String'];
  email: Scalars['String'];
  officeTelePhoneNumber?: Maybe<Scalars['String']>;
  directTelePhoneNumber?: Maybe<Scalars['String']>;
};

export type ContentWriter = {
  __typename?: 'ContentWriter';
  createdAt: Scalars['DateTimeScalar'];
  updatedAt: Scalars['DateTimeScalar'];
  _id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  status: Scalars['Boolean'];
  isProfileCompleted: Scalars['Boolean'];
  markUp?: Maybe<Scalars['Float']>;
  stripeAccountStatus: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  role: Role;
  middleName?: Maybe<Scalars['String']>;
  vendorId: Vendor;
  mobileNumber?: Maybe<Scalars['String']>;
  address?: Maybe<Array<Address>>;
  landlineNumber?: Maybe<Scalars['String']>;
  isBankAccountAdded: Scalars['Boolean'];
};

export type ContentWriterCreateInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  middleName: Scalars['String'];
  lastName: Scalars['String'];
  markUp: Scalars['Float'];
};

export type ContentWriterDetail = {
  __typename?: 'ContentWriterDetail';
  createdAt: Scalars['DateTimeScalar'];
  updatedAt: Scalars['DateTimeScalar'];
  _id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  title: Scalars['String'];
  email: Scalars['String'];
  status: Scalars['Boolean'];
  isProfileCompleted: Scalars['Boolean'];
  markUp?: Maybe<Scalars['Float']>;
  stripeAccountStatus: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  role: Role;
  vendorId: Vendor;
  mobileNumber?: Maybe<Scalars['String']>;
  address?: Maybe<Array<Address>>;
  isBankAccountAdded: Scalars['Boolean'];
};

export type ContentWriterWithToken = {
  __typename?: 'ContentWriterWithToken';
  token: Scalars['String'];
  userInfo: ContentWriter;
};

export type Country = {
  __typename?: 'Country';
  createdAt: Scalars['DateTimeScalar'];
  updatedAt: Scalars['DateTimeScalar'];
  _id: Scalars['String'];
  name: Scalars['String'];
  code: Scalars['String'];
};

export type Dashboard = {
  __typename?: 'Dashboard';
  vendor: Scalars['Int'];
  admin: Scalars['Int'];
  user: Scalars['Int'];
  contentWriter: Scalars['Int'];
  totalContentWriters: Scalars['Int'];
  totalUsers: Scalars['Int'];
  totalPayments?: Maybe<Array<TotalPayments>>;
  totalDonation: Scalars['Float'];
  totalRevenue: Scalars['Float'];
  vendorEarnings: Scalars['Float'];
  contentWriterEarnings: Scalars['Float'];
  totalVendorRevenues: Array<VendorRevenues>;
  totalCWRevenues: Array<CwRevenues>;
  totalAdminRevenues: Array<AdminRevenues>;
};

export enum DashboardFilter {
  Yearly = 'YEARLY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY',
  Daily = 'DAILY'
}

export type DateBetween = {
  fromDate: Scalars['String'];
  toDate: Scalars['String'];
};


export type Donor = {
  __typename?: 'Donor';
  createdAt: Scalars['DateTimeScalar'];
  updatedAt: Scalars['DateTimeScalar'];
  _id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  role: Role;
  middleName?: Maybe<Scalars['String']>;
  address?: Maybe<Array<Address>>;
  status: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  mobileNumber?: Maybe<Scalars['String']>;
};

export type DonorDetail = {
  __typename?: 'DonorDetail';
  createdAt: Scalars['DateTimeScalar'];
  updatedAt: Scalars['DateTimeScalar'];
  _id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  role: Role;
  title?: Maybe<Scalars['String']>;
  address?: Maybe<Array<Address>>;
  status: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  mobileNumber?: Maybe<Scalars['String']>;
};

export type ForgotResetPasswordInput = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type ForgotpasswordInput = {
  email: Scalars['String'];
};


export enum Login_Usertype {
  Admin = 'ADMIN',
  Vendor = 'VENDOR',
  ContentWriter = 'CONTENT_WRITER'
}

export enum LogType {
  Success = 'Success',
  Error = 'Error'
}

export type LoginUnion = Vendor | ContentWriter | Admin;

export type Mutation = {
  __typename?: 'Mutation';
  createVendor: VendorWithToken;
  updateVendor: Response;
  deleteVendor: Response;
  registerUser: UserWithToken;
  updateDonor: Response;
  updateAdmin: Response;
  deleteDonor: Response;
  login: UserWithToken;
  changeUserStatus: User;
  forgotPassword: Scalars['Boolean'];
  forgotRestPassword: User;
  resetPassword: User;
  createContentWriter: ContentWriter;
  updateContentWriter: ContentWriterWithToken;
  updateContentWriterProfile: Response;
  updateContentWriterByVendor: Response;
  deleteContentWriter: Response;
  createRole: Role;
  updateRole: Role;
  deleteRole: Role;
};


export type MutationCreateVendorArgs = {
  input: VendorRegisterInput;
};


export type MutationUpdateVendorArgs = {
  input: UpdateVendorInput;
};


export type MutationDeleteVendorArgs = {
  id: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  input: UserInput;
};


export type MutationUpdateDonorArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateAdminArgs = {
  input: UpdateAdminInput;
};


export type MutationDeleteDonorArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  input: AdminLoginInput;
};


export type MutationChangeUserStatusArgs = {
  id: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  input: ForgotpasswordInput;
};


export type MutationForgotRestPasswordArgs = {
  input: ForgotResetPasswordInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationCreateContentWriterArgs = {
  input: ContentWriterCreateInput;
};


export type MutationUpdateContentWriterArgs = {
  input: UpdateWriterCreateInput;
};


export type MutationUpdateContentWriterProfileArgs = {
  input: UpdateWriterProfileInput;
};


export type MutationUpdateContentWriterByVendorArgs = {
  input: UpdateWriterCreateInputByVendor;
};


export type MutationDeleteContentWriterArgs = {
  id: Scalars['String'];
};


export type MutationCreateRoleArgs = {
  input: RoleInput;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationDeleteRoleArgs = {
  roleId: Scalars['String'];
};

export type PaginatedAuditLogsType = {
  __typename?: 'PaginatedAuditLogsType';
  nodes?: Maybe<Array<AuditLogs>>;
  totalCount: Scalars['Int'];
};

export type PaginatedContentWriterType = {
  __typename?: 'PaginatedContentWriterType';
  nodes?: Maybe<Array<ContentWriter>>;
  totalCount: Scalars['Int'];
};

// WebHost Return Type
export type PaginatedWebHostType = {
  __typename?: 'PaginatedWebHostType';
  nodes?: Maybe<Array<Vendor>>;
  totalCount: Scalars['Int'];
};

export type PaginatedAvailableContentWriterType = {
  __typename?: 'PaginatedAvailableContentWriterType';
  nodes?: Maybe<Array<ContentWriter>>;
  totalCount: Scalars['Int'];
};

export type PaginatedTransactionListType = {
  __typename?: 'PaginatedTransactionListType';
  nodes?: Maybe<Array<TransactionList>>;
  totalCount: Scalars['Int'];
};

export type PaginatedUserListType = {
  __typename?: 'PaginatedUserListType';
  nodes?: Maybe<Array<UserList>>;
  totalCount: Scalars['Int'];
};
export type PaginatedAvailableUserListType = {
  __typename?: 'PaginatedAvailableUserListType';
  nodes?: Maybe<Array<UserList>>;
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  auditLogList: PaginatedAuditLogsType;
  getUser: UserDetailUnion;
  getCountries: Array<Country>;
  getAllUsers: UserListUnion;
  getUserDetailByToken: UserWithToken;
  contentWriterList: PaginatedContentWriterType;
  singleContentWriter: ContentWriterDetail;
  getUrlForBankVerification: Scalars['String'];
  getAllRoles: Array<Role>;
  getRole: Role;
  getSingleTransaction: Transactions;
  getAllTransactions: PaginatedTransactionListType;
  getAllVendorPayments: PaginatedTransactionListType;
  getAllContentWriterPayments: PaginatedTransactionListType;
  getAllDonatedMembers: PaginatedUserListType;
  dashboardGroups: Scalars['JSON'];
  dashboardCount: Dashboard;
};


export type QueryAuditLogListArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  logType?: Maybe<LogType>;
  moduleName?: Maybe<AuditLogModuleNames>;
  userName?: Maybe<Scalars['String']>;
  datesBetween?: Maybe<DateBetween>;
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryGetAllUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  searchTerm?: Maybe<Scalars['String']>;
  userType?: Maybe<Usertype>;
  datesBetween?: Maybe<DateBetween>;
  sortBy?: Maybe<Array<SortByInput>>;
};


export type QueryGetUserDetailByTokenArgs = {
  token: Scalars['String'];
};


export type QueryContentWriterListArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  searchTerm?: Maybe<Scalars['String']>;
  datesBetween?: Maybe<DateBetween>;
  sortBy?: Maybe<Array<SortByInputContentWriter>>;
};


export type QuerySingleContentWriterArgs = {
  id: Scalars['String'];
};


export type QueryGetUrlForBankVerificationArgs = {
  country: Scalars['String'];
};


export type QueryGetSingleTransactionArgs = {
  id: Scalars['String'];
};


export type QueryGetAllTransactionsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  searchTerm?: Maybe<Scalars['String']>;
  datesBetween?: Maybe<DateBetween>;
  sortBy?: Maybe<Array<SortByArgs>>;
  isPaidToVendor?: Maybe<Scalars['Boolean']>;
  isPaidToCW?: Maybe<Scalars['Boolean']>;
};


export type QueryGetAllVendorPaymentsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  searchTerm?: Maybe<Scalars['String']>;
  datesBetween?: Maybe<DateBetween>;
  sortBy?: Maybe<Array<SortByArgs>>;
  isPaidToVendor?: Maybe<Scalars['Boolean']>;
  isPaidToCW?: Maybe<Scalars['Boolean']>;
};


export type QueryGetAllContentWriterPaymentsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  searchTerm?: Maybe<Scalars['String']>;
  datesBetween?: Maybe<DateBetween>;
  sortBy?: Maybe<Array<SortByArgs>>;
  isPaidToVendor?: Maybe<Scalars['Boolean']>;
  isPaidToCW?: Maybe<Scalars['Boolean']>;
};


export type QueryGetAllDonatedMembersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  searchTerm?: Maybe<Scalars['String']>;
  vendor?: Maybe<Scalars['String']>;
  datesBetween?: Maybe<DateBetween>;
  sortBy?: Maybe<Array<SortByArguments>>;
};


export type QueryDashboardGroupsArgs = {
  group: DashboardFilter;
};


export type QueryDashboardCountArgs = {
  filter?: Maybe<DashboardFilter>;
  userId?: Maybe<Scalars['String']>;
};

export enum Roles {
  Enduser = 'ENDUSER',
  Admin = 'ADMIN',
  Vendor = 'VENDOR',
  ContentWriter = 'CONTENT_WRITER',
  Default = 'DEFAULT'
}
export enum UserRoles {
  ADMIN = 'Admin',
  VENDOR = 'Vendor',
  ENDUSER = 'Member',
  CONTENT_WRITER = 'Content Writer',
}

export type ResetPasswordInput = {
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type Response = {
  __typename?: 'Response';
  _id: Scalars['String'];
  message: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTimeScalar'];
  updatedAt: Scalars['DateTimeScalar'];
  _id: Scalars['String'];
  name: Scalars['String'];
};

export type RoleInput = {
  name: Scalars['String'];
};

export type SortByArgs = {
  field: SortByFieldNames;
  order: SortByOrder;
};

export type SortByArguments = {
  field: SortingByFieldNames;
  order: SortingByOrder;
};

export enum SortByFieldNames {
  MemberName = 'MEMBER_NAME',
  MemberEmail = 'MEMBER_EMAIL'
}

export type SortByInput = {
  field: SortingByUserFields;
  order: SortingBy;
};

export type SortByInputContentWriter = {
  field: SortingByContentWriterFields;
  order: SortingByInContentWriter;
};

export enum SortByOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum SortingBy {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum SortingByContentWriterFields {
  Name = 'NAME',
  Email = 'EMAIL'
}

export enum SortingByFieldNames {
  Name = 'NAME',
  Email = 'EMAIL'
}

export enum SortingByInContentWriter {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum SortingByOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum SortingByUserFields {
  Name = 'NAME',
  Email = 'EMAIL'
}

export type TotalPayments = {
  __typename?: 'TotalPayments';
  totalDonation: Scalars['Float'];
  totalRevenue: Scalars['Float'];
  vendorEarnings: Scalars['Float'];
  contentWriterEarnings: Scalars['Float'];
  group: Scalars['String'];
};

export type TransactionList = {
  __typename?: 'TransactionList';
  createdAt: Scalars['DateTimeScalar'];
  updatedAt: Scalars['DateTimeScalar'];
  _id: Scalars['String'];
  paymentStatus: Scalars['String'];
  amount: Scalars['Float'];
  chargeId: Scalars['String'];
  contentWriter?: Maybe<ContentWriter>;
  isPaidToVendor: Scalars['Boolean'];
  isPaidToCW: Scalars['Boolean'];
  vendorMarkup?: Maybe<Scalars['Float']>;
  contentWriterMarkup?: Maybe<Scalars['Float']>;
  vendorPaidAmount?: Maybe<Scalars['String']>;
  admingotAmount?: Maybe<Scalars['String']>;
  contentWriterPaidAmount?: Maybe<Scalars['String']>;
  vendorPaymentId?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
  whPaymentDate?: Maybe<Scalars['DateTimeScalar']>;
  cpPaymentDate?: Maybe<Scalars['DateTimeScalar']>;
  payer?: Maybe<Donor>;
  vendor?: Maybe<Vendor>;
};

export type Transactions = {
  __typename?: 'Transactions';
  createdAt: Scalars['DateTimeScalar'];
  updatedAt: Scalars['DateTimeScalar'];
  _id: Scalars['String'];
  paymentStatus: Scalars['String'];
  amount: Scalars['Float'];
  chargeId: Scalars['String'];
  payer?: Maybe<Donor>;
  vendor?: Maybe<Vendor>;
  contentWriter?: Maybe<ContentWriter>;
  isPaidToVendor: Scalars['Boolean'];
  isPaidToCW: Scalars['Boolean'];
  vendorMarkup?: Maybe<Scalars['Float']>;
  contentWriterMarkup?: Maybe<Scalars['Float']>;
  vendorPaidAmount?: Maybe<Scalars['String']>;
  admingotAmount?: Maybe<Scalars['String']>;
  contentWriterPaidAmount?: Maybe<Scalars['String']>;
  vendorPaymentId?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
  whPaymentDate?: Maybe<Scalars['DateTimeScalar']>;
  cpPaymentDate?: Maybe<Scalars['DateTimeScalar']>;
};

export enum Usertype {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  Vendor = 'VENDOR',
  ContentWriter = 'CONTENT_WRITER',
  Default = 'DEFAULT'
}

export type UpdateAdminInput = {
  _id: Scalars['String'];
  name: Scalars['String'];
  mobileNumber?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};

export type UpdateRoleInput = {
  name: Scalars['String'];
  id: Scalars['String'];
};

export type UpdateUserInput = {
  _id: Scalars['String'];
  firstName: Scalars['String'];
  title: Scalars['String'];
  lastName: Scalars['String'];
  mobileNumber?: Maybe<Scalars['String']>;
  address: Array<AddressInput>;
};

export type UpdateVendorInput = {
  webhostCorporateName: Scalars['String'];
  irsEinNumber: Scalars['String'];
  address: Array<AddressInput>;
  primaryTelePhoneNumber: Scalars['String'];
  websites: Array<WebsiteInput>;
  finansialContact: ContactDetailInput;
  technicalContact: ContactDetailInput;
  _id: Scalars['String'];
};

export type UpdateWriterCreateInput = {
  firstName: Scalars['String'];
  title: Scalars['String'];
  email: Scalars['String'];
  lastName: Scalars['String'];
  markUp: Scalars['Float'];
  _id?: Maybe<Scalars['String']>;
  mobileNumber: Scalars['String'];
  password: Scalars['String'];
  address: Array<AddressInput>;
};

export type AddWriterCreateInput = {
  firstName: Scalars['String'];
  title: Scalars['String'];
  email: Scalars['String'];
  lastName: Scalars['String'];
  markUp: Scalars['Float'];
  mobileNumber: Scalars['String'];
  password: Scalars['String'];
  address: Array<AddressInput>;
};

export type UpdateWriterCreateInputByVendor = {
  firstName: Scalars['String'];
  title: Scalars['String'];
  lastName: Scalars['String'];
  markUp: Scalars['Float'];
  _id: Scalars['String'];
  mobileNumber: Scalars['String'];
  // landlineNumber?: Maybe<Scalars['String']>;
  address: Array<AddressInput>;
};

export type UpdateWriterProfileInput = {
  firstName: Scalars['String'];
  middleName: Scalars['String'];
  lastName: Scalars['String'];
  markUp: Scalars['Float'];
  _id: Scalars['String'];
  mobileNumber: Scalars['String'];
  landlineNumber?: Maybe<Scalars['String']>;
  address: Array<AddressInput>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTimeScalar'];
  updatedAt: Scalars['DateTimeScalar'];
  _id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName: Scalars['String'];
  mobileNumber: Scalars['String'];
  email: Scalars['String'];
  status: Scalars['Boolean'];
  isProfileCompleted: Scalars['Boolean'];
  accountId?: Maybe<Scalars['String']>;
  markUp?: Maybe<Scalars['Float']>;
  vendorId?: Maybe<User>;
  vendorIdentity?: Maybe<Scalars['String']>;
  stripeAccountStatus: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  url?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
  role: Role;
  address: Array<Address>;
};

export type UserDetailUnion = VendorDetail | ContentWriterDetail | Admin | DonorDetail;

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  middleName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  userType: Roles;
};

export type UserList = {
  __typename?: 'UserList';
  createdAt: Scalars['DateTimeScalar'];
  updatedAt: Scalars['DateTimeScalar'];
  _id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName: Scalars['String'];
  mobileNumber: Scalars['String'];
  email: Scalars['String'];
  status: Scalars['Boolean'];
  isProfileCompleted: Scalars['Boolean'];
  accountId?: Maybe<Scalars['String']>;
  markUp?: Maybe<Scalars['Float']>;
  vendorId?: Maybe<User>;
  vendorIdentity?: Maybe<Scalars['String']>;
  stripeAccountStatus: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  url?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
  role: Role;
  address: Array<Address>;
};

export type UserListUnion = {
  __typename?: 'UserListUnion';
  vendor?: Maybe<Array<Vendor>>;
  contentWriter?: Maybe<Array<ContentWriter>>;
  admin?: Maybe<Array<Admin>>;
  member?: Maybe<Array<Donor>>;
  totalCount: Scalars['Int'];
};

export type UserWithToken = {
  __typename?: 'UserWithToken';
  token: Scalars['String'];
  userInfo: LoginUnion;
};

export type Vendor = {
  __typename?: 'Vendor';
  _id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  webhostCorporateName: Scalars['String'];
  irsEinNumber: Scalars['String'];
  address?: Maybe<Array<Address>>;
  primaryTelePhoneNumber: Scalars['String'];
  plateformCharges: Scalars['String'];
  websites: Array<Website>;
  finansialContact: ContactDetail;
  technicalContact: ContactDetail;
  vendorIdentity: Scalars['String'];
  isVerified: Scalars['Boolean'];
  status: Scalars['Boolean'];
  stripeAccountStatus: Scalars['Boolean'];
  isBankAccountAdded: Scalars['Boolean'];
  createdAt: Scalars['DateTimeScalar'];
  updatedAt: Scalars['DateTimeScalar'];

};

export type VendorDetail = {
  __typename?: 'VendorDetail';
  _id: Scalars['String'];
  webhostCorporateName: Scalars['String'];
  irsEinNumber: Scalars['String'];
  address?: Maybe<Array<Address>>;
  primaryTelePhoneNumber: Scalars['String'];
  websites: Array<Website>;
  finansialContact: ContactDetail;
  technicalContact: ContactDetail;
  vendorIdentity: Scalars['String'];
  isVerified: Scalars['Boolean'];
  status: Scalars['Boolean'];
  stripeAccountStatus: Scalars['Boolean'];
  isBankAccountAdded: Scalars['Boolean'];
  createdAt: Scalars['DateTimeScalar'];
  updatedAt: Scalars['DateTimeScalar'];
  role: Role;
};

export type VendorRegisterInput = {
  email: Scalars['String']
  webhostCorporateName: Scalars['String'];
  address: Array<AddressInput>;
  userDetail: NameInput;
  primaryTelePhoneNumber: Scalars['String'];
  websites: Array<WebsiteInput>;
  primaryFocus: Array<Scalars['String']>;
  hosting: Scalars['String'];
  password: Scalars['String'];
  userRole: Scalars['String'];
  platformCharges: number;
};

export type VendorRevenues = {
  __typename?: 'VendorRevenues';
  group: Scalars['String'];
  vendorRevenue: Scalars['Float'];
  vendorName?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type VendorWithToken = {
  __typename?: 'VendorWithToken';
  token: Scalars['String'];
  userInfo: Vendor;
};

export type Website = {
  __typename?: 'Website';
  url: Scalars['String'];
  clickTip: Scalars['Boolean'];
};

export type WebsiteInput = {
  url: Scalars['String'];
  clickTip?: Maybe<Scalars['Boolean']>;
};
