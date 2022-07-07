import React from 'react'
import { Link } from 'react-router-dom';
//component
import { ResetPassword } from '../../components';

//layout
import { FormLayout, Button} from "./../../layout";

//reducer
import { signinWithGoogle} from "./../../store/userSlice";

//styles
import "./style.scss";
const ForgotPassword = () => {
  return (
    <div>
      <FormLayout title="Reset Password">
        <ResetPassword />
        <div className="btn-container">
          <Button>Reset Password</Button>
        </div>
      </FormLayout>
    </div>
  );
}

export default ForgotPassword
