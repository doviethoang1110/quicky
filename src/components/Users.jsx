import React, {useState, useEffect} from 'react';
import client from "../plugins/apollo";
import {FIND_USERS_BY_ID} from "../graphql/users/users.query";
import {formatDateTime} from "../utils/helpers";
import {connect} from "react-redux";
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import socket from "../utils/socket";
import {
    ACCEPT_ADD_FRIEND_REQUEST, ACCEPT_ADD_FRIEND_REQUEST_SUCCESS,
    RECEIVED_ADD_FRIEND_REQUEST,
    REMOVE_ADD_FRIEND_REQUEST,
    REMOVE_ADD_FRIEND_REQUEST_SUCCESS,
    SEND_ADD_FRIEND_REQUEST
} from "../constants";
import {showToast} from "../plugins/sweetAlert";

const Users = (props) => {

    const body = document.querySelector("body");
    body.classList.remove(`${body.classList[0]}`);
    body.classList.add("users-tab-open");
    const [user, setUser] = useState({
        id: null,
        avatar: '',
        name: '',
        email: '',
        birthday: '',
        status: null,
        userActionId: null
    });

    const receiveRequest = (data) => {
        setUser({...user, ...data});
        showToast('success', `${data.name} send you an add friend request`);
    }

    const removeRequest = (data) => {
        setUser({...user, ...data});
        showToast('success', `${data.name} reject your add friend request`);
    }

    const acceptRequest = data => {
        setUser({...user, ...data});
        showToast('success', `${data.name} accept your add friend request`);
    }

    useEffect(() => {
        socket.on(RECEIVED_ADD_FRIEND_REQUEST, receiveRequest);
        socket.on(REMOVE_ADD_FRIEND_REQUEST_SUCCESS, removeRequest);
        socket.on(ACCEPT_ADD_FRIEND_REQUEST_SUCCESS, acceptRequest);
        return () => {
            socket.off(RECEIVED_ADD_FRIEND_REQUEST, receiveRequest);
            socket.off(REMOVE_ADD_FRIEND_REQUEST_SUCCESS, removeRequest);
            socket.off(ACCEPT_ADD_FRIEND_REQUEST_SUCCESS, acceptRequest);
        }
    }, []);

    useEffect(async () => {
        if (props.match.params.id) {
            const {data} = await client.query({
                query: FIND_USERS_BY_ID,
                variables: {
                    id: +props.match.params.id
                }
            })
            setUser({...data.getUsersById});
        }
    }, [props.match.params.id]);

    const addFriendRequest = (e, id) => {
        e.preventDefault();
        socket.emit(SEND_ADD_FRIEND_REQUEST, {sender: props.userState, receiver: id});
        setUser({...user, status: 1, userActionId: props.userState.id});
    }

    const removeFriendRequest = (e, id) => {
        e.preventDefault();
        socket.emit(REMOVE_ADD_FRIEND_REQUEST, {sender: props.userState, receiver: id});
        setUser({...user, status: null, userActionId: null});
    }

    const acceptFriendRequest = (e, id) => {
        e.preventDefault();
        socket.emit(ACCEPT_ADD_FRIEND_REQUEST, {sender: id, receiver: props.userState});
        setUser({...user, status: 3, userActionId: props.userState.id});
    }

    return (
        <div className="friends px-0 py-2 p-xl-3">
            <div className="container-xl">
                <div className="row">
                    <div className="col">
                        <div className="card card-body card-bg-1 mb-3">
                            <div className="d-flex flex-column align-items-center">
                                <div className="avatar avatar-lg mb-3">
                                    <img className="avatar-img" src={
                                        user.avatar
                                        || 'https://www.vippng.com/png/detail/416-4161690_empty-profile-picture-blank-avatar-image-circle.png'
                                    } alt=""/>
                                </div>

                                <div className="d-flex flex-column align-items-center">
                                    <h5 className="mb-1">{user.name}</h5>
                                    <div className="d-flex mt-2">
                                        {(!user.status) && (
                                            <button onClick={(e) => addFriendRequest(e, user.id)}
                                                    className="btn btn-primary">{props.t("addFriend.request")}</button>
                                        )}
                                        {(user.status && user.status === 1) && (user.userActionId === props.userState.id) && (
                                            <button onClick={(e) => removeFriendRequest(e, user.id)}
                                                    className="btn btn-danger">{props.t("remove.request")}</button>
                                        )}
                                        {(user.status && user.status === 1) && (user.userActionId !== props.userState.id) && (
                                            <button onClick={(e) => acceptFriendRequest(e, user.id)}
                                                    className="btn btn-success">{props.t("accept.request")}</button>
                                        )}
                                        {user.status === 3 && (
                                            <>
                                                <div
                                                    className="btn btn-primary btn-icon rounded-circle text-light mx-2">
                                                    <svg className="hw-24" fill="none" viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                                    </svg>
                                                </div>
                                                <div
                                                    className="btn btn-success btn-icon rounded-circle text-light mx-2">
                                                    <svg className="hw-24" fill="none" viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                                    </svg>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="card-options">
                                <div className="dropdown">
                                    <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                                            type="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                                        </svg>

                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a className="dropdown-item" href="# ">Remove</a>
                                        <a className="dropdown-item" href="# ">Block</a>
                                    </div>
                                </div>
                            </div>

                            <div className="chat-closer d-xl-none">
                                <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                                        type="button"
                                        data-close="">
                                    <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                    </svg>

                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row friends-info">
                    <div className="col">
                        <div className="card">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="small text-muted mb-0">Birthdate</p>
                                            <p className="mb-0">{formatDateTime(user.birthday)}</p>
                                        </div>
                                        <svg className="text-muted hw-20" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>

                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="small text-muted mb-0">Phone</p>
                                            <p className="mb-0">{user.phone || 'Kh??ng'}</p>
                                        </div>
                                        <svg className="text-muted hw-20" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="small text-muted mb-0">Email</p>
                                            <p className="mb-0">{user.email}</p>
                                        </div>
                                        <svg className="text-muted hw-20" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                </li>
                            </ul>
                        </div>


                        <div className="card">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="small text-muted mb-0">Facebook</p>
                                            <a className="font-size-sm font-weight-medium"
                                               href="# ">@cathe.richardson</a>
                                        </div>
                                        <svg className="text-muted hw-20" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor"
                                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path
                                                d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                        </svg>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="small text-muted mb-0">Twitter</p>
                                            <a className="font-size-sm font-weight-medium"
                                               href="# ">@cathe.richardson</a>
                                        </div>
                                        <svg className="text-muted hw-20" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor"
                                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path
                                                d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                                        </svg>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="small text-muted mb-0">Instagram</p>
                                            <a className="font-size-sm font-weight-medium"
                                               href="# ">@cathe.richardson</a>
                                        </div>
                                        <svg className="text-muted hw-20" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor"
                                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                        </svg>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="small text-muted mb-0">Linkedin</p>
                                            <a className="font-size-sm font-weight-medium"
                                               href="# ">@cathe.richardson</a>
                                        </div>
                                        <svg className="text-muted hw-20" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor"
                                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    );
}

const mapStateToProps = state => {
    return {
        userState: state.userReducer
    }
}

export default compose(connect(mapStateToProps, null), withTranslation("common"))(Users);