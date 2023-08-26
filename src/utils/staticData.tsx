import {
  CalculatorOutlined, DollarOutlined, FileUnknownOutlined, HomeOutlined, KeyOutlined,
  LineChartOutlined,
  ProfileOutlined, UsergroupAddOutlined, UserOutlined
} from "@ant-design/icons";
import routPath from 'src/routes/routes'
import Payment from 'pages/payment';
import DonorLogin from 'pages/donor/login';
import { adminSidebar, contentWriterSidebar, memberSidebar, vendorSidebar } from "src/utils/enums";
import { TabArrayProps } from "src/constants/interfaces";

export const DonationAmount = [
  {
    title: "$5",
    id: "5",
  },
  {
    title: "$10",
    id: "10",
  },
  {
    title: "$15",
    id: "15",
  },
  {
    title: "$20",
    id: "20",
  },
  {
    title: "$30",
    id: "30",
  },
  {
    title: "$40",
    id: "40",
  },
  {
    title: "$50",
    id: "50",
  },
];

export const dataSelector = [
  {
    title: "Daily",
    id: "DAILY",
  },
  {
    title: "Weekly",
    id: "WEEKLY",
  },
  {
    title: "Monthly",
    id: "MONTHLY",
  },
  {
    title: "Yearly",
    id: "YEARLY",
  },
];
export const titleCorporate = [
  {
    title: "Mr.",
    id: "MR",
  },
  {
    title: "Mrs.",
    id: "MRS",
  },
  {
    title: "MS.",
    id: "MS",
  },
  {
    title: "Dr.",
    id: "DR",
  },
];
export const constantPageSize = 10;

