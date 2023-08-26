import React from 'react'
import { HeadElement, SubHeader } from 'src/component/core';
import SliderComponent from 'src/layouts/MainLayout';
import { cardTitle } from 'src/utils/enums';
import metaTitle from 'src/utils/metaTitle';
import { adminInstructionsData } from 'src/utils/staticData';

export const Instructions = () => {
  return (
    <SliderComponent>
      <HeadElement title={metaTitle.Instructions} />
      <SubHeader level={4} title={cardTitle.instructions} />
      <div className="instructions-container">
        <div className="title">{adminInstructionsData.title}</div>
        <ul className="instructions-ul">
          <li>{adminInstructionsData.firstSection}
            <div className="title-bg-color">
              {adminInstructionsData.firstSectionUrl}
            </div>
          </li>
          <li>{adminInstructionsData.secondSection}</li>
        </ul>
      </div>
      <div>
      </div>
    </SliderComponent>
  )
}
export default Instructions;