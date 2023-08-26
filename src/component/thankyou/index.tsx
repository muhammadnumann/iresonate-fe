import React from 'react'
import { CheckCircleOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
// Component
import { WSCard, WSLoader } from 'src/component/common'
import Footer from 'src/component/core/footer'
import { Navigation } from 'src/component/core'
//constant
import routPath from 'src/routes/routes'
import { cardTitle, formLabelName } from 'src/utils/enums'
// Style
import './thankYou.less'

interface IProps {
  loading: boolean
}

const ThankYou: React.FC<IProps> = ({ loading }) => {
  const router = useRouter();
  return (
    <>
      <Navigation />
      <div className='thank-you-container'>
        <WSCard className='thank-you-card'>
          <div className='logo-title'>
            <span>{cardTitle.iResonate}</span>
          </div>
          <div className='thank-you-title'>{formLabelName.thankYouForYourVerification}</div>
          <div className='success-message-title'>
            {loading ? (
              <WSLoader />
            ) : (
              <CheckCircleOutlined className='checkOutlined-icon' />
            )}
            <span>{'Your account is now active.'}</span>
            <span className="sign-in-span" onClick={()=> router.push(routPath.donorLogin) }>{formLabelName.signIn}</span>
          </div>
        </WSCard>
      </div>
      <Footer />
    </>
  )
}
export default ThankYou
