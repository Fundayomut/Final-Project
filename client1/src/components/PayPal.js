import React from "react";
import { useLocation } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import NavNach from "./NavNach";
import NavVor from "./NavVor";
import { AuthKontext } from "./LoginSystem";

function PayPal() {
  // Verwendung von useLocation, um auf die aktuellen URL-Parameter zuzugreifen
  const location = useLocation();
  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const totalAmount = queryParams.get("amount") || "0"; // Abrufen des Betrags aus den URL-Parametern

  const { erlaubnis } = React.useContext(AuthKontext); // Zugriff auf den Authentifizierungsstatus

  return (
    <>
      {/* Anzeige des Navigationsmenüs basierend auf dem Authentifizierungsstatus */}
      {erlaubnis === true ? <NavNach /> : <NavVor />}
      <div className="paypal-main-div">
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
                alert("Payment successful! " + details.payer.name.given_name);
              });
            }}
            onError={(err) => {
              console.error("PayPal payment error:", err);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default PayPal;
