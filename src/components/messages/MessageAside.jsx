import React from 'react';
import SideBarHeader from "../SideBarHeader";

const MessageAside = (props) => {
    return (
        <div className="tab-pane active" id="chats-content">
            <div className="d-flex flex-column h-100">
                <div className="hide-scrollbar h-100" id="chatContactsList">
                    <SideBarHeader title="title.chat"/>
                    <ul className="contacts-list" id="chatContactTab" data-chat-list="">
                        <li className="contacts-item friends active">
                            <a className="contacts-link" href="javascript:;">
                                <div className="avatar avatar-online">
                                    <img src="./../../assets/media/avatar/2.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Catherine Richardson</h6>
                                        <div className="chat-time">Just now</div>
                                    </div>
                                    <div className="contacts-texts">
                                        <p className="text-truncate">I’m sorry, I didn’t catch that. Could you please repeat?</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="contacts-item groups">
                            <a className="contacts-link" href="./chat-2.html">
                                <div className="avatar bg-success text-light">
                                            <span>
                                              <svg className="hw-24" fill="none" viewBox="0 0 24 24"
                                                   stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                                </svg>
                                            </span>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name">Themeforest Group</h6>
                                        <div className="chat-time"><span>10:20 pm</span></div>
                                    </div>
                                    <div className="contacts-texts">
                                        <p className="text-truncate"><span>Jeny: </span>That’s pretty common. I heard that a lot of
                                            people had the same experience.</p>
                                        <div className="d-inline-flex align-items-center ml-1">
                                            <svg className="hw-16 text-muted" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd"
                                                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="contacts-item friends unread">
                            <a className="contacts-link" href="# ">
                                <div className="avatar avatar-offline bg-info text-light">
                                    <span>EW</span>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name">Eva Walker</h6>
                                        <div className="chat-time">09:36 am</div>
                                    </div>
                                    <div className="contacts-texts">
                                        <p className="text-truncate">You’re kidding! I drive a motorcycle as well. What type of bike
                                            do you have?</p>
                                        <div className="badge badge-rounded badge-primary ml-1">2</div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="contacts-item friends">
                            <a className="contacts-link" href="# ">
                                <div className="avatar avatar-busy"><img src="./../../assets/media/avatar/3.png" alt=""/></div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name">Christopher Garcia</h6>
                                        <div className="chat-time"><span>Yesterday</span></div>
                                    </div>
                                    <div className="contacts-texts">
                                        <svg className="hw-20 text-muted" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                        <p className="text-truncate">Photo</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="contacts-item unread">
                            <a className="contacts-link" href="# ">
                                <div className="avatar avatar-online">
                                    <img src="./../../assets/media/avatar/4.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name">Christina Turner</h6>
                                        <div className="chat-time">
                                            <span>31/05/20</span>
                                        </div>
                                    </div>
                                    <div className="contacts-texts">
                                        <p className="text-truncate">I’m working hard in Maths, Physics and Chemistry. I have
                                            planning to appear in I.I.T. after XII.</p>
                                        <div className="badge badge-rounded badge-primary ml-1">10</div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="contacts-item friends">
                            <a className="contacts-link" href="# ">
                                <div className="avatar avatar-offline">
                                    <img src="./../../assets/media/avatar/5.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name">Tammy Martinez</h6>
                                        <div className="chat-time">
                                            <span>24/04/20</span>
                                        </div>
                                    </div>
                                    <div className="contacts-texts">
                                        <svg className="hw-20 text-muted" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                        <p className="text-truncate">project_guidelines.docs</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="contacts-item friends">
                            <a className="contacts-link" href="# ">
                                <div className="avatar avatar-online"><img src="./../../assets/media/avatar/6.png" alt=""/></div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name">Bonnie Torres</h6>
                                        <div className="chat-time"><span>20/04/20</span></div>
                                    </div>
                                    <div className="contacts-texts">
                                        <p className="text-truncate">Catch you later! Bye-bye!</p>
                                        <div className="d-inline-flex align-items-center ml-1">
                                            <svg className="hw-16 text-muted" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd"
                                                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                                                      clipRule="evenodd"/>
                                            </svg>

                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>

                        <li className="contacts-item friends">
                            <a className="contacts-link" href="# ">
                                <div className="avatar avatar-offline"><img src="./../../assets/media/avatar/7.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name">Jacqueline James</h6>
                                        <div className="chat-time"><span>15/02/20</span></div>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M14.414 7l3.293-3.293a1 1 0 00-1.414-1.414L13 5.586V4a1 1 0 10-2 0v4.003a.996.996 0 00.617.921A.997.997 0 0012 9h4a1 1 0 100-2h-1.586z"/>
                                            <path
                                                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                        </svg>
                                        <p className="text-truncate">Missed call</p>
                                    </div>
                                </div>
                            </a>
                        </li>

                        <li className="contacts-item archived">
                            <a className="contacts-link" href="# ">
                                <div className="avatar avatar-away"><img src="./../../assets/media/avatar/8.png" alt=""/></div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name">Annie Richardson</h6>
                                        <div className="chat-time"><span>26/12/19</span></div>
                                    </div>
                                    <div className="contacts-texts">
                                        <p className="text-truncate">I think I have everything I need, thank you!</p>
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

export default MessageAside;