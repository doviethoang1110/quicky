import React, {useState} from "react";
import {Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import {connect} from "react-redux";
import {actionFacebookLogin, actionLogin} from "../actions/user.action";
import FacebookLogin from 'react-facebook-login';

const Login = (props) => {

    const { register, errors, handleSubmit } = useForm();
    const [rememberMe, setRememberMe] = useState(true);

    const handleCheckbox = () => setRememberMe(!rememberMe);

    const onSubmit = data => props.login(data);

    const responseFacebook = ({id, name, email, accessToken, picture}) => props.facebookLogin({id, name, email, accessToken, picture})

    return (
        <React.Fragment>
            <div className="container d-flex flex-column">
                <div className="row no-gutters text-center align-items-center justify-content-center min-vh-100">
                    <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                        <h1 className="font-weight-bold">Sign in</h1>
                        <p className="text-dark mb-3">We are Different, We Make You Different.</p>
                        <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="email" className="sr-only">Email Address</label>
                                <input ref={register({required: true})} name="email"
                                    type="email" className="form-control form-control-md" id="email"
                                       placeholder="Enter your email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input ref={register({required: true})} name="password"
                                       type="password" className="form-control form-control-md" id="password"
                                       placeholder="Enter your password"/>
                            </div>
                            <div className="form-group d-flex justify-content-between">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" defaultChecked={rememberMe}
                                           id="checkbox-remember" onChange={handleCheckbox}/>
                                    <label className="custom-control-label text-muted font-size-sm"
                                           htmlFor="checkbox-remember">Remember me</label>
                                </div>
                                <Link className="font-size-sm" to={'/forget-password'}>Forget password</Link>
                            </div>
                            <FacebookLogin
                                icon="fa fa-facebook"
                                buttonStyle={{float: 'left'}}
                                cssClass="btn btn-primary"
                                appId="278749067198862"
                                autoLoad={false}
                                fields="name,email,picture"
                                scope="email"
                                callback={responseFacebook} />
                            <br/>
                            <button style={{marginTop: '30px'}} className="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold"
                                    type="submit">Sign in
                            </button>
                        </form>

                        <p>Don't have an account? <Link className="font-weight-semibold" to={'/register'}>Sign
                            up</Link>.</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.loadingReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => {
            dispatch(actionLogin(data));
        },
        facebookLogin: (data) => {
            dispatch(actionFacebookLogin(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);