// Member Layout
export const layoutMemberSidebar = [
  {
    key: '1',
    icon: <HomeOutlined />,
    link: routPath.donorDashboard,
    name: memberSidebar.dashboard,
    routesArray: [routPath.donorDashboard],
    selected: true,
  },
  {
    key: '2',
    icon: <DollarOutlined />,
    link: routPath.donorTransactions,
    name: memberSidebar.transactions,
    routesArray: [routPath.donorTransactions],
    selected: true,
  },
]
// Admin Layout
export const layoutAdminSidebar = [
  {
    key: '1',
    icon: <HomeOutlined />,
    link: routPath.adminDashboard,
    name: adminSidebar.dashboard,
    routesArray: [routPath.adminDashboard],
    selected: true,
  },
  {
    key: '2',
    icon: <KeyOutlined />,
    link: routPath.AuditLogList,
    name: adminSidebar.auditLog,
    routesArray: [routPath.AuditLogList],
    selected: true,
  },
  {
    key: '3',
    icon: <UsergroupAddOutlined />,
    link: routPath.ContentProvider,
    name: adminSidebar.contentProviders,
    routesArray: [routPath.ContentProvider, routPath.ContentProviderView],
    selected: true,
  },
  {
    key: '4',
    icon: <UsergroupAddOutlined />,
    link: routPath.webHostList,
    name: adminSidebar.webHost,
    routesArray: [routPath.webHostList, routPath.webHostEdit],
    selected: true,
  },
  {
    key: '5',
    icon: <UsergroupAddOutlined />,
    link: routPath.DonorList,
    name: adminSidebar.donor,
    routesArray: [routPath.DonorList, routPath.DonorEdit],
    selected: true,
  },
  {
    key: '6',
    icon: <UsergroupAddOutlined />,
    link: routPath.AdminUsers,
    name: adminSidebar.adminUsers,
    routesArray: [routPath.AdminUsers],
    selected: true,
  },
  {
    key: '7',
    icon: <CalculatorOutlined />,
    link: routPath.AdminTransactions,
    name: adminSidebar.transactions,
    routesArray: [routPath.AdminTransactions],
    selected: true,
  },
  {
    key: '8',
    icon: <FileUnknownOutlined />,
    link: routPath.Instructions,
    name: adminSidebar.instructions,
    routesArray: [routPath.Instructions],
    selected: true,
  },
]
// Vendor Layout
export const layoutWebHostSidebar = [
  {
    key: '1',
    icon: <HomeOutlined />,
    link: routPath.webHostDashboard,
    name: vendorSidebar.dashboard,
    routesArray: [routPath.webHostDashboard],
    selected: true,
  },
  {
    key: '2',
    icon: <CalculatorOutlined />,
    link: routPath.webHostTransactions,
    name: vendorSidebar.transactions,
    routesArray: [routPath.webHostTransactions],
    selected: true,
  },
  {
    key: '3',
    icon: <ProfileOutlined />,
    link: routPath.webHostContentProvider,
    name: vendorSidebar.contentWriters,
    routesArray: [routPath.webHostContentProvider, routPath.webHostContentProviderEdit],
    selected: true,
  },
  {
    key: '4',
    icon: <FileUnknownOutlined />,
    link: routPath.webHostInstructions,
    name: vendorSidebar.instructions,
    routesArray: [routPath.webHostInstructions],
    selected: true,
  },
]
//ContentWriter Layout
export const layoutContentWriterSidebar = [
  {
    key: '1',
    icon: <HomeOutlined />,
    link: routPath.contentProviderDashboard,
    name: contentWriterSidebar.dashboard,
    routesArray: [routPath.contentProviderDashboard],
    selected: true,
  },
  {
    key: '2',
    icon: <UsergroupAddOutlined />,
    link: routPath.contentProviderWebHost,
    name: contentWriterSidebar.web_host,
    routesArray: [routPath.contentProviderWebHost],
    selected: true,
  },
  {
    key: '3',
    icon: <ProfileOutlined />,
    link: routPath.contentProviderTransactions,
    name: contentWriterSidebar.transactions,
    routesArray: [routPath.contentProviderTransactions],
    selected: true,
  },
]
// Admin Count List
export const CountListAdmin = [
  {
    key: "1",
    title: "Total Donation",
    count: "$ 10,000",
    icon: <DollarOutlined />,
    color: '#E97E72',
  },
  {
    key: "2",
    title: "Total Revenue",
    count: "$ 10,000",
    icon: <LineChartOutlined />,
    color: '#E97E72',
  },
  {
    key: "3",
    title: "Vendor Earning",
    count: "$ 10,000",
    icon: <DollarOutlined />,
    color: '#E97E72',
  },
  {
    key: "4",
    title: "Content Writer Earning",
    count: "$ 10,000",
    icon: <DollarOutlined />,
    color: '#E97E72',

  },
  {
    key: "5",
    title: "Total Members",
    count: "1000",
    icon: <UserOutlined />,
    color: '#E97E72',
  },
  {
    key: "6",
    title: "Total Vendors",
    count: "1000",
    icon: <UserOutlined />,
    color: '#E97E72',
  },
  {
    key: "7",
    title: "Total Content Writers",
    count: "1000",
    icon: <UserOutlined />,
    color: '#E97E72',
  }
]
// Vendor count list
export const CountListVendor = [
  {
    key: "1",
    title: "Total Donation",
    count: "$ 10,000",
    icon: <DollarOutlined />,
    color: '#E97E72',
  },
  {
    key: "2",
    title: "Total Revenue",
    count: "$ 10,000",
    icon: <LineChartOutlined />,
    color: '#E97E72',
  },
  {
    key: "3",
    title: "Admin Earning",
    count: "$ 10,000",
    icon: <DollarOutlined />,
    color: '#E97E72',
  },
  {
    key: "4",
    title: "Content Writer Earning",
    count: "$ 10,000",
    icon: <DollarOutlined />,
    color: '#E97E72',
  },
  {
    key: "5",
    title: "Total Members",
    count: "1000",
    icon: <UserOutlined />,
    color: '#E97E72',
  },
  {
    key: "6",
    title: "Total Content Writers",
    count: "1000",
    icon: <UserOutlined />,
    color: '#E97E72',
  },
]
// ContentWriter count list
export const CountListContentWriter = [
  {
    key: "1",
    title: "Total Donation",
    count: "$ 10,000",
    icon: <DollarOutlined />,
    color: '#E97E72',
  },
  {
    key: "2",
    title: "Total Revenue",
    count: "$ 10,000",
    icon: <LineChartOutlined />,
    color: '#E97E72',
  },
  {
    key: "3",
    title: "Vendor Earning",
    count: "$ 10,000",
    icon: <DollarOutlined />,
    color: '#E97E72',
  },
  {
    key: "4",
    title: "Total Members",
    count: "1000",
    icon: <UserOutlined />,
    color: '#E97E72',
  }
]
// Member count list
export const CountListMember = [
  {
    key: "1",
    title: "Total Donation",
    count: "$ 10,000",
    icon: <DollarOutlined />,
    color: '#E97E72',
  },
  {
    key: "2",
    title: "Total Vendors",
    count: "20",
    icon: <UserOutlined />,
    color: '#E97E72',
  },
]

