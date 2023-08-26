import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { WSCard } from 'src/component/common/card/WSCard';
import { WSButton, WSImage } from 'src/component/common';

import { donationAmountData } from 'src/utils/staticData';
import { images } from 'src/utils/image';
import { getSessionStorageItem } from 'src/utils/helper';

import './success.less';

const Success: React.FC<{}> = () => {
  const router = useRouter();
  const [contentWriterId, setContentWriterId] = useState('');
  const { price, domainUrlName, whFirstName, whLastName, donorName, cpFirstName, cpLastName } =
    router.query;
  const closeOnClick = () => window.close();
  useEffect(() => {
    setContentWriterId(getSessionStorageItem('contentWriterId'));
  }, []);
  
  return (
    <div className='success-container'>
      <WSCard className='success-main-div' title={domainUrlName}>
        <WSImage src={images.success} className='img-fluid iresonate-logo' />
        <div className='donate-success'>
          {donationAmountData.donateSuccessfully}
        </div>
        <div className='success-message-title'>
          <span className='message-title'>
            {donationAmountData.dear} {donorName},
          </span>
          <span className='message-text'>
            {donationAmountData.thankYou}
            {price}. {donationAmountData.itWillHelp}
          </span>
          <span className='regards-name'>
            {contentWriterId ? `${cpFirstName} ${cpLastName}` : `${whFirstName} ${whLastName}`}
          </span>
          <span>{domainUrlName}</span>
        </div>
        <div className='close-button'>
          <WSButton
            type='primary'
            className='btn'
            onClick={closeOnClick}
          >
            {donationAmountData.close}
          </WSButton>
        </div>
        <div className='iresonate-logo-section'>
          <WSImage
            src={images.iResonate}
            className='img-fluid iresonate-logo'
          />
          <WSImage src={images.stripeIcon} className='img-fluid strip-logo' />
        </div>
      </WSCard>
    </div>
  );
};
export default Success;
