import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// components
import { Signup } from "../../components";

// layout
import { FormLayout } from "../../layout";

// reducer
import { signupUser } from "../../store/userSlice";

// style
import "./style.scss";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Registerpage() {
  // redux state
  const { currentUser, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // navigation
  const navigate = useNavigate();

  // state
  const [signupData, setSignupData] = useState(initialState);
  const [isPassowrdMatch, setIsPassowrdMatch] = useState(true);

  // distructure state
  const { displayName, email, password, confirmPassword } = signupData;

  const handleForm = ({ name, value }) => {
    setSignupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) setIsPassowrdMatch(false);

    if (
      displayName.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    ) {
      setIsPassowrdMatch(true);
      dispatch(signupUser({ email, password, displayName }));
    }
  };

  const clearForm = () => {
    setSignupData(initialState);
  };

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      clearForm();
      navigate("/", { replace: true });
    }
  }, [currentUser, dispatch, navigate]);

  return (
    <div className="registerpage">
      <FormLayout title="register">
        <Signup handleForm={handleForm} signupData={signupData} isPassowrdMatch={isPassowrdMatch} error={error} />
        <div className="links-container">
          <Link to="/login">Already a user?</Link>
        </div>
        <div className="btn-container">
          <button className="global-btn" onClick={handleSubmit}>
            <span>sign-up</span>
          </button>
        </div>
      </FormLayout>
    </div>
  );
}

export default Registerpage;
