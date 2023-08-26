import React from 'react'
//Component
import { WSButton, WSCheckbox, WSCol, WSRow, WSTitle } from 'src/component/common'
// Style
import './termsConditions.less'
interface IProps {
  value: string[]
  acceptTerms?: boolean
  stepName?: string
  stepDescription?: string
  title?: string
  firstParagraph?: string
  secondParagraph?: string
  thirdParagraph?: string
  fourParagraph?: string
  fiveParagraph?: string
}

export const TermsConditionsCommon: React.FC<IProps> = ({ value,
  stepName,
  stepDescription,
  title,
  firstParagraph,
  secondParagraph,
  thirdParagraph,
  fourParagraph,
  fiveParagraph
}) => {
  return (
    <div className='terms-conditions-main-details'>
      <div className='terms-conditions-main-details-form'>
        <div>
          {/* Button trigger modal */}
          <WSTitle level={2} className='details-title'>
            {stepName}
          </WSTitle>
          <WSRow>
            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className="px-3 mb-5">
              <WSButton
                type='primary'
                className='ant-btn see-terms-btn rounded-3'
                data-bs-toggle="modal" data-bs-target="#exampleModal"
              >
                See Terms & Conditions
              </WSButton>
            </WSCol>
          </WSRow>
         
          {/* Modal */}
          <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="modal-title fs-5" id="exampleModalLabel">
                    <WSTitle level={2} className='details-title'>
                      {stepName}
                    </WSTitle>
                  </div>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <p className='content'>
                    {stepDescription}
                  </p>
                  <div className='terms-conditions-form'>
                    <WSTitle level={5} className='donor-title'>
                      {title}
                    </WSTitle>
                    <p className='terms-conditions-content'>
                      {firstParagraph}
                    </p>
                    <p className='terms-conditions-content'>
                      {secondParagraph}
                    </p>
                    <p className='terms-conditions-content'>
                      {thirdParagraph}
                    </p>
                    <p className='terms-conditions-content'>
                      {fourParagraph}
                    </p>
                    <p className='terms-conditions-content'>
                      {fiveParagraph}
                    </p>
                    <WSCheckbox
                      name='acceptTc'
                      className='terms-conditions-checkbox'
                      value={value}
                      labelArr={[
                        {
                          value: 'yes',
                          label: 'I agree to "Terms & Conditions"',
                        },
                      ]}
                    />{' '}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
  )
}

export default TermsConditionsCommon
