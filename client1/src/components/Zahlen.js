import React, { useEffect, useState } from "react";

const Zahlen = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const amount = localStorage.getItem("totalAmount");
    if (amount) {
      setTotalAmount(Number(amount));
    }
  }, []);

  return (
    <div className="zahlen-container">
      <h1 className="main-heading">Complete Registration Payment</h1>
      <p className="sub-heading">Personal details</p>

      <div className="input-row">
        <div className="input-group">
          <label>Address line</label>
          <input
            type="text"
            placeholder="P.o.Box 1223"
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>City</label>
          <input type="text" placeholder="Arusha" className="input-field" />
        </div>
      </div>

      <div className="input-row">
        <div className="input-group">
          <label>State</label>
          <input
            type="text"
            placeholder="Arusha ,Tanania"
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Postal Code</label>
          <input type="text" placeholder="9090" className="input-field" />
        </div>
      </div>

      <div className="total-container">
        <label htmlFor="gesamtzahlen">Gesamtzahlen</label>
        <input
          type="text"
          id="gesamtzahlen"
          className="total-input"
          value={`${totalAmount} €`}
          readOnly
        />
        <div className="purchase-value"></div>
      </div>

      <div className="paypal-logo">
        <img
          src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/250_Paypal_logo-512.png"
          alt="PayPal Logo"
        />
      </div>

      <button className="zahlen-button">Zahlen</button>
    </div>
  );
};

export default Zahlen;
