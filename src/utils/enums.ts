import { WatchQueryFetchPolicy } from '@apollo/client'

export enum TableHeight {
  defaultHeight = 599,
}
export const NetworkOnly: WatchQueryFetchPolicy = 'network-only'

// Member Layout
export const memberSidebar = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
}
// Admin Layout
export const adminSidebar = {
  dashboard: 'Dashboard',
  auditLog: 'Audit Logs',
  webHost: 'Web Hosts',
  donor: 'Donors',
  adminUsers: 'Admin Users',
  transactions: 'Transactions',
  contentProviders: 'Content Providers',
  instructions: 'Instructions',
}
// Vendor Layout
export const vendorSidebar = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  contentWriters: ' Content Providers',
  instructions: 'Instructions',
}
//ContentWriter Layout
export const contentWriterSidebar = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  web_host: 'Web Host',
}

export const dashboard_Title = {
  adminDashboard: 'Admin Dashboard',
  donorDashboard: 'Donor Dashboard',
  contentProviderDashboard: 'ContentProvider Dashboard',
  webHostDashboard: 'Web Host Dashboard',
  totalRevenue: "totalRevenue",
  vendorEarnings: "vendorEarnings",
  contentProviderEarnings: "contentProviderEarnings",
  admin: "admin",
  contentWriterEarnings: "contentWriterEarnings",
  totalContentWriters: "totalContentWriters",
  totalUsers: "totalUsers",
  user: "user",
  vendor: "vendor",
  contentWriter: "contentWriter",
  totalDonation: "totalDonation"
}

export const Chart_Title = {
  webHostRevenue: 'Web Host Revenue',
  CpRevenues: 'Content Provider Revenue',
  donationToWebHosts: 'Donation to Web Hosts',
  donationToContentProviders: 'Donation to Content Providers',
  totalDonation: 'Total Donation',
  totalRevenue: 'Total Revenue',
  NoOfUser: 'No. of Users',
  TotalEarnings: 'Total Earnings (in USD)',
  Top10ContentProviderBlogs: "Top 10 Content Provider Blogs"
}

export const StaticString = {
  UNAUTHENTICATED_CAPS: 'UNAUTHENTICATED',
  JWT: 'Your session has been timed out, please login again',
  UNAUTHENTICATED_SMALL: 'Unauthorized',
  SOMETHING_WENT_WRONG: 'something went wrong',
}

export const roleTitle = {
  admin: "Admin",
  contentProvider: 'content-provider',
  webHost: "web-host",
  donor: "donor",
}
export const contentProvider = "ContentWriterDetail"
export const VendorDetail = "VendorDetail"
export const Admin = "Admin"
export const DonorDetail = "DonorDetail"

export const roleTypes = {
  contentProvider: "Content Provider",
  webHosts: "Web Host",
  admin: "Admin",
  donor: "Donor",
}

export enum DashboardMessages {
  totalContentWriters = "Total Content Providers",
  totalDonation = 'Total Donation',
  contentWriter = 'Total Content Providers',
  contentWriterEarnings = 'Content Providers Earning',
  vendorEarnings = 'Web Hosts Earning',
  admin = 'Total Admin',
  totalUsers = 'Total Donors',
  user = 'Total Donors',
  totalRevenue = 'iResonate Earning',
  vendor = 'Total Web Hosts',
}


export enum DashboardMessagesContentProvider {
  totalDonation = 'Total Donation',
  totalUsers = 'Total Donors',
  contentWriterEarnings = 'Total Earning',
}

export enum Messages {
  totalDonation = 'Total Donation',
  contentWriter = 'Total Content Writer',
  contentWriterEarnings = 'Content Writer Earning',
  vendorEarnings = 'Vendor Earnings',
  admin = 'Total Admin',
  totalUsers = 'Total Members',
  user = 'Total Member',
  totalRevenue = 'Admin Earning',
  vendor = 'Total Vendors',
}

export const SortOrderTableEnum = {
  ascend: 'ASC',
  descend: 'DESC',
}
export const SortFieldTableEnum = {
  Name: 'NAME',
  Email: 'EMAIL',
}

export const TransactionSortFieldTableEnum = {
  MEMBER_NAME: 'MEMBER_NAME',
  MEMBER_EMAIL: 'MEMBER_EMAIL',
}

export const SortOrder = {
  ASCENDING: 'ASC',
  DESCENDING: 'DESC',
}

