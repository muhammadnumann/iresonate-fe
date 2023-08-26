import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// component
import { HeadElement } from 'src/component/core/headElement';
import CheckoutForm from 'src/form/checkoutForm';
// constant
import metaTitle from 'src/utils/metaTitle';

const stripePromise = loadStripe(process.env.stripe);

const Payment: React.FC<{}> = () => {
  // useEffect(() => { TODO:need this code
  //   if (!venderId && !contentWriterId) {
  //     Router.push(routPath.DashboardScreen);
  //     WSMessage({
  //       type: "warning",
  //       messageValue: "NO VENDOR ID FOUND",
  //     });
  //   }
  // }, []);

  return (
    <>
      <HeadElement title={metaTitle.Payment} />
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  );
};

// Payment.getInitialProps = async () => {TODO:need this code
//   const venderId = getSessionStorageItem("venderId");
//   const contentWriterId = getSessionStorageItem("contentWriterId");

//   return { contentWriterId, venderId };
// };

export default Payment;
