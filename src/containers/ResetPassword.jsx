import React from 'react';
import {useForm} from "react-hook-form";
import axiosService from "../utils/axiosService";

const ResetPassword = (props) => {

    const {register, errors, handleSubmit} = useForm();

    const onSubmit = async ({password, re_password}) => {
        if(password !== re_password) {
            document.getElementById("message").innerText = "Password phải trùng nhau";
            return;
        }
        try {
            const data = {email: props.match.params.email, password}
            await axiosService("auth/reset-password", "PATCH", data);
            props.history.push('/login');
        } catch (e) {
            console.log(e);
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
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input className="form-control form-control-md" id="password"
                                   type="password" name="password" ref={register({required: true})} placeholder="Enter your password"/>
                            {errors.password && <span className="text-danger">Mật khẩu mới không được rỗng</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="re_password" className="sr-only">Re password</label>
                            <input className="form-control form-control-md"
                                   type="password" id="re_password" name="re_password" ref={register({required: true})} placeholder="Re password"/>
                            {errors.re_password && <span className="text-danger">Xác nhận mật khẩu không được rỗng</span>}
                        </div>
                        <button className="btn btn-lg btn-block btn-primary  text-uppercase font-weight-semibold"
                                type="submit">Send Reset Link
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;