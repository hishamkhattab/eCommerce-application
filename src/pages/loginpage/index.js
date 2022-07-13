import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// component
import { Signin } from "../../components";

// layout
import { FormLayout, Button } from "../../layout";

// reducer
import { signinWithGoogle, signinUser } from "../../store/userSlice";

// styles
import "./style.scss";

function Loginpage() {
  const { currentUser, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // route
  const navigate = useNavigate();

  const handleGoogleSignin = () => {
    dispatch(signinWithGoogle());
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSignin = () => {
    console.log(email, password);
    if (email.length > 0 && password.length > 0) {
      dispatch(signinUser({ email, password }));
      clearForm();
    }
  };

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      navigate("/", { replace: true });
    }
  }, [navigate, currentUser]);

  return (
    <div>
      <FormLayout title="Login">
        <Signin error={error} email={email} password={password} setEmail={setEmail} setPassword={setPassword} />
        <div className="links-container">
          <Link to="/reset">Forget Password ?</Link>
          <Link to="/register">Don't have account</Link>
        </div>
        <div className="btn-container">
          <Button handleClick={handleSignin}>sign in</Button>
        </div>
        <div className="btn-container">
          <Button handleClick={handleGoogleSignin}>sign in with google</Button>
        </div>
      </FormLayout>
    </div>
  );
}

export default Loginpage;
