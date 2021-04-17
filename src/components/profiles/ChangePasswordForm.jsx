import React, {useState} from 'react';
import {withTranslation} from "react-i18next";
import axiosService from "../../utils/axiosService";
import {compose} from "redux";
import {connect} from "react-redux";
import {showToast} from "../../plugins/sweetAlert";

const ChangePasswordForm = ({user}) => {

    const initial = {
        password: "",
        newPassword: "",
        confirmPassword: ""
    };

    const [pass, setPass] = useState(initial);

    const reset = e => {
        e.preventDefault();
        setPass(initial);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosService(`users/change-password/${user.id}`, "PATCH", pass);
            if (!response.data.success) {
                const message = Object.values(response.data.errors)[0];
                showToast('error', message);
            } else {
                showToast('success', response.data.message);
                document.getElementById("password").value = "";
                document.getElementById("new-password").value = "";
                document.getElementById("repeat-password").value = "";
            }
        } catch (e) {
            console.log('error change password', e)
            showToast('error', e.message);
        }
    }

    const handleInput = (e) => setPass({...pass, [e.target.name]: e.target.value});

    return (
        <div className="card mb-3">
            <div className="card-header">
                <h6 className="mb-1">Password</h6>
                <p className="mb-0 text-muted small">Update personal &amp; contact information</p>
            </div>

            <div className="card-body">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label htmlFor="password">Current Password</label>
                                <input type="password" className="form-control form-control-md"
                                       id="password" name="password"
                                       onChange={(e) => handleInput(e)}
                                       placeholder="Current password" autoComplete="on"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label htmlFor="new-password">New Password</label>
                                <input type="password" className="form-control form-control-md"
                                       id="new-password" name="newPassword"
                                       onChange={(e) => handleInput(e)}
                                       placeholder="New password" autoComplete="off"/>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label htmlFor="repeat-password">Repeat Password</label>
                                <input type="password" className="form-control form-control-md"
                                       id="repeat-password" name="confirmPassword"
                                       onChange={(e) => handleInput(e)}
                                       placeholder="Repeat password" autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-end">
                        <button onClick={reset} type="button" className="btn btn-link text-muted mx-1">Reset</button>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.userReducer
    }
}

export default compose(withTranslation('common'), connect(mapStateToProps, null))(ChangePasswordForm);