export const MODULE_NAME_ENUM = {
  1: 'User',
  2: 'Payment',
  3: 'Transaction',
  4: 'Login',
  5: 'Save_bank_account',
  6: 'Edit_bank_account',
}

export enum ActiveStep {
  stepZero = 0,
  stepOne = 1,
  stepTwo = 2,
  stepThree = 3,
  stepFour = 4,
  stepFive = 5,
}

export const CURRENT_ACTIVE_STEP = {
  0: ActiveStep.stepZero,
  1: ActiveStep.stepOne,
  2: ActiveStep.stepTwo,
  3: ActiveStep.stepThree,
  4: ActiveStep.stepFour,
}
export const FormikValidation = {
  passwordCharacter: 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
  phoneNumberNotValid: 'Mobile no. length should be 10 digits only',
  invalidEmailAccount: 'Invalid Email Account',
  passwordsMustMatch: 'Passwords must match',
};

export const Regex: {
  PhoneRegEx: RegExp;
  PasswordRegEx: RegExp;
  CharacterRegX: RegExp;
} = {
  PhoneRegEx: /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
  PasswordRegEx: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/,
  CharacterRegX: /^[aA-zZ\s]+$/,
};

export const WebHostTermsCondition = {
  stepName: "Terms & Conditions",
  stepDescription: " Please read the Terms & Conditions, check the I Agree box and click on Agree to open your account.",
  title: "Webhost",
  firstParagraph: "Affiliate websites that display our ClickTip™ button are eligible to earn a percentage of each donation that is made to content providers by content viewers.",
  secondParagraph: "In using iResonate’s API on your website, you must provide iResonate contact information for the content provider. This contact information is for the direct benefit of the website, content provider, and iResonate and will not be shared or otherwise disseminated to others including the donor. ",
  thirdParagraph: "When a donation is made, the transaction will be processed securely by Stripe and a portion of the donation will be allocated to your account. This may be considered to be taxable income. If so, it will be reported to the IRS and you will receive a 1099. In the case where the webhost is also the content provider, such as in a single author blogsite, the webhost will also receive the donation less transaction fees. Individual donations to content providers, under $20,000, are deemed to be a gift and are not reported to the Internal Revenue Service. ",
  fourParagraph: "Accounts with a balance of at least $25 will be transferred monthly to the webhost via ACH or Stripe. Using their custom dashboard, the webhost will be able to see their account, transfers, and content and authors receiving donations on their website.",
}

export const DonorTermsCondition = {
  stepName: "Step 2. Terms & Conditions",
  stepDescription: "Please read our Terms & Conditions and check I Agree to activate your account.",
  title: "Donor",
  firstParagraph: "Registration with iResonate allows you to make donations to content providers as a Thank You for their work in developing content that you appreciate. It also makes it much easier for you to make future donations to other content providers. Registration gives you access to a custom dashboard showing your donations, content providers and websites plus future innovations that are under development.",
  secondParagraph: "Using the ClickTip™ button, registered donors may make a financial donation for content that resonates with them. This “Thank You” is considered to be a financial gift and should not be taxable to the content provider. A percentage of your donation will be allocated for the website hosting the content as a thank you for hosting excellent content. Processing fees will also be deducted and credited to both Stripe and iResonate.",
  thirdParagraph: "Your donations will remain anonymous and iResonate will maintain privacy of your name and contact information. And, you will have the option to easily opt out of iResonate if you choose to do so.",
}

export const ContentWriterTermsCondition = {
  stepName: "Step 4. Terms & Conditions",
  stepDescription: "Please read our Terms & Conditions, check the I Agree box, and click Agree to activate your account.",
  title: "Content Provider",
  firstParagraph: "Individual viewers of your content may make a financial donation to you using the ClickTip™ button on participating websites. Individual donations under the $20,000 are deemed to be non-taxable and are not reported to the Internal Revenue Service.",
  secondParagraph: "When a donation is made, your contact information is provided by the website hosting your content to iResonate. iResonate will use this Information to check to see if you are signed up. If so, it will allocate your donation, less fees, into your account and alert you to the donation. If not already signed up, it will establish a pending account for the net funds and endeavor to notify you via the received contact information.",
  thirdParagraph: "Accumulated funds will be held in a pending account until you register at which point your account become active and you will be able to see your dashboard with donation amounts and website sources, account total, and other information. Accumulated funds will be sent to account holder accounts via an ACH or Stripe transfer on a monthly basis when a monthly balance exceed $50. Donations to pending accounts that are not registered by a content provider will be held for 90 days at which time they will be released to iResonate.",
  fourParagraph: "Donations will incur certain deductions. These include transaction fees (Stripe and iResonate), and a percentage to the website hosting your content.",
  fiveParagraph: "Registered content providers will have access to a custom dashboard showing their account balance and transfers, timing and amount of donations, and the websites and content tied to each donation. Future functionality is already in the works to help content providers optimize their value."
}

