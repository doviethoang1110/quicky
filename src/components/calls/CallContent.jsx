import React, { useEffect } from 'react';

const CallContent = (props) => {
    useEffect(() => {
        const body = document.querySelector("body");
        body.classList.remove(`${body.classList[0]}`);
        body.classList.add("calls-tab-open");
    }, []);
    return (
        <div className="calls px-0 py-2 p-xl-3">
            <div className="container-xl">
                <div className="row">
                    <div className="col">
                        <div className="card card-bg-1 mb-3">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center">
                                    <div className="avatar avatar-lg mb-3">
                                        <img className="avatar-img" src="./../../assets/media/avatar/2.png" alt=""/>
                                    </div>

                                    <div className="d-flex flex-column align-items-center">
                                        <h5 className="mb-1">Catherine Richardson</h5>
                                        <p className="text-white rounded px-2 bg-primary">+01-202-265462</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card-options">
                                <div className="dropdown">
                                    <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                                        </svg>

                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a className="dropdown-item" href="# ">Clear Call Log</a>
                                        <a className="dropdown-item" href="# ">Block</a>
                                    </div>
                                </div>
                            </div>

                            <div className="chat-closer d-xl-none">
                                <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button"
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

                <div className="row calls-log">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <div className="media">
                                    <div className="avatar avatar-primary mr-2">
                                            <span>
                                                <svg className="hw-24" viewBox="0 0 20 20" fill="currentColor">
                                                    <path
                                                        d="M14.414 7l3.293-3.293a1 1 0 00-1.414-1.414L13 5.586V4a1 1 0 10-2 0v4.003a.996.996 0 00.617.921A.997.997 0 0012 9h4a1 1 0 100-2h-1.586z"/>
                                                    <path
                                                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                                </svg>

                                            </span>
                                    </div>

                                    <div className="media-body">
                                        <h6>Incoming Call</h6>

                                        <div className="d-flex flex-column flex-sm-row align-items-sm-center align-items-start">
                                            <p className="text-muted mb-0">Just now</p><span
                                            className="d-none d-sm-block text-muted mx-2">•</span>
                                            <p className="text-muted mb-0">2m 35s</p>
                                        </div>
                                    </div>

                                    <div className="media-options ml-1 d-none d-sm-block">
                                        <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button">
                                            <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                            </svg>

                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="media">
                                    <div className="avatar avatar-primary mr-2">
                                            <span>
                                                <svg className="hw-24" viewBox="0 0 20 20" fill="currentColor">
                                                    <path
                                                        d="M17.924 2.617a.997.997 0 00-.215-.322l-.004-.004A.997.997 0 0017 2h-4a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L16 5.414V7a1 1 0 102 0V3a.997.997 0 00-.076-.383z"/>
                                                    <path
                                                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                                  </svg>

                                            </span>
                                    </div>

                                    <div className="media-body">
                                        <h6>Outgoing Call</h6>

                                        <div className="d-flex flex-column flex-sm-row align-items-sm-center align-items-start">
                                            <p className="text-muted mb-0">5 mins ago</p><span
                                            className="d-none d-sm-block text-muted mx-2">•</span>
                                            <p className="text-muted mb-0">12m 25s</p>
                                        </div>
                                    </div>

                                    <div className="media-options ml-1 d-none d-sm-block">
                                        <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button">
                                            <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                            </svg>

                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="media">
                                    <div className="avatar avatar-primary mr-2">
                                            <span>
                                                <svg className="hw-24" viewBox="0 0 20 20" fill="currentColor">
                                                    <path
                                                        d="M14.414 7l3.293-3.293a1 1 0 00-1.414-1.414L13 5.586V4a1 1 0 10-2 0v4.003a.996.996 0 00.617.921A.997.997 0 0012 9h4a1 1 0 100-2h-1.586z"/>
                                                    <path
                                                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                                </svg>
                                            </span>
                                    </div>

                                    <div className="media-body">
                                        <h6 className="text-danger">Missed Call</h6>

                                        <div className="d-flex flex-column flex-sm-row align-items-sm-center align-items-start">
                                            <p className="text-muted mb-0">18 mins ago</p>
                                        </div>
                                    </div>

                                    <div className="media-options ml-1 d-none d-sm-block">
                                        <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button">
                                            <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="media">
                                    <div className="avatar avatar-primary mr-2">
                                            <span>
                                                <svg className="hw-24" viewBox="0 0 20 20" fill="currentColor">
                                                    <path
                                                        d="M17.924 2.617a.997.997 0 00-.215-.322l-.004-.004A.997.997 0 0017 2h-4a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L16 5.414V7a1 1 0 102 0V3a.997.997 0 00-.076-.383z"/>
                                                    <path
                                                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                                </svg>

                                            </span>
                                    </div>

                                    <div className="media-body">
                                        <h6>Outgoing Call</h6>

                                        <div className="d-flex flex-column flex-sm-row align-items-sm-center align-items-start">
                                            <p className="text-muted mb-0">Yesterday at 10:45PM</p><span
                                            className="d-none d-sm-block text-muted mx-2">•</span>
                                            <p className="text-muted mb-0">25m 18s</p>
                                        </div>
                                    </div>

                                    <div className="media-options ml-1 d-none d-sm-block">
                                        <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button">
                                            <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="media">
                                    <div className="avatar avatar-primary mr-2">
                                            <span>
                                                <svg className="hw-24" viewBox="0 0 20 20" fill="currentColor">
                                                    <path
                                                        d="M14.414 7l3.293-3.293a1 1 0 00-1.414-1.414L13 5.586V4a1 1 0 10-2 0v4.003a.996.996 0 00.617.921A.997.997 0 0012 9h4a1 1 0 100-2h-1.586z"/>
                                                    <path
                                                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                                </svg>
                                            </span>
                                    </div>

                                    <div className="media-body">
                                        <h6>Incoming Call</h6>

                                        <div className="d-flex flex-column flex-sm-row align-items-sm-center align-items-start">
                                            <p className="text-muted mb-0">16/05/2020 at 11:49AM</p><span
                                            className="d-none d-sm-block text-muted mx-2">•</span>
                                            <p className="text-muted mb-0">0m 56s</p>
                                        </div>
                                    </div>

                                    <div className="media-options ml-1 d-none d-sm-block">
                                        <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button">
                                            <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="media">
                                    <div className="avatar avatar-primary mr-2">
                                            <span>
                                                <svg className="hw-24" viewBox="0 0 20 20" fill="currentColor">
                                                    <path
                                                        d="M14.414 7l3.293-3.293a1 1 0 00-1.414-1.414L13 5.586V4a1 1 0 10-2 0v4.003a.996.996 0 00.617.921A.997.997 0 0012 9h4a1 1 0 100-2h-1.586z"/>
                                                    <path
                                                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                                </svg>
                                            </span>
                                    </div>

                                    <div className="media-body">
                                        <h6>Incoming Call</h6>

                                        <div className="d-flex flex-column flex-sm-row align-items-sm-center align-items-start">
                                            <p className="text-muted mb-0">14/05/2020 at 11:49AM</p><span
                                            className="d-none d-sm-block text-muted mx-2">•</span>
                                            <p className="text-muted mb-0">24m 19s</p>
                                        </div>
                                    </div>

                                    <div className="media-options ml-1 d-none d-sm-block">
                                        <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button">
                                            <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CallContent;