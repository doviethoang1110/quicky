import React, {useEffect, useState, useCallback} from 'react';
import SideBarHeader from "../SideBarHeader";
import client from "../../plugins/apollo";
import {connect} from "react-redux";
import {FIND_LIST_FRIENDS} from "../../graphql/users/users.query";
import config from "../../config";
import socket from "../../utils/socket";
import {GET_PROFILE} from "../../constants";
import {debounce} from 'lodash';
import {withTranslation} from "react-i18next";
import {compose} from "redux";

const FriendAside = ({user, t}) => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(JSON.stringify({"id": `${user.id}`}));

    const query = async (page = currentPage, filter = `{"id": "${user.id}"}`) => {
        return client.query({
            query: FIND_LIST_FRIENDS,
            variables: {
                filter: `${filter}`,
                page,
                limit: 6
            }
        });
    }

    const delayedQuery = useCallback(debounce(async q => {
        const newFilter = (typeof filter === 'string') ? JSON.parse(filter) : filter;
        newFilter.name = q.toString();
        setFilter(`${JSON.stringify(newFilter)}`);
    }, 1000), []);

    const handleChange = async (e) => {
        setLoading(true);
        setSearch(e.target.value);
        const temp = document.getElementById("search").value;
        if (temp) delayedQuery(temp);
        else setFilter(JSON.stringify({"id": `${user.id}`}));
        setCurrentPage(1);
    }

    useEffect(async () => {
        setLoading(true);
        const {data} = await query(currentPage, filter);
        let newArray;
        if (data?.findListFriends?.users && data?.findListFriends?.users?.length > 0) {
            socket.emit(GET_PROFILE, users.length > 0 ? users[0].id : data.findListFriends.users[0].id);
            if (currentPage > 1) {
                newArray = [...users, ...data.findListFriends.users];
            } else {
                newArray = data.findListFriends.users;
            }
            setUsers(newArray);
            if (+data.findListFriends.totalPage !== +totalPage) setTotalPage(data.findListFriends.totalPage);
        } else {
            setUsers([]);
        }
        setLoading(false);
    }, [currentPage, filter]);

    const showProfile = (e, id) => {
        e.preventDefault();
        for (let i = 0; i < document.getElementsByClassName("contacts-item").length; i++) {
            document.getElementsByClassName("contacts-item")[i].classList.remove("active")
        }
        document.getElementById(`ele${id}`).classList.add("active");
        socket.emit(GET_PROFILE, id);
    }

    const handleScroll = async ({target: {scrollTop, clientHeight, scrollHeight}}) => {
        if (scrollTop + clientHeight >= scrollHeight) {
            if (currentPage + 1 <= totalPage) setCurrentPage(currentPage + 1);
        }
    }

    return (
        <React.Fragment>
            <div className="tab-pane active" id="friends-content">
                <div className="d-flex flex-column h-100">
                    <div className="hide-scrollbar" id="friendsList">
                        <SideBarHeader title={'title.friend'}/>
                        <div className="sidebar-sub-header">
                            <div className="dropdown mr-2">
                                <button className="btn btn-outline-default dropdown-toggle" type="button"
                                        data-chat-filter-list="" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                    All Chats
                                </button>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" data-chat-filter="" data-select="all-chats" href="# ">All
                                        Chats</a>
                                    <a className="dropdown-item" data-chat-filter="" data-select="friends" href="# ">Friends</a>
                                    <a className="dropdown-item" data-chat-filter="" data-select="groups" href="# ">Groups</a>
                                    <a className="dropdown-item" data-chat-filter="" data-select="unread" href="# ">Unread</a>
                                    <a className="dropdown-item" data-chat-filter="" data-select="archived"
                                       href="# ">Archived</a>
                                </div>
                            </div>
                            <form className="form-inline">
                                <div className="input-group">
                                    <input type="text" onChange={(e) => handleChange(e)} id="search"
                                           className="form-control search border-right-0 transparent-bg pr-0" value={search}
                                           placeholder="Search users"/>
                                    <div className="input-group-append">
                                        <div className="input-group-text transparent-bg border-left-0" role="button">
                                            <svg className="text-muted hw-20" fill="none" viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <ul onScroll={handleScroll} className="contacts-list" id="friendsTab" data-friends-list=""
                            style={{overflowY: 'auto', height: '580px'}}>
                            {users && users.length > 0 ? users.map((u, index) => (
                                <li id={`ele${u.id}`} onClick={(e) => showProfile(e, u.id)} key={index}
                                    className="contacts-item">
                                    <a className="contacts-link" href="# ">
                                        <div className="avatar">
                                            <img src={
                                                u.avatar && (u.avatar.startsWith("https") ? u.avatar : `${config.FIREBASE_TOP_LINK + u.avatar + config.FIREBASE_BOTTOM_LINK}`) ||
                                                'https://thumbs.dreamstime.com/b/creative-vector-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mo-118823351.jpg'
                                            } alt=""/>
                                        </div>
                                        <div className="contacts-content">
                                            <div className="contacts-info">
                                                <h6 className="chat-name text-truncate">{u.name || ''}</h6>
                                            </div>
                                            <div className="contacts-texts">
                                                <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20"
                                                     fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                                <p className="text-muted mb-0">{u.email || ''}</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            )) : (<span className="text-primary">{t('notfound')}</span>)}
                            <div id="last-child"></div>
                        </ul>
                        {loading && (<span className="text-primary">Loading...</span>)}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        user: state.userReducer
    }
}

export default compose(connect(mapStateToProps, null), withTranslation("common"))(FriendAside);