export const cardTitle = {
  contentProvider: "Content Providers",
  editDonor: "Edit Donor",
  editWebHost: "Edit Web Host",
  adminUsers: "Admin Users",
  donors: "Donors",
  donorsProfile: "Edit Donors Profile",
  webHosts: "Web Hosts",
  webHostLogin: "Web Host Login",
  donorLogin: "Donor Login",
  contentProviderLogin: "Content Provider Login",
  adminLogin: 'Admin Login',
  auditLogs: 'Audit Logs',
  viewContentProvider: 'View Content Provider',
  editContentProvider: 'Edit Content Provider',
  editContentProviderProfile: "Edit Content Provider Profile",
  transactions: 'Transactions',
  editWebHostProfile: "Edit Web Host Profile",
  iResonate: "iResonate",
  instructions: "INSTALLATION INSTRUCTIONS"
}

export const formLabelName = {
  oldPassword: "Old Password",
  firstTitle: "Title",
  newPassword: "New Password",
  password: "Password",
  changePassword: "Change Password",
  confirmPassword: "Confirm Password",
  confirm_password: "confirm_password",
  name: "Name",
  email: "email",
  eMailAddress: "E-mail Address",
  primaryEmailAddress: "Primary E-mail Address",
  mobileNumber: "Mobile Number",
  mailingAddress: "Mailing Address",
  firstName: "First Name",
  title: "Title",
  middleName: "Middle Name",
  lastName: "Last Name",
  enterEmailAddress: "Enter email address",
  enterMobileNumber: "Enter mobile number",
  streetAddress: "Street Address",
  city: "City",
  state: "State",
  postalCode: "Postal Code",
  country: "Country",
  enterPassword: "Enter Password",
  enterPasswordAgain: "Enter password again",
  webhostCorporateName: 'Webhost Corporate Name',
  iRSEinNumber: 'IRS EIN Number',
  physicalAddress: 'Physical Address',
  primaryTelephoneNumber: 'Primary Telephone Number',
  enterTelephoneNumber: 'Enter Telephone Number',
  platformCharges: 'Enter PlateForm Charges %',
  websiteURL: 'Website URL',
  enterYourWebsiteURL: 'Enter Your Website URL',
  websiteTitle: 'websiteTitle',
  pleaseEnterWebsite: 'Please Enter Website',
  addWebsiteBtn: 'Add Website',
  editWebsiteBtn: "Edit Website",
  websiteDemo: 'websiteDemo',
  websites: "websites",
  jobTitle: 'Job Title',
  officeTelephoneNumber: 'Office Telephone Number',
  enterOfficeTelephoneNumber: 'Enter office telephone number',
  enterYourDesignation: 'Enter your designation',
  directTelephoneNumber: 'Direct Telephone Number',
  enterOtherTelephoneNumber: 'Enter other telephone number',
  enterJobTitle: 'Enter Job Title',
  emailAddress: 'Email Address',
  forgotPassword: 'Forgot Password?',
  loginBtn: 'LOGIN',
  SignUp: 'Signup ',
  SignUpToday: 'SIGN UP TODAY',
  search: 'Search',
  deleteModelText: 'Are you sure you want to delete ?',
  landlineNumber: 'Landline Number',
  postOfficeBoxNumber: 'Post OfficeBox Number',
  contactDetails: 'Contact Details:',
  submit: 'Submit',
  cancel: ' Cancel',
  home: 'Home',
  aboutUs: 'About Us',
  contactUs: 'Contact Us',
  previousBtn: 'Previous',
  viewWebsites: "View Websites",
  addContentProvider: "Add Content Provider",
  addWebHost: "Add Content Provider",
  add: "Add",
  editYourBankAccount: "Edit your Bank Account",
  addYourBankAccount: "Add your Bank Account",
  fullName: 'Full Name',
  message: "Message",
  submitting: "Submitting",
  thankYouForYourVerification: "Thank you for your verification!",
  signIn: "Sign in",
  addYourWebsite: "Add Your Website(s)",
  financialContact: "Financial Contact",
  technicalContact: "Technical Contact",
  iRSEINNo: "IRS EIN No.",
  addBankAccount: "Add Bank Account",
  addBankAccountDetails: "Add your bank account details by clicking below button",
  Websites: "Websites",
  searchType: 'search',
  noAccount: "Don't have an account ?",
}
export enum API_NAME {
  getAllUsers = "getAllUsers",
  contentWriterList = "contentWriterList"
}
export enum Steps {
  activeStep = 'activeStep'
}

