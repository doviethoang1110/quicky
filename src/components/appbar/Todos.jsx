import React from 'react';
import AppBarHeader from "./AppBarHeader";

const Todos = ({title}) => {
    return (
        <div className="tab-pane h-100 active" id="todo" role="tabpanel" aria-labelledby="todo-tab">
            <div className="appnavbar-content-wrapper">
                <div className="appnavbar-scrollable-wrapper">
                    <AppBarHeader title={title}/>

                    <div className="appnavbar-body">
                        <div className="appnavbar-body-title">
                            <div className="dropdown mr-2">
                                <button className="btn btn-outline-default dropdown-toggle" type="button"
                                        data-tasks-filter-list="" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">All Tasks
                                </button>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" data-task-filter="" data-select="all-tasks" href="# ">All
                                        Tasks</a>
                                    <a className="dropdown-item" data-task-filter="" data-select="active"
                                       href="# ">Active</a>
                                    <a className="dropdown-item" data-task-filter="" data-select="finished"
                                       href="# ">Finished</a>
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

                        <div className="todo-container">

                            <div className="todo-title">
                                <h6 className="mb-0">20/07/2020</h6>
                                <p className="text-muted">6 Task remaining</p>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <ul className="todo-list">
                                        <li className="todo-item todo-task-done">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="customCheck1" checked/>
                                                <label className="custom-control-label"
                                                       htmlFor="customCheck1">&nbsp;</label>
                                            </div>
                                            <h6 className="todo-title" data-toggle="modal"
                                                data-target="#taskModal">Dinner with
                                                friends</h6>
                                        </li>
                                        <li className="todo-item">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="customCheck2"/>
                                                <label className="custom-control-label"
                                                       htmlFor="customCheck2">&nbsp;</label>
                                            </div>
                                            <h6 className="todo-title" data-toggle="modal"
                                                data-target="#taskModal">Watching movie at
                                                10:30PM</h6>
                                        </li>
                                        <li className="todo-item todo-task-done">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="customCheck3" checked/>
                                                <label className="custom-control-label"
                                                       htmlFor="customCheck3">&nbsp;</label>
                                            </div>
                                            <h6 className="todo-title" data-toggle="modal"
                                                data-target="#taskModal">Watching a
                                                football match</h6>
                                        </li>
                                        <li className="todo-item">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="customCheck4"/>
                                                <label className="custom-control-label"
                                                       htmlFor="customCheck4">&nbsp;</label>
                                            </div>
                                            <h6 className="todo-title" data-toggle="modal"
                                                data-target="#taskModal">Coffie with
                                                girlfriend</h6>
                                        </li>
                                        <li className="todo-item">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="customCheck5"/>
                                                <label className="custom-control-label"
                                                       htmlFor="customCheck5">&nbsp;</label>
                                            </div>
                                            <h6 className="todo-title" data-toggle="modal"
                                                data-target="#taskModal">Meeting with
                                                design team</h6>
                                        </li>


                                    </ul>
                                </div>
                            </div>

                            <div className="todo-title mt-2">
                                <h6 className="mb-0">21/07/2020</h6>
                                <p className="text-muted">6 Task remaining</p>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <ul className="todo-list">
                                        <li className="todo-item">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="customCheck6"/>
                                                <label className="custom-control-label"
                                                       htmlFor="customCheck6">&nbsp;</label>
                                            </div>
                                            <h6 className="todo-title" data-toggle="modal"
                                                data-target="#taskModal">Dinner with
                                                friends</h6>
                                        </li>
                                        <li className="todo-item">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="customCheck7"/>
                                                <label className="custom-control-label"
                                                       htmlFor="customCheck7">&nbsp;</label>
                                            </div>
                                            <h6 className="todo-title" data-toggle="modal"
                                                data-target="#taskModal">Watching movie at
                                                10:30PM</h6>
                                        </li>
                                        <li className="todo-item">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="customCheck8"/>
                                                <label className="custom-control-label"
                                                       htmlFor="customCheck8">&nbsp;</label>
                                            </div>
                                            <h6 className="todo-title" data-toggle="modal"
                                                data-target="#taskModal">Watching a
                                                football match</h6>
                                        </li>
                                        <li className="todo-item">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="customCheck9"/>
                                                <label className="custom-control-label"
                                                       htmlFor="customCheck9">&nbsp;</label>
                                            </div>
                                            <h6 className="todo-title" data-toggle="modal"
                                                data-target="#taskModal">Coffie with
                                                girlfriend</h6>
                                        </li>
                                        <li className="todo-item">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="customCheck10"/>
                                                <label className="custom-control-label"
                                                       htmlFor="customCheck10">&nbsp;</label>
                                            </div>
                                            <h6 className="todo-title" data-toggle="modal"
                                                data-target="#taskModal">Meeting with
                                                design team</h6>
                                        </li>


                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="appnavbar-footer">
                        <div className="btn btn-primary btn-block" role="button" data-toggle="modal"
                             data-target="#addTaskModal">Add new task
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todos;