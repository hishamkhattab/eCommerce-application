import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// component
import { ResetPassword } from "../../components";

// layout
import { FormLayout, Button } from "../../layout";

// reducer
import { resetPassword } from "../../store/userSlice";

// styles
import "./style.scss";

function ForgotPassword() {
  const { error, isReset } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (email) {
      dispatch(resetPassword(email));
    }
  };

  useEffect(() => {
    if (isReset) {
      navigate("/login");
    }
  }, [dispatch, isReset, navigate]);

  return (
    <div>
      <FormLayout title="Reset Password">
        <ResetPassword email={email} setEmail={setEmail} error={error} />
        <div className="btn-container">
          <Button handleClick={handleReset}>Reset Password</Button>
        </div>
      </FormLayout>
    </div>
  );
}

export default ForgotPassword;
