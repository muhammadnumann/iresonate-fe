import React from 'react'
import { useRouter } from 'next/router'
import { CheckCircleOutlined } from '@ant-design/icons'
import { WSButton, WSCard, WSImage } from 'src/component/common'
import Footer from 'src/component/core/footer'
import { NewNavigation} from 'src/component/core'
import routPath from 'src/routes/routes'
import { images } from 'src/utils/image'
import './thankYou.less'
import Router  from 'next/router';

const ThankYou: React.FC = ({}) => {
  const router = useRouter()
  const { path, title } = router?.query
  return (
    <>
      <NewNavigation />
      <div className='thank-you-container'>
          <WSCard className='thank-you-card'>
            <div className='logo'>
            <WSImage src= {images.iResonate} className="img-fluid iresonate-logo"/>
            </div>
            {title ? <div className='thank-you-title'>Thank You !!</div>  :
            <div className='thank-you-title'>Thank You for Registering!</div>}
            <div className='success-message-title'>
              <CheckCircleOutlined className='checkOutlined-icon' />
              {title ?  <span>Your registration has been done successfully. You can click on the below button to login to your account.</span> :
              <span>
                {`We have emailed you a verification email. ${
                !path
                    ? `Please check your emails and click on
                    the button to activate your account.`
                    : '.'
                }`}
              </span>}
            </div>
            <div className='web-host-login'>
            <WSButton type='primary' onClick={()=> Router.push(routPath.contentProviderLogin)}>Content Provider Login</WSButton>
            </div>
          </WSCard>
      </div>
      <Footer />
    </>
  )
}
export default ThankYou