export const loginMenuData = [
  {
    key: 1,
    name: "Content Provider",
    href: routPath.contentProviderLogin,
  },
  {
    key: 2,
    name: "Web Host",
    href: routPath.webHostLogin,
  },
  {
    key: 3,
    name: "Donor",
    href: routPath.donorLogin,
  },

]
export const webHostingData = [

  {
    key: 1,
    name: "Blogger",
  },
  {
    key: 2,
    name: "Blue Host",
  },
  {
    key: 3,
    name: "Ghost",
  },
  {
    key: 4,
    name: "Squarespace",
  },
  {
    key: 5,
    name: "Weebly",
  },
  {
    key: 6,
    name: "Wix",
  },
  {
    key: 7,
    name: "WordPress",
  },
  {
    key: 8,
    name: "Other - Description",
  },

]
export const signUpMenuData = [
  {
    key: 1,
    name: "Donor Registration",
    href: routPath.donorRegistration,
  },
  {
    key: 2,
    name: "Web Host Registration",
    href: routPath.webHostRegistrations,
  },
  {
    key: 3,
    name: "Content Provider Registration",
    href: routPath.contentProviderRegistrations,
  },
]

export const adminInstructionsData = {
  title: 'Administrators have to follow the below steps:',
  firstSection: '1) In the Web Hosts module, copy the script from the column called "Script WH" and share with web host. The script will look like as below:',
  firstSectionUrl: 'https://iresonate-script.s3.amazonaws.com/gifyScript.js?webHostId=ducJSDfpClePYHuzoibIKsobaowDVOtc',
  secondSection: '2) Admin will have to add their bank account details into Stripe and use the same email address as an admin of the iResonate. For admin, 10% markup has been set up in the system by default for all the web hosts.'
}

