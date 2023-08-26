import React from 'react';
// component
import { WSImage, WSTitle } from 'src/component/common';
import { HeadElement } from 'src/component/core';
import SliderComponent from 'src/layouts/MainLayout';
// constant
import { cardTitle } from 'src/utils/enums';
import { images } from 'src/utils/image';
import metaTitle from 'src/utils/metaTitle';
import { webHostInstructionsData } from 'src/utils/staticData';

export const Instructions = () => (
    <SliderComponent>
      <HeadElement title={metaTitle.Instructions} />
      <section className='instructions-section'>
        <div className='click-tip-logo'>
          <WSImage src={images.ClickTip} className='logo' />
        </div>
          <WSTitle level={4} className="instructions-title"> {cardTitle.instructions}</WSTitle>
          <WSTitle level={4} className="thankyou-title">{webHostInstructionsData.thankYouForRegistration}</WSTitle>
      </section>
      <div className="instructions-container">
        <div className="title font-weight-600">{webHostInstructionsData.titleA}</div>
        <WSTitle level={4} className="second-title">{webHostInstructionsData.forExample}</WSTitle>
        <div className="title-bg-color-new ">{webHostInstructionsData.firstScriptTag}</div>
        <div className="second-title">{webHostInstructionsData.noteTheSpaces}</div>
        <div className="second-title">{webHostInstructionsData.next}</div>
        <div className="second-title">{webHostInstructionsData.onThePlacesThat}</div>
        <WSTitle level={4} className="second-title">{webHostInstructionsData.forExample}</WSTitle>
        <div className="title-bg-color-new ">{webHostInstructionsData.clickTip}</div>
        <WSTitle className="do-not-forget">{webHostInstructionsData.doNotForget}</WSTitle>
        {/* Title B */}
        <div className="title font-weight-600 mt-3">{webHostInstructionsData.titleB}</div>
        <WSTitle level={4} className="second-title">{webHostInstructionsData.forExample}</WSTitle>
        <div className="title-bg-color-new ">{webHostInstructionsData.secondDonateButtonScriptC1}</div>
        <div className="second-title">{webHostInstructionsData.noteTheSpecific}</div>
        <div className="second-title">{webHostInstructionsData.theContentProvider}</div>
        <div className="second-title">{webHostInstructionsData.next}</div>
        <div className="second-title">{webHostInstructionsData.onThePlaces}</div>  
        <WSTitle level={4} className="second-title">{webHostInstructionsData.forExample}</WSTitle>
        <div className="title-bg-color-new ">{webHostInstructionsData.clickTipC1}</div>
        <WSTitle className="do-not-forget">{webHostInstructionsData.rememberToSave}</WSTitle>
        {/* TODO:need this code */}
        {/* <ul className="instructions-ul">
          <li>{webHostInstructionsData.firstSection}
            <div>{webHostInstructionsData.firstSectionBtnTag}</div>
          </li>
          <li>
            <div dangerouslySetInnerHTML={{
              __html: webHostInstructionsData.secondSection
            }}>
            </div>
            <div className="title-bg-color">
              {webHostInstructionsData.idButton}
            </div>
            <div>{webHostInstructionsData.urlAdd}</div>
            <div className="title-bg-color">{webHostInstructionsData.donateButtonScript}</div>
          </li>
          <li>{webHostInstructionsData.whenLogin}</li>
        </ul>
          <div className="title font-weight-600">{webHostInstructionsData.titleB}</div>
          <div className="second-title">{webHostInstructionsData.secondTitleB}</div>
          <ul className="instructions-ul">
          <li>{webHostInstructionsData.firstSectionB}
            <div className="title-bg-color">{webHostInstructionsData.firstScriptTagB}</div>
          </li>
          <li>{webHostInstructionsData.secondSectionB}
            <div className="title-bg-color">
              {webHostInstructionsData.secondDonateButtonScriptC1}
            </div>
            <div>{webHostInstructionsData.inTheAbove}</div>
            <div>{webHostInstructionsData.whenMultiple}</div>
          </li>
          <li>
            <div dangerouslySetInnerHTML={{
              __html:webHostInstructionsData.thirdSection
            }} />
            <div className="title-bg-color">
              {webHostInstructionsData.idButtonB}
            </div>
            <div>{webHostInstructionsData.whenThereAreMultiple}</div>
            <div>{webHostInstructionsData.andPutScriptTag}</div>
            <div className="title-bg-color">
              {webHostInstructionsData.thirdDonateButtonScriptC1}
            </div>
          </li>
          <li>{webHostInstructionsData.fourSection}</li>
        </ul> */}
      </div>
    </SliderComponent>
  );
export default Instructions;