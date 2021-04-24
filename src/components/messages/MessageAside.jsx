import React, {useEffect, useState} from 'react';
import SideBarHeader from "../SideBarHeader";
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import client from "../../plugins/apollo";
import {FIND_CONVERSATIONS} from "../../graphql/conversations/conversations.query";
import config from "../../config";
import socket from "../../utils/socket";
import {GET_CONVERSATION} from "../../constants";

const MessageAside = ({user, t}) => {

    const [search, setSearch] = useState("");
    const [totalPage, setTotalPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [conversations, setConversations] = useState([]);
    const [filter, setFilter] = useState(JSON.stringify({}));
    const [loading, setLoading] = useState(false);

    const query = async (page = currentPage, filter = `{}`) => {
        return await client.query({
            query: FIND_CONVERSATIONS,
            variables: {
                filter,
                page,
                limit: 6,
                attributes: 'id,name,image,type'
            }
        });
    }

    const showConversation = (e, id) => {
        e.preventDefault();
        for (let i = 0; i < document.getElementsByClassName("contacts-item").length; i++) {
            document.getElementsByClassName("contacts-item")[i].classList.remove("active")
        }
        document.getElementById(`conversation${id}`).classList.add("active");
        socket.emit(GET_CONVERSATION, id);
    }

    useEffect(async () => {
        setLoading(true);
        const {data} = await query();
        if (data?.findConversations?.conversations && data?.findConversations?.conversations?.length > 0) {
            setConversations(data.findConversations.conversations);
        } else setConversations([]);
        setLoading(false);
    }, [filter, currentPage]);

    return (
        <div className="tab-pane active" id="chats-content">
            <div className="d-flex flex-column h-100">
                <div className="hide-scrollbar h-100" id="chatContactsList">
                    <SideBarHeader title="title.chat"/>
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
                                <input type="text" id="search"
                                       className="form-control search border-right-0 transparent-bg pr-0"
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
                    <ul className="contacts-list" id="chatContactTab" data-chat-list="">
                        {conversations.length > 0 ? conversations.map((c, index) => (
                            <li onClick={(e) => showConversation(e, c.id)} key={index} id={`conversation${c.id}`} className={`contacts-item friends ${index === 0 && 'active'}`}>
                                <a className="contacts-link" href="javascript:;">
                                    <div className="avatar avatar-online">
                                        <img src={
                                            c.image && (c.image.startsWith("https") ? c.image : `${config.FIREBASE_TOP_LINK+"group%2F" + c.image + config.FIREBASE_BOTTOM_LINK}`) ||
                                            'https://thumbs.dreamstime.com/b/creative-vector-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mo-118823351.jpg'
                                        } alt=""/>
                                    </div>
                                    <div className="contacts-content">
                                        <div className="contacts-info">
                                            <h6 className="chat-name text-truncate">{c.name}</h6>
                                            <div className="chat-time">Just now</div>
                                        </div>
                                        <div className="contacts-texts">
                                            <p className="text-truncate">{c.lastMessage.message || ''}</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        )): (
                            <span className="text-primary">{t('notfound')}</span>
                        )}
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

export default compose(withTranslation("common"), connect(mapStateToProps, null))(MessageAside);