export const stepFormDetails = {
  step1PersonalDetails: 'Step 1. Personal Details',
  pDContent: 'Enter your detail to create your account',
  step1Description: `Enter your details to create your account" to "Create your account`,
  step2TermsConditions: 'Step 2. Terms & Conditions',
  step2Description: `Please read our Terms and Conditions and click on "Agree" to activate your ClickTip™ account.`,
  haveAnAccount: 'Have an account ?',
  login: 'Login',
  signUp: 'SIGN UP',
  agree: 'Agree',
  acceptTc: 'acceptTc',
  nextStep: 'Next Step',
  acceptCheckbox: 'Please check this box if you want to process',

  step1WebHostCorporateDetails: 'Webhost Corporate Details',
  step1DonorDetailsDetails: 'Donor Details',
  step1ContentProviderCorporateDetails: 'Content Provider Details',
  webHostContent: 'Enter Corporate Details',
  ContentProiderContent: 'Enter Corporate Details',
  step1webHostCorporateContent: 'Enter Corporate name, IRS EIN number and corporate address',
  webHostAddWebsite: 'Add Your Website(s)',
  webHostAddWebsiteContent: `Websites with a select button for a ClickTip™ Button after each website`,
  step3primarydetail: 'Primary Theme(s).',
  primaryThemeContent: 'Enter Primary Theme details.',
  step4webHosting: 'Website Hosting.',
  webHostingContent: 'Enter Website Hosting details.',
  step6TermsCondition: 'Terms & Condition',
  termsConditionsContent: 'Please Agree to Terms & Conditions',

  step3FinancialContact: 'Step 3. Financial Contact',
  financialContent: 'Enter Financial Contact details.',
  step4TechnicalContact: 'Step 3. Primary Theme',
  technicalContent: 'Enter Technical Contact details',

  completeFinancialContent: 'Complete the Financial Contact details',
  technicalContact: 'Fill the Technical contact details',
  step1ContentProviderDetails: "Step 1. Content Provider Details",
  enterMailingDetails: "Enter Mailing Details",
}

export enum LOCAL_STORAGE_KEY {
  AUTH_TOKEN = "auth_token",
  USER_ROLE = "user_role",
  USER_INFO = "user_info",
  CURRENT_USER = "currentUser",
  NAME = "Name",
  ADMIN_TOKEN = "admin_token",
  STRIPE_ACCOUNT_STATUS = "stripeAccountStatus"
}
export enum PAYMENT_STATUS {
  CLEARED = 'Cleared',
  PENDING = "Pending",
}

export const webHostSameAsField = {
  mStreetAddress: 'mailingAddress.mStreetAddress',
  mCity: 'mailingAddress.mCity',
  mState: 'mailingAddress.mState',
  mPostalCode: 'mailingAddress.mPostalCode',
  mCountry: 'mailingAddress.mCountry',
}

export const completeProfileField = {
  mStreetAddress: 'mStreetAddress',
  mCity: 'mCity',
  mState: 'mState',
  mPostalCode: 'mPostalCode',
  mCountry: 'mCountry',
}

