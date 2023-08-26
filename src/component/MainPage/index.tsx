import React from 'react'
import { useRouter } from 'next/router'
//Component
import { WSImage,MenuTitle, WSTitle, WSButton, WSRow, WSCol } from 'src/component/common';
import routPath from 'src/routes/routes';
import { Navigation } from 'src/component/core/navigation';
import Footer from 'src/component/core/footer';
import ContactUsForm from 'src/form/contactUS';
//constant
import { images } from 'src/utils/image';
import { homePageField, webHostContentDetails } from 'src/utils/enums';
//Style
import "./style.less";

const MainPage = () => {
  const router = useRouter()

  return (
    <div className="main-container">
      <Navigation  />
      <section className="banner">
        <div className="banner-content">
          <WSImage src= {images.Welcome} className="welcome-img img-fluid"/>
          <MenuTitle name={`"We make it easy for viewers to reward great content."`} inlineClassName="banner-content-text" />
          <div className="img-btn-section">
            <div className="image-with-button">
            <WSImage src= {images.dollarIcon} className="dol-img img-fluid" />
            <WSButton type="text" className="click-it-btn">{homePageField.clickItTipIt}</WSButton>
            </div>
            
          </div>
        </div>
        <div className="banner-images">
        <WSImage src= {images.Banner} className="img-fluid"/>
        </div>
      </section>
      <section className="what-section mt-5">    
        <div className="container">
            <WSTitle level={4} className="text-center What-title">{homePageField.whatIsIResonate}</WSTitle>
            <div className="resonate-card">
              <WSRow>
                <WSCol xs={24} sm={10} md={10} lg={10} xl={8} xxl={8} >
                <WSImage src= {images.Vector1} className="vector-img img-fluid" />
                </WSCol >
                <WSCol xs={24} sm={14} md={14} lg={14} xl={16} xxl={16}>
                <p className="resonate-card-content">iResonate, in partnership with websites, allows content viewers to reward content that resonates with them by clicking on the <b>“ClickTip™”</b> button.  Find a DIY blog helpful?  <b>ClickTip™! </b>  Like that article that you just read? <b>ClickTip™! </b> Watch an interesting or entertaining video? <b>ClickTip™! </b></p>
                </WSCol>
              </WSRow>
            </div>
        </div>
      </section>
      {/* DONOR */}
      <section className="who-section mt-5">
        <div className="container text-center mt-3">
          <WSTitle level={3} className="who-can-title">{homePageField.whoCanIresonate}</WSTitle>
          <p className="who-can-content">{homePageField.whoCanIresonateFirstContent}<div> {homePageField.whoCanIresonateSecondContent}</div></p>
        </div>
        <div className="who-section-vector">
        <div className="container">
          <WSRow>
            <WSCol xs={24} sm={10} md={4}>
              <WSImage src= {images.Vector3} className="vector-img img-fluid"  />
          </WSCol>
          <WSCol md={20}>
            <div className="main-vector-content">
              <WSTitle level={5} className="title">{homePageField.donor}</WSTitle>
              <p className="content">{homePageField.donorContent}</p>
              <WSButton onClick={() => router.push(routPath.donorRegistration)} className="sign-up-btn">{homePageField.signUp}</WSButton>
            </div>
          </WSCol>
          </WSRow>
            <WSImage src= {images.Dashboard} className="vector-dashboard-img img-fluid"   />
        </div>
      </div>
      </section>
      {/* DONOR */}
      {/* CONTENT PROVIDER */}
      <section className="who-section ">
        <div className="who-section-vector">
          <div className="container">
            <WSRow>
              <WSCol xs={24} sm={10} md={4}>
                  <WSImage src= {images.vector2} className="vector-img img-fluid"  />
              </WSCol>
              <WSCol md={20}>
                <div className="main-vector-content mb-3">
                  <WSTitle level={5} className="title">{homePageField.contentProvider}</WSTitle>
                  <p className="content">{homePageField.contentProviderContent}</p>
                </div>
              </WSCol>
            </WSRow>
              <WSImage src= {images.Dashboard} className="vector-dashboard-img img-fluid"   />
          </div>
        </div>
      </section>
      {/* CONTENT PROVIDER */}
      {/* WEBHOST */}
      <section className="who-section">
        <div className="who-section-vector">
          <div className="container">
            <WSRow>
              <WSCol xs={24} sm={10} md={4}>
                  <WSImage src= {images.Vector4} className="vector-img img-fluid"  />
              </WSCol>
              <WSCol md={20}>
                <div className="main-vector-content">
                  <WSTitle level={5} className="title">{homePageField.webHost}</WSTitle>
                  <p className="content">{homePageField.webHostContent}</p>
                    <ul className="content">
                      {webHostContentDetails.map((value,key) => {
                        return (
                          <li key={key}>{value}</li>
                        )
                      })}
                    </ul>
                    <p className="content">{homePageField.webHostLastContent}</p>
                  <WSButton onClick={() => router.push(routPath.webHostRegistrations)} className="sign-up-btn">{homePageField.signUp}</WSButton>
                </div>
              </WSCol>
            </WSRow>
              <WSImage src= {images.Dashboard} className="vector-dashboard-img img-fluid"   />
          </div>
        </div>
      </section>
      {/* WEBHOST */}
      {/* how-does-section */}
      <section className="mt-5 how-does-section">
        <div className="container">
            <WSImage src= {images.ClickTip} className="mx-auto click-tip-img img-fluid"/>
            <WSTitle level={3} className="text-center title">{homePageField.howDoesClickTipWork}</WSTitle>
            <div className="mt-3 step-main">
              <WSRow>
                <WSCol sm={24} md={9} lg={9} xl={10} xxl={10}>
                  <div className="step-2">
                      <WSImage src= {images.Step2} className="img-fluid step-2-img   d-none" />
                      <WSTitle level={5} className="step-title">{homePageField.step2}</WSTitle>
                      <p className="step-content">{homePageField.step2Content}</p>
                  </div>
                  <div className="step-4">
                      <WSImage src= {images.Step2} className="img-fluid step-4-img d-none" />
                      <WSTitle level={5} className="step-title">{homePageField.step4}</WSTitle>
                      <p className="step-content">{homePageField.step4Content}</p>
                  </div>
                </WSCol>
                <WSCol md={5} lg={5} xl={4} xxl={4} className="process-vector-main-img"> 
                      <WSImage src= {images.ProcessVector} />
                </WSCol>
                <WSCol sm={24} md={9} lg={9} xl={10} xxl={10}> 
                  <div className="step-1">
                      <WSImage src= {images.Step2} className="img-fluid step-1-img  d-none" />
                      <WSTitle level={5} className="step-title">{homePageField.step1}</WSTitle>
                      <p className="step-content">{homePageField.step1Content}</p>
                  </div>
                  <div className="step-3">
                      <WSImage src= {images.Step2} className="img-fluid step-3-img  d-none" />
                      <WSTitle level={5} className="step-title">{homePageField.step3}</WSTitle>
                      <p className="step-content">{homePageField.step3Content}</p>
                  </div>
                </WSCol>
              </WSRow>
              </div>    
              <div className="mobile-view-step">
              <WSRow>
                <WSCol sm={24} md={9}>
                <div className="step-1">
                      <WSImage src= {images.Step2} className="img-fluid step-1-img " />
                      <WSTitle level={5} className="step-title">{homePageField.step1}</WSTitle>
                      <p className="step-content">{homePageField.step1Content}</p>
                  </div>
                  <div className="step-2">
                      <WSImage src= {images.Step2} className="img-fluid step-2-img" />
                      <WSTitle level={5} className="step-title">{homePageField.step2}</WSTitle>
                      <p className="step-content">{homePageField.step2Content}</p>
                  </div>
                </WSCol>
                <WSCol sm={24} md={9}>
                  <div className="step-3">
                      <WSImage src= {images.Step2} className="img-fluid step-3-img" />
                      <WSTitle level={5} className="step-title">{homePageField.step3}</WSTitle>
                      <p className="step-content">{homePageField.step3Content}</p>
                  </div>
                  <div className="step-4">
                      <WSImage src= {images.Step2} className="img-fluid step-4-img" />
                      <WSTitle level={5} className="step-title">{homePageField.step4}</WSTitle>
                      <p className="step-content">{homePageField.step4Content}</p>
                  </div>
                </WSCol>
              </WSRow>
              </div>
        </div>
      </section>
      {/* how-does-section */}
      {/* our-team */}
      <section className="our-team mt-5" id="bio_section">
            <WSTitle level={3} className="text-center title">{homePageField.meetOurTeam}</WSTitle>
            <div className="mt-3 first-team-main-title">
              <WSRow>
                <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <div className="img-bg">
                        <WSImage src={images.ZF} className="img-fluid our-team-img"/> 
                    </div>
                </WSCol>
                <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <div className="team-content">
                    <WSTitle level={5} className="title">{homePageField.zekeFairbank}</WSTitle>
                    <p>{homePageField.ceoFounder}</p>
                    <p>{homePageField.zekeFairbankFirstContent} </p>
                    <p className="mt-1">{homePageField.zekeFairbankSecondContent}</p>
                </div> 
                </WSCol>
              </WSRow>
            </div>
            <div className="mt-3 second-team-main-title">
              <WSRow>
              <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <div className="team-content">
                    <WSTitle level={5} className="title">{homePageField.shashankPandya}</WSTitle>
                    <p>{homePageField.ctoCoFounder}</p>
                    <p>{homePageField.shashankPandyaFirstContent} </p>
                    <p className="mt-1">{homePageField.shashankPandyaSecondContent}</p>
                  </div> 
                </WSCol>
                <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <div className="img-bg">
                        <WSImage src={images.SP} className="img-fluid our-team-img"/>
                    </div>
                </WSCol>
              </WSRow>
            </div>
            <div className="mt-3 third-team-main-title">
              <WSRow>
                <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <div className="img-bg">
                        <WSImage src={images.EA} className="img-fluid our-team-img"/> 
                    </div>
                </WSCol>
                <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <div className="team-content">
                    <WSTitle level={5} className="title">{homePageField.elizabethAbrams}</WSTitle>
                    <p>{homePageField.advisorMarketing}</p>
                    <p>{homePageField.elizabethAbramFirstContent}</p> 
                    <p className="mt-1">{homePageField.elizabethAbramSecondContent}</p>
                </div> 
                </WSCol>
              </WSRow>
            </div>
            <div className="mt-3 five-team-main-title">
              <WSRow>
                <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <div className="team-content">
                    <WSTitle level={5} className="title">{homePageField.viharRana}</WSTitle>
                    <p>{homePageField.projectManager}</p>
                    <p>{homePageField.viharRanaFirstContent}</p>
                    <p className="mt-1">{homePageField.viharRanaSecondContent}</p>
                </div> 
                </WSCol>
                <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <div className="img-bg">
                        <WSImage src={images.ViharRana} className="img-fluid our-team-img"/> 
                    </div>
                </WSCol>
              </WSRow>
            </div>
      </section>
      {/* our-team */}
        <ContactUsForm />
        <Footer />
    </div>
  )
}
export default MainPage;
