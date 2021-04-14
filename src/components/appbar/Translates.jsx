import React from 'react';
import AppBarHeader from "./AppBarHeader";

const Translates = ({title}) => {
    return (
        <div className="tab-pane h-100 active" id="translator" role="tabpanel" aria-labelledby="translator-tab">
            <div className="appnavbar-content-wrapper">
                <div className="appnavbar-scrollable-wrapper">
                    <AppBarHeader title={title}/>

                    <div className="appnavbar-body">
                        <div className="appnavbar-body-title">
                            <div className="dropdown w-100">
                                <button className="btn btn-outline-default btn-block dropdown-toggle" type="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">English
                                </button>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="# ">English</a>
                                    <a className="dropdown-item" href="# ">Hindi</a>
                                    <a className="dropdown-item" href="# ">Irish</a>
                                    <a className="dropdown-item" href="# ">Latin</a>
                                    <a className="dropdown-item" href="# ">Russian</a>
                                </div>
                            </div>

                            <img className="injetable hw-16 text-muted mx-1"
                                 src="./../../assets/media/heroicons/outline/arrow-right.svg" alt=""/>

                            <div className="dropdown w-100">
                                <button className="btn btn-outline-default btn-block dropdown-toggle" type="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Latin
                                </button>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="# ">English</a>
                                    <a className="dropdown-item" href="# ">Hindi</a>
                                    <a className="dropdown-item" href="# ">Irish</a>
                                    <a className="dropdown-item" href="# ">Latin</a>
                                    <a className="dropdown-item" href="# ">Russian</a>
                                </div>
                            </div>
                        </div>

                        <div className="translator-container p-2">
                            <div className="form-group">
                                <textarea className="form-control" rows="6" placeholder="Write text here"
                                          name="description">Rise and shine, buddy! It’s time to show this world who you are. I hope your morning is filled with peace and harmony, and you are ready to start your day. Hope that you’re starting it with a smile!</textarea>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <p className="mb-0">Et surge inluminare buddy! Aliquam quis es ut ostenderet hoc
                                        mundo. Utinam
                                        impleatur concordiam mane et dies incipere velis. Spes autem quae erant
                                        incipiens cum
                                        risu!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="appnavbar-footer">
                        <div className="btn btn-primary btn-block">Translate</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Translates;