export const homePageField = {
  clickItTipIt: 'Click It, Tip It!',
  whatIsIResonate: 'What is iResonate?',
  whoCanIresonate: 'Who Can Resonate with iResonate?',
  whoCanIresonateFirstContent: 'There are three types of users who benefit from using ClickTip™. They include: Donors,',
  whoCanIresonateSecondContent: 'Content Providers, and Webhosts.',
  donor: 'DONOR',
  donorContent: `Want to say "Thank You" for the content that you are enjoying, learning from, or that appeals to your inner emotion?  ClickTip™ now gives you the power to provide a tangible reward directly.  An easy sign up and all future donations will be a piece of cake.  You will also have access to your own personal dashboard showing your donations, websites, content providers and, in the future, recommendations for additional content that will resonate with you. `,
  signUp: 'Sign Up',
  donorSignUp: 'Register Today',
  contentProvider: 'CONTENT PROVIDER',
  contentProviderContent: 'Overlaying current revenue schemes from others such as affiliate marketing and commissions, content providers may now receive financial donations directly from their viewers on participating websites. Signup is painless and will give you access to your own personal dashboard on our website which will show donation sources and amounts. As we grow, we already have plans for further value and opportunities.',
  webHost: 'WEBHOST',
  webHostContent: 'After signing an affiliate agreement, our technical team will provide you with an API which will enable ClickTip™. This takes you beyond the “Like” Button— Think of it as a like button on steroids. Not only do you earn a small percentage of each donation as a thank you for hosting great content but you also will also have other great benefits including:',
  webHostLastContent: 'Future benefits include suggestions on how to maximize your revenue from all sources.',
  howDoesClickTipWork: "How Does ClickTip™ Work?",
  step2: 'Step 2',
  step: [
    'Content resonates with a viewer on a participating website and the viewer wants to reward it.',
    'Content resonates with a viewer on a participating website and the viewer wants to reward it.',
    'Content resonates with a viewer on a participating website and the viewer wants to reward it.',
    'Content resonates with a viewer on a participating website and the viewer wants to reward it. ',
  ],
  step2Content: 'The viewer clicks on the ClickTip™ button. If already signed up, the viewer will enter their password and can then make a donation.  If not signed up, they will be prompted to do so.',
  step4: 'Step 4',
  step4Content: 'Accumulated funds with a balance of at least $255 are released monthly to content providers and webhosts via ACH transfer or Stripe Credit.',
  step1: 'Step 1',
  step1Content: 'Content resonates with a viewer on a participating website and the viewer wants to reward the content provider.',
  step3: 'Step 3',
  step3Content: `The donation is securely processed by Stripe and the content provider's account is credited minus transaction fees and a percentage to the website. The donor receives confirmation of the transaction.  If the content provider has not signed up with iResonate, an email is automatically generated informing them that a donation has been made to them and requesting that they sign up.  In this case, their pending account will be held in escrow until the signup is complete.`,
  meetOurTeam: 'Meet Our Team',
  zekeFairbank: 'Zeke Fairbank',
  ceoFounder: 'CEO & Founder',
  zekeFairbankFirstContent: `An innovator since an early age, and ground with  degrees in engineering and business, Zeke has founded and managed successful businesses and operations worldwide. During 10 years with The Coca-Cola Company, Zeke with instrumental in Coke's reentry into Russia and Ukraine, fast tracked critical process technology installations in 22 countries, and built from the ground up a supply chain organization covering sub-Sahara Africa. On his own, he founded several  companies including FairPond Enterprises (MySailboat.com), The Alternative Energy Company, and iResonate Corporation.`,
  zekeFairbankSecondContent: 'In his free time Zeke enjoys racing sailboats and playing ice hockey.',
  shashankPandya: 'Shashank Pandya',
  ctoCoFounder: 'CTO & Co-Founder',
  shashankPandyaFirstContent: 'Shashank is a founder, CTO and polyglot engineer. He was the founder and CTO of tech startups TULLY, Where and Share, and Social Rockfish. He worked for dating apps Hinge and Badoo where he was responsible for app architecture, back and front end development, recommendation engines and infra scaling. Shashank has built, managed and scaled teams in India, Belarus and the U.S., growing them from 1 to 40 people. He is from Vallabh Vidyanagar, India .',
  shashankPandyaSecondContent: 'In his free time, Shashank likes the beach, hiking or adventure trips and loves to cook.  He is also a die hard fan soccer, and the Chelsea Football Club!',
  elizabethAbrams: 'Elizabeth Abrams',
  advisorMarketing: 'Advisor- Marketing',
  elizabethAbramFirstContent: 'Elizabeth has 15+ years experience in branding, marketing and product development in the digital space. After receiving and MBA (Marketing) she worked at Ogilvy & Mather on the  IBM Business Partner account, led product development for the intranet for 25,000 employees and oversaw their website including content strategy and creation. At the Omnicom Media Group she managed their global thought leadership website and major events. On her own,  she led client services and marketing for a startup in branded entertainment for clients including MLB, NBA and the NHL and a startup in transportation.  She is currently providing branding and marketing services to numerous startups in experiential marketing, fintech and e-commerce. ',
  elizabethAbramSecondContent: 'In her spare time, Elizabeth enjoys running, yoga, meditation, creating art & gardening.',
  vr: 'VR',
  coo: 'COO',
  vrFirstContent: 'Proin ac quam et lectus vestibulum blandit. Nunc maximus nibh at placerat tincidunt. Nam sem lacus, ornare non ante sed, ultricies fringilla massa. Ut congue, elit non tempus elementum, sem risus tincidunt nt mmodo.',
  viharRana: 'Vihar Rana',
  projectManager: 'Project Manager',
  viharRanaFirstContent: 'Working for 360 Degree Technosoft, Vihar has 10+ years as a UI/UX designer. He has designed mobile apps and websites for various industries like food delivery, real estate, AI, social media, and many more. As a project manager he is responsible for managing client communication, coordinating designer and developer teams, and delivering projects on time. He has worked with clients all over the world and has overseen 400+ projects including startups, enterprises, and brands.',
  viharRanaSecondContent: 'In his free time, Vihar likes to read, watch movies, and go on road trips.'
}
export const webHostContentDetails = [

  'Allows viewers the ability to “Thank You”',
  'New direct revenue source',
  'Allows impulse donations',
  'Attracts better content for your website',
  'Provides a personalized dashboard showing revenue and sources',

]
export const whatresonate = [
  'Find a DIY blog helpful?',
  'Like that article?',
  'Watch an entertaining video?',
]
export const donorContentlist = [

  'Allows you to say “Thank You” for awesome content',
  'Registration allows makes future donations a piece of cake',
  'Personal dashboard showing donations and websites'
]
export const contentProviderlist = [
  'Allows viewers to “Thank You”',
  'New revenue source—  direct impulse donations',
  'Shows that your webhost cares about you by sharing',
  'Provides a personalized dashboard showing donations and sources',
]
export const dataFormat = {
  ddmmyyyy: 'MM-DD-YYYY',
  yyyymmdd: 'YYYY-MM-DD',
  MMM_DD_YYYY_hh_mm_a: "MMM DD, YYYY, hh:mm A",
}