export const webHostInstructionsData = {
  titleA: 'A) To install  ClickTip on your website (without individual content providers) you will have to copy the URL script given to you (under your profile- top right corner of your dashboard) to your site’s header <head> tag on your home page.',
  forExample: 'For example:',
  firstScriptTag: '<script id="ClickTipScript" src=" https://iresonate-script.s3.amazonaws.com/gifyScript.js?webHostId=ducJSDfpClePYHuzoibIKsobaowDVOtc"></script>',
  noteTheSpaces: 'Note, the specific URL that you are given needs to be wrapped with the <script> as shown in white above before placement.',
  clickTip: '<div id = “ClickTip”> </div>',
  doNotForget: 'Don’t forget to save your changes... ',
  titleB: 'B) If you want to have ClickTip buttons on a website (with for individual content contributors) you will first have to add them on your dashboard under the Content Providers + Add tab.  After they are added, you will be able to copy their script.',
  secondDonateButtonScriptC1: '<script id="ClickTipScriptC1" src="https://iresonate-script.s3.amazonaws.com/gifyScript.js?webHostId=ducJSDfpClePYHuzoibIKsobaowDVOtc &contentWriterId=611cbcc254600d7b2cd6e05c"></script>',
  noteTheSpecific: 'Note, the specific URL that you are given needs to be wrapped with the <script> as shown in white above. The C1 signifies “Content Provider 1”,  C2 for the next, etc. The URL contains both the web host’s id as well as the individual content provider’s id specific to each of them.',
  theContentProvider: 'The content provider scripts with URLs need to be added to your site’s header <head> tag on your home page. ',
  onThePlaces: 'On the places that you want the ClickTip button to appear, put a HTML div tag with id as “ClickTip”.  When there are multiple content providers, web hosts have to set the id as ClickTipScriptC1, ClickTipScriptC2, ClickTipScriptC3, and so on for each of the individual content providers.',
  clickTipC1: '<div id = “ClickTipC1”> </div>',
  rememberToSave: 'Remember to save your changes…',
  next: "Next—",
  onThePlacesThat: 'On the places that you want the ClickTip button to appear, put a HTML div tag with id as “ClickTip”.',
  // TODO:Need this code
  // firstSection:'1) They have to copy the script given by admin and put it on the <head> tag on the web page. They have to add it as follow: ',
  // firstSectionBtnTag:'In the above <script> tag, “id” must be “dontateButtonScript” always and “src” should be the script URL given by admin.',
  // secondSection:`2) In the page where they want to put the <span class="font-weight-600">Donate</span> button, they have to put an empty div tag with id as “donateButton”. For e.g.,`,
  // idButton: `<div id = “donateButton”> </div>`,
  // urlAdd:'And put a script tag along with the URL (given by admin) on the head tag. For e.g.,',
  // donateButtonScript:'<script id="donateButtonScript" src="https://iresonate-script.s3.amazonaws.com/gifyScript.js?webHostId=ducJSDfpClePYHuzoibIKsobaowDVOtc">',
  // whenLogin:'3) When login for the first time, web hosts will have to create their profile and from there they have to add their bank account into Stripe; until they add their bank account details, they will not receive the payment.',
  // secondTitleB:'Web hosts have to follow the below steps when they want to receive the payment to themselves and content providers:',
  // firstSectionB:'1) In the content providers module, web hosts have to copy the script from the column called "Script CP". The script will look like as below:',
  // firstScriptTagB:'https://iresonate-script.s3.amazonaws.com/gifyScript.js?webHostId=BdsEAzrJYuXiWnVuVQUFlyRMHBgOLrfN&contentWriterId=611cbcc254600d7b2cd6e05c',
  // secondSectionB:'2) Web Hosts have to copy the script for individual content providers and put on the <head> tag of the web page. Web hosts can add N no. of scripts for content providers. They have to add it as follow:',
  // secondDonateButtonScriptC1:'<script id="donateButtonScriptC1" src="https://iresonate-script.s3.amazonaws.com/gifyScript.js?webHostId=BdsEAzrJYuXiWnVuVQUFlyRMHBgOLrfN&contentWriterId=611cbcc254600d7b2cd6e05c">',
  // inTheAbove :'In the above <script> tag, “id” must be “dontateButtonScriptC1” always and “src” should be the script URL given by admin. The URL will have web host’s id as well as content provider’s id.',
  // whenMultiple:'When there are multiple content providers, web hosts have to set the id as dontateButtonScriptC1, dontateButtonScriptC2, dontateButtonScriptC3, and so on.',
  // thirdSection:`3) In the page where web hosts want to put the <span class="font-weight-600">Donate</span> button, they have to put an empty div tag with id as “donateButtonC1”. For e.g.,`,
  // idButtonB: `<div id = “donateButtonC1”> </div>`,
  // whenThereAreMultiple:'When there are multiple content providers, web hosts have to set the div id as dontateButtonC1, dontateButtonC2, dontateButtonC3, and so on.',
  // andPutScriptTag:'And put a script tag along with the URL (copied from Content Provider module) on the head tag. For e.g.,',
  // thirdDonateButtonScriptC1:'<script id="donateButtonScriptC1" src=" https://iresonate-script.s3.amazonaws.com/gifyScript.js?webHostId=BdsEAzrJYuXiWnVuVQUFlyRMHBgOLrfN&contentWriterId=611cbcc254600d7b2cd6e05c">',
  // fourSection:'4) When content provider logs in for the first time, they will have to create their profile and from there they have to add their bank account into Stripe; until they add their bank account details, they will not receive the payment.',
  thankYouForRegistration: 'Thank you for registration.  These instructions will walk you through installing the ClickTip button on your website.',
}

