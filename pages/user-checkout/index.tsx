import React, { useEffect, useState } from 'react';
// component
import { WSCard, WSTabs } from 'src/component/common';
// constants
import { getSessionStorageItem } from 'src/utils/helper';
import { entrepreneur } from 'src/utils/staticData';
import { domainRegex } from 'src/utils/enums';
// style
import './userCheckout.less';

const UserCheckout = () => {
  const [vendorUrl, setVendorUrl] = useState('');
  useEffect(() => {
    setVendorUrl(getSessionStorageItem('webHostUrl'));
  }, []);

  let domainName: string;
  if(vendorUrl) {
    let domainUrl : URL | string = new URL(vendorUrl);
    domainName = domainUrl.hostname.match(domainRegex)[1];
  }

  return (
    <>
      <div className='payment-conformation-form'>
        <WSCard className='conformation-button' title={domainName}>
          <WSTabs
            tabArray={entrepreneur}
            className='entrepreneur-tab-container'
          />
          {/* TODO:need this code*/}
          {/* <div className='button-div'>
          <WSButton
            type='primary'
            onClick={() => Router.push(routPath.Payment)}
            className="btn"
          >
            CONTINUE AS A GUEST
          </WSButton>
          <WSButton
            type='primary'
            onClick={() => Router.push(routPath.donorLogin)}
            className="btn"
          >
            CONTINUE WITH LOGIN
          </WSButton>
        </div>
      <WSImage src= {images.iResonate} className="img-fluid iresonate-logo"/> */}
        </WSCard>
      </div>
    </>
  );
};
export default UserCheckout;
