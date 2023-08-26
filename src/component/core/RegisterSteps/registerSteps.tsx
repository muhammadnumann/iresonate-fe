import React from 'react'
// Component
import { WSSteps, WSStep, WSButton, WSRow, WSCol, WSImage } from 'src/component/common'
import { formLabelName } from 'src/utils/enums';
// constant
import { images } from 'src/utils/image';
//Style 
import "./registerSteps.less"

interface RegistrationStepsProps {
  commonStepsArray: { title?: string, description?: string, content?: React.ReactNode }[];
  account?: string
  login?: string
  nextBtnText?: string
  agreeBtnText?: string
  agreeBtnOnClick?: () => void
  currentTab?: number
  loginUrl:string
  onTabChange?: (index: number) => void
  loading?: boolean
}

export const RegisterStepsCommon: React.FC<RegistrationStepsProps> = ({
  commonStepsArray,
  account, login,
  nextBtnText, agreeBtnText,
  agreeBtnOnClick,
  currentTab,
  loginUrl,
  onTabChange,
  loading
}) => {

  const next = () => {
    onTabChange(currentTab + 1);
  };

  const prev = () => {
    onTabChange(currentTab - 1);
  };
  return (
    <div className="registration-steps">
      <section >
        <div className="container">
          <div className="main-registration-section mb-5">
            <WSRow>
              <WSCol xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
                <div className="main-steps">
                  <WSSteps current={currentTab} direction="vertical" >
                    {commonStepsArray.map((item, index: number) =>
                      <WSStep key={item.title} title={item.title} description={item.description} />
                    )}
                  </WSSteps>
                  <div className="login-main">
                    <p className="login-content ">{account} <span className="login-title" onClick={() => window.open(loginUrl)}>{login}</span></p>
                    <WSImage src={images.ClickTip} className="dol-img img-fluid" />
                  </div>
                </div>
              </WSCol>
              <WSCol xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
                <div className="steps-content">
                  {commonStepsArray[currentTab]?.content}
                </div>
                <div className="steps-action">
                      <WSRow gutter={[16, 16]}>
                        <WSCol xs={24} sm={12} md={14} lg={14} xl={14} xxl={14}>
                          {currentTab > 0 && (
                            <div className="previous-step-div">
                            <WSButton className="previous-btn" onClick={() => prev()} disabled={loading}>
                              {formLabelName.previousBtn}
                            </WSButton>
                            </div>
                          )}
                        </WSCol>
                        <WSCol xs={24} sm={12} md={10} lg={10} xl={10} xxl={10}>
                            {nextBtnText && currentTab < commonStepsArray.length - 1 && (
                              <div className="next-step-div">
                                <WSButton type="primary" className="next-btn" onClick={() => next()}>
                                  {nextBtnText}
                                </WSButton>
                                </div>
                            )}
                            {agreeBtnText && currentTab === commonStepsArray.length - 1 && (
                              <div className="agree-step-div">
                              <WSButton className="agree-btn" type="primary" onClick={agreeBtnOnClick} loading={loading}>
                                {agreeBtnText}
                              </WSButton>
                              </div>
                            )}
                        </WSCol>
                      </WSRow>
                </div>
              </WSCol>
            </WSRow>
          </div>
        </div>
      </section>
    </div>
  )
}

