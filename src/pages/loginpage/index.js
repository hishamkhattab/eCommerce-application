import React from 'react'

//layout
import { FormLayout, Button} from "./../../layout";

import "./style.scss";

const Loginpage = () => {
    return (
        <div>
            <h1>Login-page</h1>
            <FormLayout title="sign-in">
                <div className="btn-container">
                <Button>sign in with google</Button>
                </div>
            </FormLayout>
        </div>
    )
};

export default Loginpage;