export const privacyPolicy = {
  privacyPolicyTitle: "Privacy Policy",
  protecting: "Protecting your private information is our priority. This Statement of Privacy applies to www.iresonate.co, and iResonate Corp. and governs data collection and usage. For the purposes of this Privacy Policy, unless otherwise noted, all references to iResonate Corp. include www.iresonate.co and iResonate. The iResonate website is a Payment Facilitator site. By using the iResonate website, you consent to the data practices described in this statement.",
  collection: 'Collection of your Personal Information',
  inOrder: 'In order to better provide you with products and services offered, iResonate may collect personally identifiable information, such as your:',
  ifYouPurchase: 'If you purchase iResonates products and services, we collect billing and credit card information. This information is used to complete the purchase transaction.',
  weDoNot: 'We do not collect any personal information about you unless you voluntarily provide it to us. However, you may be required to provide certain personal information to us when you elect to use certain products or services. These may include: (a) registering for an account; (b) entering a sweepstakes or contest sponsored by us or one of our partners; (c) signing up for special offers from selected third parties; (d) sending us an email message; (e) submitting your credit card or other payment information when ordering and purchasing products and services. To wit, we will use your information for, but not limited to, communicating with you in relation to services and/or products you have requested from us. We also may gather additional personal or non-personal information in the future.',
  useOfYour: 'Use of your Personal Information',
  iResonateCollects: 'iResonate collects and uses your personal information to operate and deliver the services you have requested.',
  iResonateMayAlso: 'iResonate may also use your personally identifiable information to inform you of other products or services available from iResonate and its affiliates.',
  sharingInformation: "Sharing Information with Third Parties",
  iResonateDoesNot: "iResonate does not sell, rent or lease its customer lists to third parties.",
  iResonateMayShare: "iResonate may share data with trusted partners to help perform statistical analysis, send you email or postal mail, provide customer support, or arrange for deliveries. All such third parties are prohibited from using your personal information except to provide these services to iResonate, and they are required to maintain the confidentiality of your information.",
  iResonateMayDisclose: "iResonate may disclose your personal information, without notice, if required to do so by law or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with legal process served on iResonate or the site; (b) protect and defend the rights or property of iResonate; and/or (c) act under exigent circumstances to protect the personal safety of users of iResonate, or the public.",
  trackingUserBehavior: "Tracking User Behavior",
  iResonateMayKeep: 'iResonate may keep track of the websites and pages our users visit within iResonate, in order to determine what iResonate services are the most popular. This data is used to deliver customized content and advertising within iResonate to customers whose behavior indicates that they are interested in a particular subject area.',
  automaticallyCollectedInformation: 'Automatically Collected Information',
  informationAbout: "Information about your computer hardware and software may be automatically collected by iResonate. This information can include: your IP address, browser type, domain names, access times and referring website addresses. This information is used for the operation of the service, to maintain quality of the service, and to provide general statistics regarding use of the iResonate website.",
  useOfCookies: 'Use of Cookies',
  theIResonateWebsite: 'The iResonate website may use "cookies" to help you personalize your online experience. A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you.',
  OneOfThePrimary: 'One of the primary purposes of cookies is to provide a convenience feature to save you time. The purpose of a cookie is to tell the Web server that you have returned to a specific page. For example, if you personalize iResonate pages, or register with iResonate site or services, a cookie helps iResonate to recall your specific information on subsequent visits. This simplifies the process of recording your personal information, such as billing addresses, shipping addresses, and so on. When you return to the same iResonate website, the information you previously provided can be retrieved, so you can easily use the iResonate features that you customized.',
  youHaveTheAbility: 'You have the ability to accept or decline cookies. Most Web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the interactive features of the iResonate services or websites you visit.',
  securityOfYour: 'Security of your Personal Information',
  iResonateSecures: 'iResonate secures your personal information from unauthorized access, use, or disclosure.',
  iResonateUsesThe: 'iResonate uses the following methods for this purpose:',
  sslProtocol: 'SSL Protocol',
  whenPersonalInformation: 'When personal information (such as a credit card number) is transmitted to other websites, it is protected through the use of encryption, such as the Secure Sockets Layer (SSL) protocol.',
  weStriveToTake: 'We strive to take appropriate security measures to protect against unauthorized access to or alteration of your personal information. Unfortunately, no data transmission over the Internet or any wireless network can be guaranteed to be 100% secure. As a result, while we strive to protect your personal information, you acknowledge that: (a) there are security and privacy limitations inherent to the Internet which are beyond our control; and (b) security, integrity, and privacy of any and all information and data exchanged between you and us through this Site cannot be guaranteed.',
  rightToDeletion: 'Right to Deletion',
  subjectToCertain: 'Subject to certain exceptions set out below, on receipt of a verifiable request from you, we will:',
  deleteYourPersonal: 'Delete your personal information from our records; and',
  directAnyService: 'Direct any service providers to delete your personal information from their records.',
  pleaseNoteThat: 'Please note that we may not be able to comply with requests to delete your personal information if it is necessary to:',
  childrenUnderThirteen: 'Children Under Thirteen',
  iResonateDoesNotKnowingly: 'iResonate does not knowingly collect personally identifiable information from children under the age of thirteen. If you are under the age of thirteen, you must ask your parent or guardian for permission to use this website.',
  eMailCommunications: 'E-mail Communications',
  fromTimeToTime: 'From time to time, iResonate may contact you via email for the purpose of providing announcements, promotional offers, alerts, confirmations, surveys, and/or other general communication. In order to improve our Services, we may receive a notification when you open an email from iResonate or click on a link therein.',
  ifYouWouldLike: 'If you would like to stop receiving marketing or promotional communications via email from iResonate, you may opt out of such communications by Clicking on the Unsubscribe Button..',
  externalDataStorageSites: 'External Data Storage Sites',
  weMayStore: 'We may store your data on servers provided by third party hosting vendors with whom we have contracted.',
  changesToThisStatement: 'Changes to this Statement',
  iResonateReserves: 'iResonate reserves the right to change this Privacy Policy from time to time. We will notify you about significant changes in the way we treat personal information by sending a notice to the primary email address specified in your account, by placing a prominent notice on our website, and/or by updating any privacy information. Your continued use of the website and/or Services available after such modifications will constitute your: (a) acknowledgment of the modified Privacy Policy; and (b) agreement to abide and be bound by that Policy.',
  contactInformation: 'Contact Information',
  iResonateWelcomes: 'iResonate welcomes your questions or comments regarding this Statement of Privacy. If you believe that iResonate has not adhered to this Statement, please contact iResonate at:',
  iResonateCorp: 'iResonate Corp.',
  pattonRd: '20014 Patton Rd',
  longBeach: 'Long Beach, Mississippi 39560',
  emailAddress: "Email Address:",
  support: 'support@iresonate.co',
  telephoneNumber: 'Telephone number:',
  number: '6502068180',
  effective: 'Effective as of July 12, 2022',
}

