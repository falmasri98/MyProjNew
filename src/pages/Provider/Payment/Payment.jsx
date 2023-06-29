import React, { useEffect } from "react";
import "./Payment.css";

import { validateCreditCard } from "../../../shared/util/validators";

export default function Payment({ handleSubscribtionPlan }) {
  useEffect(() => {
    validateCreditCard();
  }, []);

  return (
    <div className="provider-payment__container">
      <h2>Please enter your information to complete your subscription:</h2>
      {/* <div className="visa-payment w-100 mt-5">
        <div className="w-100">
          <label htmlFor="visaCardNumber" className="form-label fw-bold">
            Credit card number
          </label>
          <input
            type="text"
            className="form-control"
            id="visaCardNumber"
            placeholder="1111-2222-3333-4444"
          />
        </div>
        <div className="w-100">
          <label htmlFor="expMonth" className="form-label fw-bold">
            Exp Month
          </label>
          <input
            type="text"
            className="form-control"
            id="expMonth"
            placeholder="Septemper"
          />
        </div>
      </div> */}
      <div className="wrapper">
        <div className="cc-types">
          <img className="cc-types__img cc-types__img--amex" />
          <img className="cc-types__img cc-types__img--visa" />
          <img className="cc-types__img cc-types__img--mastercard" />
          <img className="cc-types__img cc-types__img--disc" />
          <img className="cc-types__img cc-types__img--genric" />
        </div>
        <input type="text" maxLength="19" className="cc-number-input" />

        <input type="text" maxLength="5" className="cc-expiry-input" />
        <input type="text" maxLength="3" className="cc-cvc-input" />
      </div>
      <button className="btn mt-4" onClick={handleSubscribtionPlan}>
        Confirm Payment
      </button>
    </div>
  );
}
