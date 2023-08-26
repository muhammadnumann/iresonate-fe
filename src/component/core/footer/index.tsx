import React from 'react'
import { useRouter } from 'next/router';
// component
// constant
import { images } from 'src/utils/image';
import routPath from 'src/routes/routes';
// styles
import "./footer.less";
import Link from 'next/link'

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const router = useRouter();
  return (
    <div className="footer-main">
      <footer className="footer  position-relative">
        <div className='position-absolute start-0 bottom-0 h-100 z-index-1 footer-ellipse-left-img'>
          <img src={images.footerleft} className='h-100' alt="" />
        </div>
        <div className='position-absolute end-0 bottom-0 h-100  z-index-1 footer-ellipse-right-img'>
          <img src={images.footerRight} alt="" className='h-100' />
        </div>
        <div className="container zindex-dropdown z-index-99 ">
          <div className='row justify-content-between'>
            <div className='col-md-4' >
              <div className="main-social-icons  p-sm-0 p-3">
                <img src={images.iResonatefooter} className="img-fluid" />
                <p className='reward mt-3'>iResonate’s ClickTip™ button allows viewers to reward great content!</p>
                <ul className="contact-links">
                  <li><img src={images.mobile} width="15px" className='me-3' />+1 (650) 206-8180</li>
                  <li><img src={images.email} width="15px" className='me-3' /><a className="mail" target="_top" href="mailto:support@iresonate.co">support@iresonate.co</a></li>
                </ul>
              </div>
            </div>
            <div className='col-md-8'>
              <div className='h-100 d-flex align-items-end justify-content-end' style={{ flexWrap: 'wrap' }}>
                <div className='d-flex flex-sm-row flex-column align-items-center justify-content-between useful-links-main mt-5'>
                  <h3 className="useful-links mb-1 me-lg-5 me-sm-3">Links:</h3>
                  <ul className="links flex-sm-row flex-column   text-center">
                    <li className='active'><Link href="./">Home</Link></li>
                    <li><a href="https://clicktip.co/2022/07/24/we-are-live/" target={'_blank'} rel="noreferrer">Blog</a></li>
                    <li><Link href="./#contact_section">Contact Us</Link></li>
                    <li><Link href={'./about'}>About Us</Link></li>
                    <li onClick={() => router.push(routPath.privacyPolicy)}>Privacy Policy</li>
                  </ul>
                </div>
                <div className='w-100'></div>
                <div className="main-social-icons d-flex flex-sm-row flex-column mt-sm-0 mt-4 justify-content-sm-end justify-content-center align-items-center gap-3 w-100">

                  <h3 className="font-weight-bold text-white mb-0">Follow Us:</h3>

                  <ul className="mt-3 social-links-icon">
                    <li><a target={'_blank'} href='https://twitter.com/iResonateCo' rel="noreferrer"><img src={images.dtwitter} width="21px" height="21px" /></a></li>
                    <li><a target={'_blank'} href='https://www.instagram.com/iresonate/' rel="noreferrer"><img src={images.dinstagram} width="21px" height="21px" /></a></li>
                    <li><a target={'_blank'} href='https://www.facebook.com/Click.It.Tip.It' rel="noreferrer"><img src={images.dfacebook} width="21px" height="21px" /></a></li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </footer >
      {/* copyright */}
      < section className="copyright" >
        <p className="text-center m-0">{`© ${year} iResonate. All rights reserved`}</p>

        {/* copyright */}
      </section >
    </div>
  )
}
export default Footer;
