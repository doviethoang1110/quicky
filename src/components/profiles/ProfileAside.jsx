import React, {useState} from 'react';
import {actionLogout} from "../../actions/user.action";
import {connect} from "react-redux";
import moment from "moment";
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import {storage} from "../../plugins/firebase";
import config from "../../config";

const ProfileAside = ({logout, user, t}) => {

    const [submit, setSubmit] = useState(false);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    }

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("avatar-preview").src = e.target.result
            }
            reader.readAsDataURL(e.target.files[0]);
            setImage(e.target.files[0]);
            setSubmit(true);
        }
    }

    const handleUpload = e => {
        e.preventDefault();
        const uploadTask = storage.ref(`images/media/avatar/${image.name}`).put(image);
        uploadTask.on("state_change", snapshot => {
            setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
        }, error => {
            console.log(error)
        }, () => {
            storage.ref("images/media/avatar")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    console.log(url)

                    setSubmit(false);
                    setUrl(url);
                })
        });
    }

    return (
        <div className="tab-pane active" id="profile-content">
            <div className="d-flex flex-column h-100">
                <div className="hide-scrollbar">
                    <div className="sidebar-header sticky-top p-2 mb-3">
                        <h5 className="font-weight-semibold">{t('title.profile')}</h5>
                        <p className="text-muted mb-0">Personal Information & Settings</p>
                    </div>
                    <div className="container-xl">
                        <div className="row">
                            <div className="col">
                                <div className="card card-body card-bg-5">
                                    <div className="d-flex flex-column align-items-center">
                                        <div style={{position: 'relative'}} className="avatar avatar-lg mb-3">
                                            <img id="avatar-preview" className="avatar-img" src={
                                                url ||
                                                (user.avatar &&`${config.FIREBASE_TOP_LINK + user.avatar + config.FIREBASE_BOTTOM_LINK}`) ||
                                                'https://thumbs.dreamstime.com/b/creative-vector-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mo-118823351.jpg'
                                            } alt=""/>
                                        </div>
                                        {(progress > 1) && (progress < 100) && (<progress value={progress} max="100"/>)}
                                        <label style={{
                                            cursor: 'pointer',
                                            position: 'absolute',
                                            top: '20px',
                                            right: '125px'
                                        }} htmlFor="avatar">
                                            <img width={"40px"} height={"30px"}
                                                 src={"https://banner2.cleanpng.com/20180406/ehe/kisspng-computer-icons-camera-vector-5ac7e86ba763d2.1779914315230506036856.jpg"}/>
                                        </label>
                                        <input onChange={(e) => handleChange(e)} type="file" id="avatar"
                                               style={{display: 'none'}}/>
                                        {submit && progress < 100 && (<button onClick={(e) => handleUpload(e)}
                                                                              className="btn btn-info">Submit</button>)}
                                        <div className="d-flex flex-column align-items-center">
                                            <h5>{user.name}</h5>
                                        </div>

                                        <div className="d-flex">
                                            <button onClick={e => handleLogout(e)}
                                                    className="btn btn-outline-default mx-1" type="button">

                                                <svg className="hw-18 d-none d-sm-inline-block" fill="none"
                                                     viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                                                </svg>


                                                <span>Logout</span>
                                            </button>
                                            <button className="btn btn-outline-default mx-1 d-xl-none"
                                                    data-profile-edit=""
                                                    type="button">

                                                <svg className="hw-18 d-none d-sm-inline-block" fill="none"
                                                     viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                </svg>
                                                <span>Settings</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-3">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item py-2">
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <p className="small text-muted mb-0">Birthdate</p>
                                                    <p className="mb-0">{user?.birthday && moment(user?.birthday).format('DD/MM/YYYY') || 'Không'}</p>
                                                </div>

                                                <svg className="text-muted hw-20 ml-1" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                </svg>
                                            </div>
                                        </li>
                                        <li className="list-group-item py-2">
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <p className="small text-muted mb-0">Phone</p>
                                                    <p className="mb-0">{user?.phone || 'Không'}</p>
                                                </div>

                                                <svg className="text-muted hw-20 ml-1" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                                </svg>
                                            </div>
                                        </li>
                                        <li className="list-group-item py-2">
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <p className="small text-muted mb-0">Email</p>
                                                    <p className="mb-0">{user.email}</p>
                                                </div>
                                                <svg className="text-muted hw-20 ml-1" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                                </svg>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card my-3">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item py-2">
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <p className="small text-muted mb-0">Facebook</p>
                                                    <a className="font-size-sm font-weight-medium"
                                                       href="# ">@cathe.richardson</a>
                                                </div>
                                                <svg className="text-muted hw-20 ml-1" viewBox="0 0 24 24" fill="none"
                                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                     strokeLinejoin="round">
                                                    <path
                                                        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                                </svg>


                                            </div>
                                        </li>
                                        <li className="list-group-item py-2">
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <p className="small text-muted mb-0">Twitter</p>
                                                    <a className="font-size-sm font-weight-medium"
                                                       href="# ">@cathe.richardson</a>
                                                </div>

                                                <svg className="text-muted hw-20 ml-1" viewBox="0 0 24 24" fill="none"
                                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                     strokeLinejoin="round">
                                                    <path
                                                        d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                                                </svg>


                                            </div>
                                        </li>
                                        <li className="list-group-item py-2">
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <p className="small text-muted mb-0">Instagram</p>
                                                    <a className="font-size-sm font-weight-medium"
                                                       href="# ">@cathe.richardson</a>
                                                </div>

                                                <svg className="text-muted hw-20 ml-1" viewBox="0 0 24 24" fill="none"
                                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                     strokeLinejoin="round">
                                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                                </svg>
                                            </div>
                                        </li>
                                        <li className="list-group-item py-2">
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <p className="small text-muted mb-0">Linkedin</p>
                                                    <a className="font-size-sm font-weight-medium"
                                                       href="# ">@cathe.richardson</a>
                                                </div>

                                                <svg className="text-muted hw-20 ml-1" viewBox="0 0 24 24" fill="none"
                                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                     strokeLinejoin="round">
                                                    <path
                                                        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                                    <rect x="2" y="9" width="4" height="12"/>
                                                    <circle cx="4" cy="4" r="2"/>
                                                </svg>


                                            </div>
                                        </li>
                                    </ul>

                                </div>
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
        logout: () => dispatch(actionLogout())
    }
}


export default compose(connect(mapStateToProps, mapDispatchToProps), withTranslation("common"))(ProfileAside);