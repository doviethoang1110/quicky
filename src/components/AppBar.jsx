import React,{useEffect,useState} from 'react';
import Settings from "./appbar/Settings";
import Todos from "./appbar/Todos";
import Notes from "./appbar/Notes";
import Translates from "./appbar/Translates";
import {closeAppBar} from "../utils/closeAppBar";

const AppBar = (props) => {

    const [appBar, setAppBar] = useState("");

    const clearBackDrop = () => {
        closeAppBar();
        setAppBar("");
    }

    const changeTab = (e, state) => {
        e.preventDefault();
        document.querySelector(".backdrop").classList.add("backdrop-visible");
        document.querySelector(".appnavbar-content").classList.add("appnavbar-content-visible");
        document.querySelector("#appNavTab .nav-link").classList.remove("active");
        document.querySelector("#appNavTab").childNodes.forEach(n => {
            n.firstChild.classList.remove("active")
        });
        document.querySelector(`#${state}`).classList.add("active");
        setAppBar(state);
    }

    return (
        <>
            <div className="appbar">
                <div className="appbar-wrapper hide-scrollbar">
                    <div className="d-flex justify-content-center border-bottom w-100">
                        <button className="btn btn-secondary btn-icon m-0 btn-minimal btn-sm text-muted d-xl-none" type="button"
                                data-apps-close="">
                            <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                            </svg>
                        </button>
                    </div>
                    <div className="appbar-head">

                        <svg className="hw-20" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                        </svg>
                        <h6 className="mb-0 mt-1">Apps</h6>
                    </div>
                    <ul className="nav nav-minimal appbar-nav" id="appNavTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a onClick={(e) => changeTab(e, "translates")} className="nav-link" id="translates" role="tab"
                               aria-controls="translator" aria-selected="true">

                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                                </svg>
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a onClick={(e) => changeTab(e, "notes")} className="nav-link" id="notes" role="tab" aria-controls="notes"
                               aria-selected="false">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                                </svg>

                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a onClick={(e) => changeTab(e, "todos")} className="nav-link" id="todos" role="tab" aria-controls="todo"
                               aria-selected="false">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                                </svg>
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a onClick={(e) => changeTab(e, "settings")} className="nav-link" id="settings" role="tab"
                               aria-controls="quick-settings" aria-selected="false">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="tab-content appnavbar-content">

                    {appBar === 'translates' && (<Translates title="translate"/>)}

                    {appBar === 'notes' && (<Notes title="note"/>)}

                    {appBar === 'todos' && (<Todos title="todo"/>)}

                    {appBar === 'settings' && (<Settings title="setting"/>)}
                </div>
            </div>
            <div onClick={clearBackDrop} className="backdrop"></div>
        </>
    );
}

export default AppBar;