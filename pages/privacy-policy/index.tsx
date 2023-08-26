import React from 'react';
// component
import { WSTitle } from 'src/component/common';
import { Footer, HeadElement, NewNavigation } from 'src/component/core';
// constant
import metaTitle from 'src/utils/metaTitle';
import { personalInformation, privacyPolicy, deletePersonalInformation } from 'src/utils/staticData';
// Style
import './privacyPolicy.less';

const PrivacyPolicy = () => (
    <>
      <HeadElement title={metaTitle.privacyPolicy} />
      <NewNavigation />
      <div className='privacy-policy-container'>
        <WSTitle level={2} className='privacy-policy-title'>
          {privacyPolicy.privacyPolicyTitle}
        </WSTitle>
        <div className='description'>{privacyPolicy.protecting}</div>
        <WSTitle level={5} className='main-title'>
          {privacyPolicy.collection}
        </WSTitle>
        <div className='description'>{privacyPolicy.inOrder}</div>
        <ul className='personal-information-list'>
          {personalInformation.map(({name, key}) => (
              <li key={key}>
                <div className='list-item'>{name}</div>
              </li>
          ))}
        </ul>
        <div className='description'>{privacyPolicy.ifYouPurchase}</div>
        <div className='description'>{privacyPolicy.weDoNot}</div>
        <WSTitle level={5} className='main-title'>
          {privacyPolicy.useOfYour}
        </WSTitle>
        <div className='description'>{privacyPolicy.iResonateCollects}</div>
        <div className='description'>{privacyPolicy.iResonateMayAlso}</div>
        <WSTitle level={5} className='main-title'>
          {privacyPolicy.sharingInformation}
        </WSTitle>
        <div className='description'>{privacyPolicy.iResonateDoesNot}</div>
        <div className='description'>{privacyPolicy.iResonateMayShare}</div>
        <div className='description'>{privacyPolicy.iResonateMayDisclose}</div>
        <WSTitle level={5} className='main-title'>
          {privacyPolicy.trackingUserBehavior}
        </WSTitle>
        <div className='description'>{privacyPolicy.iResonateMayKeep}</div>
        <WSTitle level={5} className='main-title'>
          {privacyPolicy.automaticallyCollectedInformation}
        </WSTitle>
        <div className='description'>{privacyPolicy.informationAbout}</div>
        <WSTitle level={5} className='main-title'>
          {privacyPolicy.useOfCookies}
        </WSTitle>
        <div className='description'>{privacyPolicy.theIResonateWebsite}</div>
        <div className='description'>{privacyPolicy.OneOfThePrimary}</div>
        <div className='description'>
          {privacyPolicy.youHaveTheAbility}
        </div>
        <WSTitle level={5} className='main-title'>
          {privacyPolicy.securityOfYour}
        </WSTitle>
        <div className='description'>{privacyPolicy.iResonateSecures}</div>
        <div className='description'>{privacyPolicy.iResonateUsesThe}</div>
          <ul className='personal-information-list'>
              <li>
                <div className='list-item'>{privacyPolicy.sslProtocol}</div>
              </li>
        </ul>
        <div className='description'>{privacyPolicy.whenPersonalInformation}</div>
        <div className='description'>{privacyPolicy.weStriveToTake}</div>
        <WSTitle level={5} className='main-title'>
          {privacyPolicy.rightToDeletion}
        </WSTitle>
        <div className='description'>{privacyPolicy.subjectToCertain}</div>
        <ul className='right-to-deletion-list'>
              <li>
                <div className='list-item'>{privacyPolicy.deleteYourPersonal}</div>
              </li>
              <li>
                <div className='list-item'>{privacyPolicy.directAnyService}</div>
              </li>
        </ul>
        <div className='description'>{privacyPolicy.pleaseNoteThat}</div>
        <ul className='right-to-deletion-list'>
          {deletePersonalInformation.map(({name, key}) => (
              <li key={key}>
                <div className='list-item'>{name}</div>
              </li>
            ))}
        </ul>
        <WSTitle level={5} className='main-title'>
          {privacyPolicy.childrenUnderThirteen}
        </WSTitle>
        <div className='description'>{privacyPolicy.iResonateDoesNotKnowingly}</div>
        <WSTitle level={5} className='main-title'>
          {privacyPolicy.eMailCommunications}
        </WSTitle>
        <div className='description'>{privacyPolicy.fromTimeToTime}</div>
        <div className='description'>{privacyPolicy.ifYouWouldLike}</div>
        <WSTitle level={5} className='main-title'>
          {privacyPolicy.externalDataStorageSites}
        </WSTitle>
        <div className='description'>{privacyPolicy.weMayStore}</div>
        <WSTitle level={5} className='main-title'>
          {privacyPolicy.changesToThisStatement}
        </WSTitle>
        <div className='description'>{privacyPolicy.iResonateReserves}</div>
        <WSTitle level={5} className='main-title'>
          {privacyPolicy.contactInformation}
        </WSTitle>
        <div className='description'>{privacyPolicy.iResonateWelcomes}</div>
        <div className='address-description'>{privacyPolicy.iResonateCorp}</div>
        <div className='address-description'>{privacyPolicy.pattonRd}</div>
        <div className='description'>{privacyPolicy.longBeach}</div>
        <div className='address-description'>{privacyPolicy.emailAddress}</div>
        <div className='description'>{privacyPolicy.support}</div>
        <div className='address-description'>{privacyPolicy.telephoneNumber}</div>
        <div className='description'>{privacyPolicy.number}</div>
        <div className='description'>{privacyPolicy.effective}</div>
      </div>
      <Footer />
    </>
);
export default PrivacyPolicy;
