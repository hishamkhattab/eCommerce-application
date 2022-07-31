import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { publishableKey } from "../../strip/config";

import "./style.scss";
import { PurchaseForm } from "../../components";

const stripPromise = loadStripe(publishableKey);

function Purchasepage() {
  return (
    <Elements stripe={stripPromise}>
      <div className="purchase-container">
        <PurchaseForm />
      </div>
    </Elements>
  );
}

export default Purchasepage;