export const AboutUs = {
  AboutUsTitle: 'About Us',
  description: 'A little over three years ago, Zeke Fairbank, CEO was reading an awesome post on Facebook, and he thought to himself, “Gee, I’d pay money for this information.” It was about that time that his dryer stopped working. When he called a local repair appliance repair shop, he was told that there was a two week wait for service, and that the call minimum would be $125 plus cost of parts and labor. So, he looked for troubleshooting videos, watched a couple, and after ordering an $89 part, easily fixed the machine within 5 days. Again, he wished that he could donate something back to the folks as a thank you for the time and effort it took from them to produce and post content that saved him both time and money. From this hatched the idea of a donation mechanism for resonating content.',
  Clicktip: 'Working with Elizabeth Abrams on a marketing and design concepts, they came up with the idea of the ClickTip™ button and the name iResonate. Zeke also hired Shashank Pandya, a full stack developer, to develop both the website and a mechanism to link the ClickTip™ to both websites and content providers.',
  Concept: 'Since our original concept, we have seen Twitter, Tumblr, Facebook, YouTube and others enact a tipping or donation scheme for their websites— thus proving our concept.'
}
export const personalInformation = [
  {
    key: "1",
    name: 'First and Last Name',
  },
  {
    key: "2",
    name: 'Mailing Address',
  },
  {
    key: "3",
    name: 'E-mail Address',
  },
  {
    key: "4",
    name: 'Phone Number',
  },
  {
    key: "5",
    name: 'Employer',
  },
  {
    key: "6",
    name: 'Job Title',
  },
  {
    key: "7",
    name: 'Websites, Content Providers',
  },
]

