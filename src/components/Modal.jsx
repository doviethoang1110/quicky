import React from 'react';
import AddFriends from "./modals/AddFriends";
import {showModal} from "../actions/modal.action";
import {connect} from "react-redux";
import AddNote from "./modals/AddNote";
import CreateGroup from "./modals/CreateGroup";
import NewChat from "./modals/NewChat";

const Modal = ({modal}) => {
    return (
        <React.Fragment>

            {modal.show && modal.name === 'newChat' && (<NewChat show={modal.show}/>)}

            {modal.show && modal.name === 'createGroup' && (<CreateGroup show={modal.show}/>)}

            {modal.show && modal.name === 'addFriend' && (<AddFriends show={modal.show}/>)}

            <div className="modal modal-lg-fullscreen fade" id="notificationModal" tabIndex="-1" role="dialog"
                 aria-labelledby="notificationModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-dialog-zoom">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="notificationModalLabel">Notifications</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body p-0 hide-scrollbar">
                            <div className="row">

                                <div className="col-12">
                                    <ul className="list-group list-group-flush  py-2">
                                        <li className="list-group-item">
                                            <div className="media">
                                                <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                                                    <svg className="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                                                    </svg>
                                                </div>

                                                <div className="media-body">
                                                    <h6>
                                                        <a href="# ">Catherine richardson</a> send you a friend request
                                                    </h6>

                                                    <p className="text-muted mb-0">5 mins ago</p>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center mt-2">
                                                <button type="button" className="btn btn-outline-danger mx-1">Reject</button>
                                                <button type="button" className="btn btn-primary mx-1">Accept</button>
                                            </div>

                                        </li>
                                        <li className="list-group-item">
                                            <div className="media">
                                                <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                                                    <svg className="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                    </svg>
                                                </div>

                                                <div className="media-body">
                                                    <h6>
                                                        <a href="# ">Katelyn Valdez</a> accepted your friend request
                                                    </h6>

                                                    <p className="text-muted mb-0">25 mins ago</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="media">
                                                <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">

                                                    <svg className="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                    </svg>

                                                </div>

                                                <div className="media-body">
                                                    <h6>
                                                        <a href="# ">Eva Walker</a> updated profile picture
                                                    </h6>

                                                    <p className="text-muted mb-0">5 mins ago</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="media">
                                                <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">

                                                    <svg className="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                    </svg>

                                                </div>

                                                <div className="media-body">
                                                    <h6>
                                                        <a href="# ">Bonnie Torres</a> accepted your friend request
                                                    </h6>

                                                    <p className="text-muted mb-0">5 mins ago</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="media">
                                                <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">

                                                    <svg className="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                    </svg>

                                                </div>

                                                <div className="media-body">
                                                    <h6>
                                                        <a href="# ">Christopher Garcia</a> updated profile picture
                                                    </h6>

                                                    <p className="text-muted mb-0">5 mins ago</p>
                                                </div>
                                            </div>
                                        </li>


                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-link text-muted">Clear all</button>
                        </div>
                    </div>
                </div>
            </div>

            {modal.show && modal.name === 'addNote' && (<AddNote show={modal.show}/>)}

            <div className="modal modal-lg-fullscreen fade" id="taskModal" tabIndex="-1" role="dialog"
                 aria-labelledby="taskModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-dialog-zoom">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="taskModalLabel">Edit task</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="editTaskName" className="col-form-label">Task name:</label>
                                    <input type="text" className="form-control" id="editTaskName" value="Dinner with friends"
                                           placeholder="Add task name here"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="editTaskDetails" className="col-form-label">Task details:</label>
                                    <textarea className="form-control hide-scrollbar" id="editTaskDetails" rows="4"
                                              placeholder="Add task descriptions">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis temporibus vel, molestiae nobis dolor aut sapiente. Vero possimus molestias consequatur quod, quo rem autem molestiae, accusantium nemo culpa eos doloremque?
                      </textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light border" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success">Finish</button>
                            <button type="button" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal modal-lg-fullscreen fade" id="addTaskModal" tabIndex="-1" role="dialog"
                 aria-labelledby="addTaskModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-dialog-zoom">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addTaskModalLabel">Add new task</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="addTaskName" className="col-form-label">Task name:</label>
                                    <input type="text" className="form-control" id="addTaskName" value=""
                                           placeholder="Add task name here"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addTaskDetails" className="col-form-label">Task details:</label>
                                    <textarea className="form-control hide-scrollbar" id="addTaskDetails" rows="4"
                                              placeholder="Add task descriptions"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light border" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Add task</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        modal: state.modalReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);