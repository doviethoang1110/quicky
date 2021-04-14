import React from 'react';
import {Link} from "react-router-dom";

const ThankYou = () => {
    return (
        <React.Fragment>
            <div className="container d-flex flex-column">
                <div className="row no-gutters text-center align-items-center justify-content-center min-vh-100">
                    <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                        <div className="thanks-purchase">
                            <h1>Thank You</h1>
                            <span>Please check your email to verify account</span>
                            <p>Sign in now <Link className="button dark circle" to={"/login"} title="">here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ThankYou;