import React from 'react';
import AppBarHeader from "./AppBarHeader";

const Notes = ({title}) => {
    return (
        <div className="tab-pane h-100 active" id="notes" role="tabpanel" aria-labelledby="notes-tab">
            <div className="appnavbar-content-wrapper">
                <div className="appnavbar-scrollable-wrapper">
                    <AppBarHeader title={title}/>

                    <div className="appnavbar-body">
                        <div className="appnavbar-body-title">
                            <div className="dropdown mr-2">
                                <button className="btn btn-outline-default dropdown-toggle" type="button"
                                        data-notes-filter-list="" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">All Notes
                                </button>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" data-notes-filter="" data-select="all-chats" href="# ">All
                                        Notes</a>
                                    <a className="dropdown-item" data-notes-filter="" data-select="friends"
                                       href="# ">Personal</a>
                                    <a className="dropdown-item" data-notes-filter="" data-select="groups"
                                       href="# ">Work</a>
                                    <a className="dropdown-item" data-notes-filter="" data-select="unread"
                                       href="# ">Favourite</a>
                                    <a className="dropdown-item" data-notes-filter="" data-select="archived"
                                       href="# ">Important</a>
                                </div>
                            </div>
                            <form className="form-inline">
                                <div className="input-group">
                                    <input type="text"
                                           className="form-control search border-right-0 transparent-bg pr-0"
                                           placeholder="Search notes"/>
                                    <div className="input-group-append">
                                        <div className="input-group-text transparent-bg border-left-0" role="button">

                                            <svg className="text-muted hw-20" fill="none" viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="note-container">
                            <div className="note">
                                <div className="note-body">
                                    <div className="note-added-on">Sunday, 20/12/2020 at 12:26 PM</div>
                                    <h5 className="note-title">Metting with John Doe</h5>
                                    <p className="note-description">Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. Quis,
                                        dolorum odio vitae sapiente eius obcaecati.</p>
                                </div>
                                <div className="note-footer">
                                    <div className="note-tools">
                                        <span className="badge badge-info">Personal</span>
                                    </div>
                                    <div className="note-tools">
                                        <div className="dropdown">
                                            <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                                                    type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <svg className="hw-20" xmlns="http://www.w3.org/2000/svg" height="24"
                                                     width="24"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                                                </svg>

                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="# ">Personal</a>
                                                <a className="dropdown-item" href="# ">Work</a>
                                                <a className="dropdown-item" href="# ">Favourite</a>
                                                <a className="dropdown-item" href="# ">Important</a>
                                                <div className="dropdown-divider"></div>
                                                <a className="dropdown-item text-danger" href="# ">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="note">
                                <div className="note-body">
                                    <div className="note-added-on">Sunday, 20/12/2020 at 12:26 PM</div>
                                    <h5 className="note-title">Metting with John Doe</h5>
                                    <p className="note-description">Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. Quis,
                                        dolorum odio vitae sapiente eius obcaecati.</p>
                                </div>
                                <div className="note-footer">
                                    <div className="note-tools">
                                        <span className="badge badge-danger">Important</span>
                                    </div>
                                    <div className="note-tools">
                                        <div className="dropdown">
                                            <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                                                    type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <svg className="hw-20" xmlns="http://www.w3.org/2000/svg" height="24"
                                                     width="24"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                                                </svg>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="# ">Personal</a>
                                                <a className="dropdown-item" href="# ">Work</a>
                                                <a className="dropdown-item" href="# ">Favourite</a>
                                                <a className="dropdown-item" href="# ">Important</a>
                                                <div className="dropdown-divider"></div>
                                                <a className="dropdown-item text-danger" href="# ">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="note">
                                <div className="note-body">
                                    <div className="note-added-on">Sunday, 20/12/2020 at 12:26 PM</div>
                                    <h5 className="note-title">Metting with John Doe</h5>
                                    <p className="note-description">Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. Quis,
                                        dolorum odio vitae sapiente eius obcaecati.</p>
                                </div>
                                <div className="note-footer">
                                    <div className="note-tools">
                                        <span className="badge badge-primary">Favourite</span>
                                    </div>
                                    <div className="note-tools">
                                        <div className="dropdown">
                                            <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                                                    type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <svg className="hw-20" xmlns="http://www.w3.org/2000/svg" height="24"
                                                     width="24"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                                                </svg>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="# ">Personal</a>
                                                <a className="dropdown-item" href="# ">Work</a>
                                                <a className="dropdown-item" href="# ">Favourite</a>
                                                <a className="dropdown-item" href="# ">Important</a>
                                                <div className="dropdown-divider"></div>
                                                <a className="dropdown-item text-danger" href="# ">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="note">
                                <div className="note-body">
                                    <div className="note-added-on">Sunday, 20/12/2020 at 12:26 PM</div>
                                    <h5 className="note-title">Metting with John Doe</h5>
                                    <p className="note-description">Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. Quis,
                                        dolorum odio vitae sapiente eius obcaecati.</p>
                                </div>
                                <div className="note-footer">
                                    <div className="note-tools">
                                        <span className="badge badge-warning">Work</span>
                                    </div>
                                    <div className="note-tools">
                                        <div className="dropdown">
                                            <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                                                    type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <svg className="hw-20" xmlns="http://www.w3.org/2000/svg" height="24"
                                                     width="24"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                                                </svg>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="# ">Personal</a>
                                                <a className="dropdown-item" href="# ">Work</a>
                                                <a className="dropdown-item" href="# ">Favourite</a>
                                                <a className="dropdown-item" href="# ">Important</a>
                                                <div className="dropdown-divider"></div>
                                                <a className="dropdown-item text-danger" href="# ">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="appnavbar-footer">
                        <div className="btn btn-primary btn-block" role="button" data-toggle="modal"
                             data-target="#addNoteModal">Add new note
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notes;