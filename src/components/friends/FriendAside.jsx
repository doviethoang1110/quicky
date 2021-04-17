import React from 'react';
import SideBarHeader from "../SideBarHeader";

const FriendAside = (props) => {
    return (
        <div className="tab-pane active" id="friends-content">
            <div className="d-flex flex-column h-100">
                <div className="hide-scrollbar" id="friendsList">
                    <SideBarHeader title="title.friend"/>
                    <ul className="contacts-list" id="friendsTab" data-friends-list="">
                        <li>
                            <small className="font-weight-medium text-uppercase text-muted">A</small>
                        </li>
                        <li className="contacts-item active">
                            <a className="contacts-link" href="# ">
                                <div className="avatar">
                                    <img src="./../../assets/media/avatar/3.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Albert K. Johansen</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                        <p className="text-muted mb-0">San Fransisco, CA</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="contacts-item">
                            <a className="contacts-link" href="# ">
                                <div className="avatar">
                                    <img src="./../../assets/media/avatar/3.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Alice R. Botello</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                  clipRule="evenodd"/>
                                        </svg>

                                        <p className="text-muted mb-0">Brentwood, NY</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <small className="font-weight-medium text-uppercase text-muted">b</small>
                        </li>
                        <li className="contacts-item">
                            <a className="contacts-link" href="# ">
                                <div className="avatar">
                                    <img src="./../../assets/media/avatar/3.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Brittany K. Williams</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                        <p className="text-muted mb-0">Scranton, PA</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <small className="font-weight-medium text-uppercase text-muted">C</small>
                        </li>
                        <li className="contacts-item">
                            <a className="contacts-link" href="# ">
                                <div className="avatar">
                                    <img src="./../../assets/media/avatar/3.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Christopher Garcia</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                        <p className="text-muted mb-0">Riverside, CA</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="contacts-item">
                            <a className="contacts-link" href="# ">
                                <div className="avatar">
                                    <img src="./../../assets/media/avatar/3.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Casey Mcbride</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                  clipRule="evenodd"/>
                                        </svg>

                                        <p className="text-muted mb-0">Zephyr, NC</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <small className="font-weight-medium text-uppercase text-muted">G</small>
                        </li>
                        <li className="contacts-item">
                            <a className="contacts-link" href="# ">
                                <div className="avatar">
                                    <img src="./../../assets/media/avatar/3.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Gemma Mendez</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                  clipRule="evenodd"/>
                                        </svg>

                                        <p className="text-muted mb-0">Frederick, MD</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <small className="font-weight-medium text-uppercase text-muted">k</small>
                        </li>
                        <li className="contacts-item">
                            <a className="contacts-link" href="# ">
                                <div className="avatar">
                                    <img src="./../../assets/media/avatar/3.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Katelyn Valdez</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                  clipRule="evenodd"/>
                                        </svg>

                                        <p className="text-muted mb-0">Jackson, TN</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="contacts-item">
                            <a className="contacts-link" href="# ">
                                <div className="avatar">
                                    <img src="./../../assets/media/avatar/3.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Katherine Schneider</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                  clipRule="evenodd"/>
                                        </svg>


                                        <p className="text-muted mb-0">Saginaw, MI</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <small className="font-weight-medium text-uppercase text-muted">m</small>
                        </li>
                        <li className="contacts-item">
                            <a className="contacts-link" href="# ">
                                <div className="avatar">
                                    <img src="./../../assets/media/avatar/3.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Maizie Edwards</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                  clipRule="evenodd"/>
                                        </svg>

                                        <p className="text-muted mb-0">Greensboro, NC</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <small className="font-weight-medium text-uppercase text-muted">s</small>
                        </li>
                        <li className="contacts-item">
                            <a className="contacts-link" href="# ">
                                <div className="avatar">
                                    <img src="./../../assets/media/avatar/3.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Susan K. Taylor</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                        <p className="text-muted mb-0">Centerville, VA</p>
                                    </div>
                                </div>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FriendAside;