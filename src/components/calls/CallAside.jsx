import React from 'react';
import SideBarHeader from "../SideBarHeader";

const CallAside = (props) => {
    return (
        <div className="tab-pane active" id="calls-content">
            <div className="d-flex flex-column h-100">
                <div className="hide-scrollbar h-100" id="callContactsList">
                    <SideBarHeader title="title.call"/>
                    <ul className="contacts-list" id="callLogTab" data-call-list="">

                        <li className="contacts-item incoming active">
                            <a href="# " className="media-link"></a>
                            <div className="contacts-link">
                                <div className="avatar">
                                    <img src="./../../assets/media/avatar/2.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Catherine Richardson</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M14.414 7l3.293-3.293a1 1 0 00-1.414-1.414L13 5.586V4a1 1 0 10-2 0v4.003a.996.996 0 00.617.921A.997.997 0 0012 9h4a1 1 0 100-2h-1.586z"/>
                                            <path
                                                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                        </svg>


                                        <p className="text-muted mb-0">Just now</p>
                                    </div>
                                </div>
                                <div className="contacts-action">
                                    <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button">

                                        <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li className="contacts-item outgoing">
                            <a href="# " className="media-link"></a>
                            <div className="contacts-link outgoing">
                                <div className="avatar bg-info text-light">
                                    <span>EW</span>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Eva Walker</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M17.924 2.617a.997.997 0 00-.215-.322l-.004-.004A.997.997 0 0017 2h-4a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L16 5.414V7a1 1 0 102 0V3a.997.997 0 00-.076-.383z"/>
                                            <path
                                                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                        </svg>


                                        <p className="text-muted mb-0">5 mins ago</p>
                                    </div>
                                </div>
                                <div className="contacts-action">
                                    <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button">

                                        <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>


                                    </button>
                                </div>
                            </div>
                        </li>


                        <li className="contacts-item missed">
                            <a href="# " className="media-link"></a>
                            <div className="contacts-link missed">
                                <div className="avatar">
                                    <img src="./../../assets/media/avatar/3.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Christopher Garcia</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-danger mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M14.414 7l3.293-3.293a1 1 0 00-1.414-1.414L13 5.586V4a1 1 0 10-2 0v4.003a.996.996 0 00.617.921A.997.997 0 0012 9h4a1 1 0 100-2h-1.586z"/>
                                            <path
                                                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                        </svg>


                                        <p className="text-danger mb-0">20 mins ago</p>
                                    </div>
                                </div>
                                <div className="contacts-action">
                                    <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button">

                                        <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>

                                    </button>
                                </div>
                            </div>
                        </li>
                        <li className="contacts-item outgoing">
                            <a href="# " className="media-link"></a>
                            <div className="contacts-link outgoing">
                                <div className="avatar">
                                    <img src="./../../assets/media/avatar/4.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Christina Turner</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M17.924 2.617a.997.997 0 00-.215-.322l-.004-.004A.997.997 0 0017 2h-4a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L16 5.414V7a1 1 0 102 0V3a.997.997 0 00-.076-.383z"/>
                                            <path
                                                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                        </svg>

                                        <p className="text-muted mb-0">4 hour ago</p>
                                    </div>
                                </div>
                                <div className="contacts-action">
                                    <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button">

                                        <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>


                                    </button>
                                </div>
                            </div>
                        </li>


                        <li className="contacts-item incoming">
                            <a href="# " className="media-link"></a>
                            <div className="contacts-link incoming">
                                <div className="avatar">
                                    <img src="./../../assets/media/avatar/5.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Tammy Martinez</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M14.414 7l3.293-3.293a1 1 0 00-1.414-1.414L13 5.586V4a1 1 0 10-2 0v4.003a.996.996 0 00.617.921A.997.997 0 0012 9h4a1 1 0 100-2h-1.586z"/>
                                            <path
                                                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                        </svg>


                                        <p className="text-muted mb-0">Yesterday</p>
                                    </div>
                                </div>
                                <div className="contacts-action">
                                    <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button">

                                        <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>


                                    </button>
                                </div>
                            </div>
                        </li>


                        <li className="contacts-item incoming">
                            <a href="# " className="media-link"></a>
                            <div className="contacts-link incoming">
                                <div className="avatar">
                                    <img src="./../../assets/media/avatar/6.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Bonnie Torres</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M14.414 7l3.293-3.293a1 1 0 00-1.414-1.414L13 5.586V4a1 1 0 10-2 0v4.003a.996.996 0 00.617.921A.997.997 0 0012 9h4a1 1 0 100-2h-1.586z"/>
                                            <path
                                                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                        </svg>


                                        <p className="text-muted mb-0">12/06/2020</p>
                                    </div>
                                </div>
                                <div className="contacts-action">
                                    <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button">

                                        <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>


                                    </button>
                                </div>
                            </div>
                        </li>
                        <li className="contacts-item outgoing">
                            <a href="# " className="media-link"></a>
                            <div className="contacts-link outgoing">
                                <div className="avatar">
                                    <img src="./../../assets/media/avatar/7.png" alt=""/>
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">Jacqueline James</h6>
                                    </div>
                                    <div className="contacts-texts">

                                        <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M17.924 2.617a.997.997 0 00-.215-.322l-.004-.004A.997.997 0 0017 2h-4a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L16 5.414V7a1 1 0 102 0V3a.997.997 0 00-.076-.383z"/>
                                            <path
                                                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                        </svg>
                                        <p className="text-muted mb-0">16/05/2020</p>
                                    </div>
                                </div>
                                <div className="contacts-action">
                                    <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button">

                                        <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>


                                    </button>
                                </div>
                            </div>
                        </li>


                    </ul>

                </div>
            </div>
        </div>
    );
}

export default CallAside;