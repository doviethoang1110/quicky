import React from "react";
import {Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosService from "../utils/axiosService";

const Register = (props) => {

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async data => {
        try {
            await axiosService("auth/sign-up", "POST", data);
            props.history.push('/thank-you');
        } catch (e) {
            console.log(e);
            const res = e.response;
            const ele = document.getElementById("error");
            if(res?.status && (res?.status === 429 || res?.status === 400)) ele.innerText = res.data;
            else ele.innerText = e.message;
        }
    }

    return (
        <React.Fragment>
            <div className="container d-flex flex-column">
                <div className="row no-gutters text-center align-items-center justify-content-center min-vh-100">
                    <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                        <h1 className="font-weight-bold">Sign up</h1>
                        <p className="text-dark mb-3">We are Different, We Make You Different.</p>
                        <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input type="text" name="name" ref={register({required: true, minLength: 6, maxLength: 30})}
                                       className="form-control form-control-md" id="name"
                                       placeholder="Enter your name"/>
                                {errors.name && errors.name.type === "required" &&
                                <span className="text-danger">Tên không được rỗng</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="sr-only">Email Address</label>
                                <input type="email" name="email" ref={register({required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/})}
                                       className="form-control form-control-md" id="email"
                                       placeholder="Enter your email"/>
                                {errors.email && errors.email.type === "required" &&
                                <span className="text-danger">Email không được rỗng</span>}
                                {errors.email && errors.email.type === "pattern" &&
                                <span className="text-danger">Email không đúng định dạng</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone" className="sr-only">Phone Number</label>
                                <input type="tel" id="phone" className="form-control form-control-md"
                                    ref={register({required: true, minLength: 10, maxLength: 11, pattern: /(09|01[2|6|8|9])+([0-9]{8})\b/})}
                                       type="text" name="phone" placeholder="Phone number"/>
                                {errors.phone && errors.phone.type === "required" &&
                                <span className="text-danger">Số đt không được rỗng</span>}
                                {errors.phone && errors.phone.type === "minLength" &&
                                <span className="text-danger">Số đt gồm 10 ký tự</span>}
                                {errors.phone && errors.phone.type === "maxLength" &&
                                <span className="text-danger">Số đt gồm 11 ký tự</span>}
                                {errors.phone && errors.phone.type === "pattern" &&
                                <span className="text-danger">Số đt không hợp lệ</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="sr-only">Birthday</label>
                                <input type="date" name="birthday" ref={register({required: true})}
                                       className="form-control form-control-md" id="email"
                                       placeholder="Enter your birthday"/>
                                {errors.birthday && errors.birthday.type === "required" &&
                                <span className="text-danger">Ngày sinh không được rỗng</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input type="password" ref={register({required: true, minLength: 6, maxLength: 30})}
                                       name="password" className="form-control form-control-md" id="password"
                                       placeholder="Enter your password"/>
                                {errors.password && errors.password.type === "required" &&
                                <span className="text-danger">Mật khẩu không được rỗng</span>}
                            </div>
                            <div id="error"></div>
                            <button className="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold"
                                    type="submit">Sign up
                            </button>
                        </form>

                        <p>Already have an account? <Link className="font-weight-semibold" to={'/login'}>Sign
                            in</Link>.</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Register;