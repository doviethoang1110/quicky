import React, {useEffect, useState, useCallback} from 'react';
import SideBarHeader from "../SideBarHeader";
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import client from "../../plugins/apollo";
import {FIND_CONVERSATIONS} from "../../graphql/conversations/conversations.query";
import config from "../../config";
import socket from "../../utils/socket";
import {GET_CONVERSATION, GET_NEW_CHAT, RECEIVE_MESSAGE_ASIDE, SEND_NEW_CONVERSATION} from "../../constants";
import {debounce} from 'lodash';
import {formatMessageDatetime} from "../../utils/helpers";

const MessageAside = ({t, user}) => {

    const array = ['all', 'friend', 'group', 'unread'];

    const [search, setSearch] = useState("");
    const [totalPage, setTotalPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [conversations, setConversations] = useState([]);
    const [filter, setFilter] = useState(JSON.stringify({usersId: user.id}));
    const [loading, setLoading] = useState(false);
    const [label, setLabel] = useState(array[0]);
    const [flag, setFlag] = useState(true);

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

    const handleSocket = data => {
        for (let i = 0; i < document.getElementsByClassName("contacts-item").length; i++) {
            document.getElementsByClassName("contacts-item")[i].classList.remove("active")
        }
        const found = conversations.find(c => c.id === data.id);
        if (found && found.id === null) {
            conversations[conversations.indexOf(found)] = data;
            setConversations([...conversations]);
            socket.emit(GET_NEW_CHAT, data);
        } else {
            if (data.id) {
                document.getElementById(`conversation${data.id}`).classList.add("active");
                socket.emit(GET_CONVERSATION, data.id);
            } else {
                setConversations([data, ...conversations]);
                socket.emit(GET_NEW_CHAT, data);
            }
        }
    };

    const handleReceiveMessage = data => {
        let i = 0;
        const found = conversations.find((c, index) => {
            i = index;
            return +c.id === +data.conversationsId;
        });
        const cloneArray = [...conversations];
        const clone = {...found};
        clone.updatedAt = new Date();
        clone.lastMessage = {
            message: data.message,
            users: {id: data.usersId, name: data.name}
        }
        for (let i = 0; i < document.getElementsByClassName("contacts-item").length; i++) {
            document.getElementsByClassName("contacts-item")[i].classList.remove("active")
        }
        cloneArray[0] = clone;
        if (found && i !== 0) cloneArray[i] = conversations[0];
        setConversations([...cloneArray]);
    }

    useEffect(() => {
        if (conversations.length > 0) {
            document.getElementById(`conversation${conversations[0].id}`).classList.add("active")
            if (flag) {
                socket.emit(GET_CONVERSATION, conversations[0].id);
                setFlag(false);
            }
        }
        socket.on(SEND_NEW_CONVERSATION, handleSocket);
        socket.on(RECEIVE_MESSAGE_ASIDE, handleReceiveMessage);
        return () => {
            socket.off(SEND_NEW_CONVERSATION, handleSocket);
            socket.off(RECEIVE_MESSAGE_ASIDE, handleReceiveMessage);
        }
    }, [conversations]);

    const showConversation = (e, id) => {
        e.preventDefault();
        for (let i = 0; i < document.getElementsByClassName("contacts-item").length; i++) {
            document.getElementsByClassName("contacts-item")[i].classList.remove("active")
        }
        const found = conversations.find(c => c.id === null);
        if (found) setConversations([...conversations.filter((c => c.id !== null))])
        else document.getElementById(`conversation${id}`).classList.add("active");
        socket.emit(GET_CONVERSATION, id);
    }

    const delayedQuery = useCallback(debounce(async (filter, q) => {
        const newFilter = (typeof filter === 'string') ? JSON.parse(filter) : filter;
        if (q) newFilter.name = q.toString();
        else delete newFilter.name;
        setFilter(`${JSON.stringify(newFilter)}`);
        setCurrentPage(1);
    }, 1000), []);

    const handleChange = async (e) => {
        setSearch(e.target.value);
        delayedQuery(filter, document.getElementById("search").value);
    }

    const handleFilter = async (e, value) => {
        const newFilter = (typeof filter === 'string') ? JSON.parse(filter) : filter;
        if (value !== 0) {
            newFilter.type = value.toString();
            setFilter(`${JSON.stringify(newFilter)}`);
        } else {
            delete newFilter.type;
            setFilter(JSON.stringify(newFilter));
        }
        setLabel(value);
    }

    useEffect(async () => {
        setLoading(true);
        const {data} = await query(currentPage, filter);
        if (data?.findConversations?.conversations && data?.findConversations?.conversations?.length > 0) {
            setConversations(data.findConversations.conversations);
            setTotalPage(data.findConversations.totalPage);
        } else setConversations([]);
        setLoading(false);
    }, [filter, currentPage]);

    const handleScroll = async ({target: {scrollTop, clientHeight, scrollHeight}}) => {
        if (scrollTop + clientHeight >= scrollHeight) {
            if (currentPage + 1 <= totalPage) setCurrentPage(currentPage + 1);
        }
    }

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
                                {t(`filter.${label}`)}
                            </button>
                            <div className="dropdown-menu">
                                {array.length > 0 && array.map((a, index) => (
                                    <button key={index} onClick={(e) => handleFilter(e, a)}
                                            className="dropdown-item">{t(`filter.${a}`)}</button>
                                ))}
                            </div>
                        </div>
                        <form className="form-inline">
                            <div className="input-group">
                                <input type="text" id="search"
                                       onChange={(e) => handleChange(e)}
                                       value={search}
                                       className="form-control search border-right-0 transparent-bg pr-0"
                                       placeholder="Search chats"/>
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
                    <ul className="contacts-list" style={{overflowY: 'auto', height: 'auto'}}
                        id="chatContactTab" data-chat-list="" onScroll={handleScroll}>
                        {loading && <span className="text-primary">Loading...</span>}
                        {conversations.length > 0 ? conversations.map((c, index) => (
                            <li onClick={(e) => showConversation(e, c.id)} key={index} id={`conversation${c.id}`}
                                className={`contacts-item friends`}>
                                <a className="contacts-link" href="javascript:;">
                                    <div className="avatar avatar-online">
                                        <img src={
                                            c.avatar ? `${config.FIREBASE_TOP_LINK + "avatar%2F" + c.avatar + config.FIREBASE_BOTTOM_LINK}` :
                                            (c.type === 'single' ?
                                                (
                                                    c.participants.find(p => +p.id !== +user.id).avatar
                                                        ? (c.participants.find(p => +p.id !== +user.id).avatar?.startsWith("https")
                                                        ? c.participants.find(p => +p.id !== +user.id).avatar
                                                        : `${config.FIREBASE_TOP_LINK + "avatar%2F" + c.participants.find(p => +p.id !== +user.id).avatar + config.FIREBASE_BOTTOM_LINK}`)
                                                        : 'https://thumbs.dreamstime.com/b/creative-vector-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mo-118823351.jpg'
                                                ) :
                                                c.image && `${config.FIREBASE_TOP_LINK + "avatar%2F" + c.image + config.FIREBASE_BOTTOM_LINK}`)
                                        } alt=""/>
                                    </div>
                                    <div className="contacts-content">
                                        <div className="contacts-info">
                                            <h6 className="chat-name text-truncate">{
                                                c.type === 'single'
                                                    ? (c.participants.find(p => +p.id !== +user.id).name || c.name)
                                                    : c.name
                                            }</h6>
                                            <div
                                                className="chat-time">{formatMessageDatetime(c.updatedAt, t('justNow'), t('minuteAgo'), t('yesterday'))}</div>
                                        </div>
                                        <div className="contacts-texts">
                                            <p className="text-truncate">
                                                {
                                                    c?.lastMessage?.users
                                                        ? (
                                                            (c?.lastMessage?.users?.name !== user.name
                                                                    ? (c.type === 'single' ? "" : c?.lastMessage?.users?.name && `${c?.lastMessage?.users?.name + ": "}`)
                                                                    : 'You: '
                                                            ) + `${(c?.lastMessage?.message || '')}`
                                                        )
                                                        : ''
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        )) : (
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