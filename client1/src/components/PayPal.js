import React from 'react';
import { useLocation } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import NavNach from './NavNach';
import NavVor from './NavVor';
import { AuthKontext } from './LoginSystem';

function PayPal() {
  const location = useLocation();
  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const totalAmount = queryParams.get('amount') || '0';

  const { erlaubnis } = React.useContext(AuthKontext);

  return (
    <>
      {erlaubnis === true ? <NavNach /> : <NavVor />}
      <div className="zahlen-container">
      <h3>Total Amount</h3>
      <p className="amount-display">{totalAmount} €</p>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalAmount,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              alert('Payment successful! ' + details.payer.name.given_name);
            });
          }}
          onError={(err) => {
            console.error('PayPal payment error:', err);
          }}
        />
      </div>
    </>
  );
}

export default PayPal;
