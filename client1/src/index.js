import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// PayPalScriptProvider'ı bir 'client-id' ile yapılandırın
const initialOptions = {
  "client-id":
    "AZidtdRVc_MTVoX43KL4ZwfMkGJlCC9j-EBjHSRaxVXv9HIXJk9Kn6aVmvlLxEY0FBZSGav8H6rq0loY", // Buraya PayPal'dan aldığınız client ID'yi yerleştirin
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PayPalScriptProvider options={initialOptions}>
        <App />
      </PayPalScriptProvider>
    </BrowserRouter>
  </React.StrictMode>
);
