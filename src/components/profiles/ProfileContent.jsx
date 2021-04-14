import React, {useState, useEffect} from 'react';
import {actionLogout, actionUpdateUser} from "../../actions/user.action";
import {connect} from "react-redux";
import moment from 'moment';
import {useForm} from "react-hook-form";
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import ErrorMessage from "../ErrorMessage";
import ChangePasswordForm from "./ChangePasswordForm";


const ProfileContent = ({user, update, t}) => {
    const init = {
        id: user?.id,
        name: user.name,
        birthday: user?.birthday && moment(user?.birthday).format('YYYY-MM-DD') || '2021-03-03',
        phone: user?.phone || '',
        email: user.email,
    };

    const {register, errors, handleSubmit, setValue, formState} = useForm({defaultValues: init});


    useEffect(() => {
        const body = document.querySelector("body");
        body.classList.remove(`${body.classList[0]}`);
        body.classList.add("profile-tab-open");
    }, []);

    const reset = e => {
        e.preventDefault();
        Object.keys(init).forEach(async (i) => {
            setValue(i, init[i]);
        })
    }

    const onSubmit = (data) => {
        update({id: user.id, ...data});
    }

    return (
        <div className="profile px-0 py-2 p-xl-3">
            <div className="page-main-heading sticky-top py-2 px-3 mb-3">

                <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted d-xl-none" type="button"
                        data-close="">
                    <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                    </svg>
                </button>
                <div className="pl-2 pl-xl-0">
                    <h5 className="font-weight-semibold">Settings</h5>
                    <p className="text-muted mb-0">Update Personal Information &amp; Settings</p>
                </div>
            </div>
            <div className="container-xl px-2 px-sm-3">
                <div className="row">
                    <div className="col">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="mb-1">Account</h6>
                                    <p className="mb-0 text-muted small">Update personal &amp; contact information</p>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="name">Profile Name</label>
                                                <input name="name"
                                                       ref={register({required: true, minLength: 6, maxLength: 30})}
                                                       type="text" className="form-control form-control-md" id="name"
                                                       placeholder="Type your first name"/>
                                                {errors.name && <ErrorMessage name="name" value={errors.name.type}/>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="phone">Mobile number</label>
                                                <input name="phone"
                                                       ref={register({
                                                           minLength: 10,
                                                           maxLength: 11,
                                                           pattern: /(09|01[2|6|8|9])+([0-9]{8})\b/
                                                       })}
                                                       type="tel" className="form-control form-control-md" id="phone"
                                                       placeholder="Type your mobile number"/>
                                                {errors.phone && <ErrorMessage name="phone" value={errors.phone.type}/>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="birthday">Birth date</label>
                                                <input name="birthday"
                                                       ref={register({required: true})}
                                                       type="date" className="form-control form-control-md"
                                                       id="birthday"
                                                       placeholder="dd/mm/yyyy"/>
                                                {errors.birthday &&
                                                <ErrorMessage name="birthday" value={errors.birthday.type}/>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="email">Email address</label>
                                                <input name="email"
                                                       ref={register({
                                                           required: true,
                                                           pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                                       })}
                                                       type="email" className="form-control form-control-md" id="email"
                                                       placeholder="Type your email address"/>
                                                {errors.email && <ErrorMessage name="email" value={errors.email.type}/>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer d-flex justify-content-end">
                                    <button onClick={reset} type="button"
                                            className="btn btn-link text-muted mx-1">Reset
                                    </button>
                                    <button type="submit" disabled={!formState.isDirty} className="btn btn-primary">Save
                                        Changes
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="card mb-3">
                            <div className="card-header">
                                <h6 className="mb-1">Social network profiles</h6>
                                <p className="mb-0 text-muted small">Update personal &amp; contact information</p>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="facebookId">Facebook</label>
                                            <input type="text" className="form-control form-control-md" id="facebookId"
                                                   placeholder="Username"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="twitterId">Twitter</label>
                                            <input type="text" className="form-control form-control-md" id="twitterId"
                                                   placeholder="Username"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="instagramId">Instagram</label>
                                            <input type="text" className="form-control form-control-md" id="instagramId"
                                                   placeholder="Username"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="linkedinId">Linkedin</label>
                                            <input type="text" className="form-control form-control-md" id="linkedinId"
                                                   placeholder="Username"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer d-flex justify-content-end">
                                <button type="button" className="btn btn-link text-muted mx-1">Reset</button>
                                <button type="button" className="btn btn-primary">Save Changes</button>
                            </div>
                        </div>

                        <ChangePasswordForm/>

                        <div className="card mb-3">
                            <div className="card-header">
                                <h6 className="mb-1">Privacy</h6>
                                <p className="mb-0 text-muted small">Update personal &amp; contact information</p>
                            </div>

                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush list-group-sm-column">

                                    <li className="list-group-item py-2">
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <p className="mb-0">Profile Picture</p>
                                                <p className="small text-muted mb-0">Select who can see my profile
                                                    picture</p>
                                            </div>
                                            <div className="dropdown mr-2">
                                                <button className="btn btn-outline-default dropdown-toggle"
                                                        type="button"
                                                        data-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                                    Public
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="# ">Public</a>
                                                    <a className="dropdown-item" href="# ">Friends</a>
                                                    <a className="dropdown-item" href="# ">Selected Friends</a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="list-group-item py-2">
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <p className="mb-0">Last Seen</p>
                                                <p className="small text-muted mb-0">Select who can see my last seen</p>
                                            </div>
                                            <div className="dropdown mr-2">
                                                <button className="btn btn-outline-default dropdown-toggle"
                                                        type="button"
                                                        data-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                                    Public
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="# ">Public</a>
                                                    <a className="dropdown-item" href="# ">Friends</a>
                                                    <a className="dropdown-item" href="# ">Selected Friends</a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="list-group-item py-2">
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <p className="mb-0">Groups</p>
                                                <p className="small text-muted mb-0">Select who can add you in
                                                    groups</p>
                                            </div>
                                            <div className="dropdown mr-2">
                                                <button className="btn btn-outline-default dropdown-toggle"
                                                        type="button"
                                                        data-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                                    Public
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="# ">Public</a>
                                                    <a className="dropdown-item" href="# ">Friends</a>
                                                    <a className="dropdown-item" href="# ">Selected Friends</a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="list-group-item py-2">
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <p className="mb-0">Status</p>
                                                <p className="small text-muted mb-0">Select who can see my status
                                                    updates</p>
                                            </div>
                                            <div className="dropdown mr-2">
                                                <button className="btn btn-outline-default dropdown-toggle"
                                                        type="button"
                                                        data-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                                    Public
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="# ">Public</a>
                                                    <a className="dropdown-item" href="# ">Friends</a>
                                                    <a className="dropdown-item" href="# ">Selected Friends</a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="list-group-item py-2">
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <p className="mb-0">Read receipts</p>
                                                <p className="small text-muted mb-0">If turn off this option you won't
                                                    be able to see read
                                                    recipts</p>
                                            </div>
                                            <div className="custom-control custom-switch mr-2">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="readReceiptsSwitch"
                                                       checked=""/>
                                                <label className="custom-control-label"
                                                       htmlFor="readReceiptsSwitch">&nbsp;</label>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>

                            <div className="card-footer d-flex justify-content-end">
                                <button type="button" className="btn btn-link text-muted mx-1">Reset</button>
                                <button type="button" className="btn btn-primary">Save Changes</button>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="card-header">
                                <h6 className="mb-1">Security</h6>
                                <p className="mb-0 text-muted small">Update personal &amp; contact information</p>
                            </div>

                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush list-group-sm-column">
                                    <li className="list-group-item py-2">
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <p className="mb-0">Use two-factor authentication</p>
                                                <p className="small text-muted mb-0">Ask for a code if attempted login
                                                    from an
                                                    unrecognised device or browser.</p>
                                            </div>
                                            <div className="custom-control custom-switch mr-2">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="twoFactorSwitch" checked=""/>
                                                <label className="custom-control-label"
                                                       htmlFor="twoFactorSwitch">&nbsp;</label>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item py-2">
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <p className="mb-0">Get alerts about unrecognised logins</p>
                                                <p className="small text-muted mb-0">You will be notified if anyone logs
                                                    in from a device
                                                    or browser you don't usually use</p>
                                            </div>
                                            <div className="custom-control custom-switch mr-2">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="unrecognisedSwitch"
                                                       checked=""/>
                                                <label className="custom-control-label"
                                                       htmlFor="unrecognisedSwitch">&nbsp;</label>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>

                            <div className="card-footer d-flex justify-content-end">
                                <button className="btn btn-link text-muted mx-1">Reset</button>
                                <button className="btn btn-primary" type="button">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actionLogout()),
        update: (user) => dispatch(actionUpdateUser(user))
    }
}


export default compose(connect(mapStateToProps, mapDispatchToProps), withTranslation("common"))(ProfileContent);