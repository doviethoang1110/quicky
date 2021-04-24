import React, {useEffect} from 'react';
import socket from "../utils/socket";
import {RECEIVED_ADD_FRIEND_REQUEST, REMOVE_ADD_FRIEND_REQUEST_SUCCESS} from "../constants";
import {connect} from "react-redux";
import {showModal} from "../actions/modal.action";
import {withTranslation} from 'react-i18next';
import {compose} from "redux";
import {showToast} from "../plugins/sweetAlert";

const style = {
    position: 'absolute',
    top: '5px',
    right: '-7px',
    padding: '4px 5px',
    borderRadius: '50%',
    fontSize: '10px'
};

const SideBarHeader = ({openCreateGroupModal, openAddFriendModal, title, t}) => {

    useEffect(() => {

    }, []);

    return (
        <React.Fragment>
            <div className="sidebar-header sticky-top p-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-semibold mb-0">{t(`${title}`)}</h5>
                    <ul className="nav flex-nowrap">
                        <li className="nav-item list-inline-item mr-1" style={{position: 'relative'}}>
                            <span style={style} className="badge badge-danger">3</span>
                            <a className="nav-link text-muted px-1" href="# " title="Notifications" role="button"
                               data-toggle="modal" data-target="#notificationModal">
                                <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                                </svg>
                            </a>
                        </li>

                        <li className="nav-item list-inline-item d-block d-xl-none mr-1">
                            <a className="nav-link text-muted px-1" href="# " title="Appbar" data-toggle-appbar="">
                                <svg className="hw-20" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                     strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                </svg>

                            </a>
                        </li>

                        <li className="nav-item list-inline-item mr-0">
                            <div className="dropdown">
                                <a className="nav-link text-muted px-1" href="# " role="button" title="Details"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                                    </svg>
                                </a>

                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="# " role="button" data-toggle="modal"
                                       data-target="#startConversation">New Chat</a>
                                    <button type="button" className="dropdown-item" role="button"
                                            onClick={(e) => openCreateGroupModal()}>{t('modal.createGroup')}
                                    </button>
                                    <button type="button" className="dropdown-item" role="button"
                                            onClick={(e) => openAddFriendModal()}>{t('modal.addFriend')}
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        openAddFriendModal: () => dispatch(showModal({name: "addFriend", show: true})),
        openCreateGroupModal: () => dispatch(showModal({name: 'createGroup', show: true}))
    }
}

export default compose(withTranslation('common'), connect(null, mapDispatchToProps))(SideBarHeader);