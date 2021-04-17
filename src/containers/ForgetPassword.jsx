import React from 'react';
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import axiosService from "../utils/axiosService";

const ForgetPassword = () => {

    const {register, errors, handleSubmit} = useForm();

    const onSubmit = async data => {
        const message = document.getElementById("message");
        try {
            const response = await axiosService("auth/forget-password", "POST", data);
            message.innerText = response.data;
            message.classList.remove();
            message.classList.add("text-success");
        } catch (e) {
            console.log(e);
            message.classList.add("text-danger");
            message.innerText = e.response.data;
        }
    }

    return (
        <div className="container d-flex flex-column">
            <div className="row no-gutters text-center align-items-center justify-content-center min-vh-100">
                <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                    <h1 className="font-weight-bold">Password Reset</h1>
                    <p className="text-dark mb-3">Enter your email address to reset password.</p>
                    <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="email" className="sr-only">Email Address</label>
                            <input className="form-control form-control-md"
                                type="email" name="email" ref={register({required: true})} placeholder="Enter your email"/>
                            {errors.email && <span className="text-danger">Email không được rỗng</span>}
                        </div>
                        <button className="btn btn-lg btn-block btn-primary  text-uppercase font-weight-semibold"
                                type="submit">Send Reset Link
                        </button>
                        <div id="message"></div>
                    </form>
                    <p>Already have an account? <Link className="font-weight-semibold" to={'/login'}>Sign in</Link>.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;