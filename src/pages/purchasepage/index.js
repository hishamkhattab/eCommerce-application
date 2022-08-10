import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SuccessPayment } from "../../components";

import "./style.scss";

function Purchasepage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <div className="main-page-container center">
      <SuccessPayment />
    </div>
  );
}

export default Purchasepage;