export const deletePersonalInformation = [
  {
    key: "1",
    name: 'Complete the transaction for which the personal information was collected, fulfill the terms of a written warranty or product recall conducted in accordance with federal law, provide a good or service requested by you, or reasonably anticipated within the context of our ongoing business relationship with you, or otherwise perform a contract between you and us;',
  },
  {
    key: "2",
    name: 'Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity; or prosecute those responsible for that activity;',
  },
  {
    key: "3",
    name: 'Debug to identify and repair errors that impair existing intended functionality;',
  },
  {
    key: "4",
    name: 'Exercise free speech, ensure the right of another consumer to exercise his or her right of free speech, or exercise another right provided for by law;',
  },
  {
    key: "5",
    name: 'Comply with the California Electronic Communications Privacy Act;',
  },
  {
    key: "6",
    name: 'Engage in public or peer-reviewed scientific, historical, or statistical research in the public interest that adheres to all other applicable ethics and privacy laws, when our deletion of the information is likely to render impossible or seriously impair the achievement of such research, provided we have obtained your informed consent;',
  },
  {
    key: "7",
    name: 'Enable solely internal uses that are reasonably aligned with your expectations based on your relationship with us;',
  },
  {
    key: "8",
    name: 'Comply with an existing legal obligation; or',
  },
  {
    key: "9",
    name: 'Otherwise use your personal information, internally, in a lawful manner that is compatible with the context in which you provided the information.',
  },
]

export const donationAmount = [
  {
    id: "2",
    title: "$2.00"
  },
  {
    id: "5",
    title: "$5.00"
  },
  {
    id: "10",
    title: "$10.00"
  },
  {
    id: "20",
    title: "$20.00"
  },
  {
    id: "other",
    title: "Other"
  },
]

export const donationAmountData = {
  donationAmount: "Donation Amount",
  makePayment: 'MAKE PAYMENT',
  registerDonor: "Register as a donor with iResonate",
  theAppEntrepreneur: "The App Entrepreneur",
  close: "Close",
  donateSuccessfully: "Donate Successfully !!",
  dear: 'Dear',
  thankYou: "Thank you for your donation of $",
  itWillHelp: "It will help us to continue to provide awesome content for your viewing pleasure!",
}

export const entrepreneur: TabArrayProps[] = [
  { name: 'Continue as a Guest', component: <Payment /> },
  { name: 'Login as a Donor', component: <DonorLogin loginAsDonor /> },
];
