import Head from 'next/head';
import React from 'react';

const Test = () => {
  return (
    <>
      {/* TODO:this code is testing purposes only */}
      <Head>
        <script id='ClickTipScript' src='https://iresonate-script.s3.amazonaws.com/gifyScript.js?webHostId=QCjnpMLcROlyEpqgeVCqIVaJOAUAWCsG'></script>
        <script
          id='ClickTipScriptC1'
          src='https://iresonate-script.s3.amazonaws.com/gifyScript.js?webHostId=UTnqQlNJbJTNnuzXNFTNqpntKmNEAofx&contentWriterId=620519fabd6397f7711da180'
        ></script>
      </Head>
      <div className='web-host-with-cp'>
        <div>WH-Name:- Francesca Hyde</div>
        <div>Email:- tibazy@mailinator.com</div>
        <div id='ClickTip'></div>
      </div>

      <div className='web-host-with-cp'>
        <span>CP-Name:- vih arr</span>
        <div>WH-Name:- Vihar inc</div>
        
        <div id='ClickTipC1'></div>
      </div>
      {/* TODO:this code is testing purposes only */}
    </>
  );
};

export default Test;