export const editProfile = {
  editAdmin: "Edit Admin",
  editDonor: 'Edit Donor',
  editWebHost: 'Edit WebHost',
  editContentProvider: 'Edit Content Provider',
}

export const staticID = {
  staticID: '81681197165887323c4328b6'
}

export const dashboardStaticData = {
  totalPayments: 'totalPayments',
  typename: '__typename',
  totalCWRevenues: 'totalCWRevenues',
  totalVendorRevenues: 'totalVendorRevenues',
  totalAdminRevenues: 'totalAdminRevenues',
  countColour: '#E97E72',
  maxBarThickness: '50',
  index: 'index',
  barBackgroundColor: '#FDB000',
  bar: 'bar',
  cpBarBackgroundColor: '#9013fe',
  totalDonationDolor: 'Total Donation ($)',
  group: "group",
  blogURL: 'Blog URL',
  revenue: 'Revenue',
}

export const websiteUrl = 'https://iresonate-script.s3.amazonaws.com/gifyScript.js'

export const devWebsiteUrl = 'https://iresonate-script.s3.amazonaws.com/gifyScript-Dev.js'

export const webHostData = {
  webHostId: 'webHostId',
  contentWriterId: 'contentWriterId',
  copyScriptURL: 'Copy Script URL',
}

export const tableColumn = {
  corporateName: 'Corporate Name',
  iRSNo: 'IRS EIN No.',
  name: 'Name',
  email: 'Email',
  registrationDate: 'Registration Date',
  referenceId: 'Reference Id',
  scriptWH: 'Script WH',
  scriptCP: 'Script CP',
  website: 'Website',
  block: 'Block',
  action: 'Action',
  createdAt: 'createdAt',
  markUp: 'Mark Up (%)',
  mark: 'markUp',
  webHostName: 'Web Host Name',
  webHostEmail: 'Web Host Email',
  dataIndexEmail: 'email'
}
export const domainRegex = /^(?:.*?\.)?([a-zA-Z0-9\-_]{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/
