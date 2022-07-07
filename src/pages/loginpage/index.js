import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//component
import { Signin } from '../../components';

//layout
import { FormLayout, Button} from "./../../layout";

//reducer
import { signinWithGoogle} from "./../../store/userSlice";

//styles
import "./style.scss";

const Loginpage = () => {
    const { currentUser, error } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(signinWithGoogle());
    };

    console.log("CurrentUser: ",currentUser);
    console.log("Error: ",error);
    return (
        <div>
            <FormLayout title="Login">
                <Signin />
                <div className="links-container">
                    <Link to="/reset">Forget Password ?</Link>
                    <Link to="/register">Don't have account</Link>
                </div>
                <div className="btn-container">
                    <Button>sign in</Button>
                </div>
                <div className="btn-container">
                    <Button handleClick={handleClick}>sign in with google</Button>
                </div>
            </FormLayout>
        </div>
    )
};

export default Loginpage;
