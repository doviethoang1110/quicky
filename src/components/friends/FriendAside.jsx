import React, {useEffect, useState} from 'react';
import SideBarHeader from "../SideBarHeader";
import client from "../../plugins/apollo";
import {} from "../../graphql/users/users.query";
import {connect} from "react-redux";
import {FIND_LIST_FRIENDS} from "../../graphql/users/users.query";
import config from "../../config";
import socket from "../../utils/socket";
import {GET_PROFILE} from "../../constants";

const FriendAside = ({user}) => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);

    useEffect(async () => {
        const {data} = await client.query({
            query: FIND_LIST_FRIENDS,
            variables: {
                filter: `{"id": "${user.id}"}`,
                page: currentPage,
                limit: 5
            }
        });
        setUsers([...data.findListFriends.users || []]);
        if (data.findListFriends?.users.length > 0) {
            document.getElementById(`ele${data.findListFriends.users[0].id}`).classList.add("active");
            socket.emit(GET_PROFILE, data.findListFriends.users[0].id);
        }
    }, []);

    const showProfile = (e, id) => {
        e.preventDefault();
        for (let i = 0; i < document.getElementsByClassName("contacts-item").length; i++) {
            document.getElementsByClassName("contacts-item")[i].classList.remove("active")
        }
        document.getElementById(`ele${id}`).classList.add("active");
        socket.emit(GET_PROFILE, id);
    }

    const handleScroll = () => {
        console.log('ok')
    }

    return (
        <div className="tab-pane active" id="friends-content">
            <div className="d-flex flex-column h-100">
                <div className="hide-scrollbar" id="friendsList">
                    <SideBarHeader title="title.friend"/>
                    <ul onScroll={handleScroll} className="contacts-list" id="friendsTab" data-friends-list="" style={{overflowY: 'auto', height: '500px'}}>
                        {users && users.length > 0 ? users.map((u, index) => (
                            <li id={`ele${u.id}`} onClick={(e) => showProfile(e, u.id)} key={index} className="contacts-item">
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
                                            <svg className="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd"
                                                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                            <p className="text-muted mb-0">{u.email || ''}</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        )) : (<span className="text-primary">Chưa có bạn bè</span>)}
                        <div id="last-child"></div>
                    </ul>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.userReducer
    }
}

export default connect(mapStateToProps, null)(FriendAside);