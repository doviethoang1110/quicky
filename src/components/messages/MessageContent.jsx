import React, {useEffect, useState} from 'react';
import socket from "../../utils/socket";
import {
    CLEAR_TYPING,
    GET_CONVERSATION_SUCCESS, RECEIVE_CLEAR_TYPING,
    RECEIVE_MESSAGE,
    SEND_MESSAGE,
    TYPING,
    TYPING_MESSAGE
} from "../../constants";
import config from "../../config";
import {formatMessageDatetime} from "../../utils/helpers";
import {withTranslation} from "react-i18next";
import ChatInfo from "./ChatInfo";
import {compose} from "redux";
import {connect} from "react-redux";
import './Loading.css';
import client from "../../plugins/apollo";
import {FIND_MESSAGES} from "../../graphql/messages/message.query";
import {Editor} from "@tinymce/tinymce-react";
import Typing from "../typing/Typing";

const MessageContent = ({t, user}) => {

    const body = document.querySelector("body");
    body.classList.remove(`${body.classList[0]}`);
    body.classList.add("chats-tab-open");

    const [conversation, setConversation] = useState({
        id: null,
        name: '',
        type: '',
        image: '',
        participants: []
    });
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [message, setMessage] = useState("");
    const [typings, setTypings] = useState([]);

    const query = async (page = currentPage) => {
        return await client.query({
            query: FIND_MESSAGES,
            variables: {
                conversationsId: conversation.id,
                page,
                limit: 10,
                attributes: 'id,type,message,createdAt'
            }
        })
    }

    useEffect(async () => {
        if (conversation.id && currentPage > 1) {
            setLoading(true);
            const {data} = await query(currentPage);
            if (data.findMessages && data.findMessages.messages.length > 0) {
                setMessages([...data.findMessages.messages.map(m => ({
                    ...m,
                    createdAt: formatMessageDatetime(m.createdAt, t('justNow'), t('minuteAgo'), t('yesterday'))
                })), ...messages]);
            }
            setTotalPage(data.findMessages.totalPage);
            setLoading(false);
        }
        setTypings([]);
    }, [currentPage, conversation]);

    useEffect(() => {
        if (conversation.participants.length > 0) {
            socket.on(RECEIVE_MESSAGE, handleReceiveMessage);
            return () => {
                socket.off(RECEIVE_MESSAGE, handleReceiveMessage);
            }
        }
    }, [conversation.participants.length])

    const scrollToBottom = () => {
        document.querySelector(".chat-finished").scrollIntoView({
            block: 'end',
            behavior: 'auto'
        });
    }

    const handleSocket = data => {
        if (data) {
            const {id, name, type, image, participants, messages} = data;
            if (messages?.length > 0) {
                setMessages(messages.map(m => ({
                    ...m,
                    createdAt: formatMessageDatetime(m.createdAt, t('justNow'), t('minuteAgo'), t('yesterday'))
                })).reverse())
            } else setMessages([]);
            setConversation({id, name, type, image, participants});
            scrollToBottom();
        }
    }

    const handleReceiveMessage = data => {
        const found = data.type === 'single'
            ? data.participants.find(p => p.usersId === data.message.usersId)
            : conversation.participants.find(p => p.usersId === data.usersId);
        if (found) {
            const newMsg = {
                type: 'text',
                message: data.type === 'single' ? data.message.message : data.message,
                users: {id: found.usersId, name: found.users.name},
                image: found.users.avatar,
                createdAt: formatMessageDatetime(new Date(), t('justNow'), t('minuteAgo'), t('yesterday'))
            }
            setMessages(messages => [...messages, newMsg]);
            scrollToBottom();
        }
    }

    const handleTypingMessage = data => {
        if (!typings.find(t => t.name === data.name)) {
            setTypings([...typings, data]);
            scrollToBottom();
        }
    }

    const handleClearTyping = data => {
        typings.splice(typings.find(t => t.name === data.name), 1);
        setTypings([...typings]);
    }

    useEffect(() => {
        socket.on(TYPING_MESSAGE, handleTypingMessage);
        socket.on(RECEIVE_CLEAR_TYPING, handleClearTyping);
        return () => {
            socket.off(TYPING_MESSAGE, handleTypingMessage);
            socket.off(RECEIVE_CLEAR_TYPING, handleClearTyping);
        }
    }, [typings]);

    useEffect(() => {
        socket.on(GET_CONVERSATION_SUCCESS, handleSocket);
        return () => {
            socket.off(GET_CONVERSATION_SUCCESS, handleSocket);
        }
    }, []);

    const handleScroll = async ({target: {scrollTop}}) => {
        if (scrollTop === 0) {
            if (currentPage + 1 === 2 || currentPage + 1 <= totalPage) setCurrentPage(currentPage + 1);
        }
    }

    const handleEditorChange = (content) => {
        setMessage(content);
    }

    const handleMessage = (message) => {
        if (message) {
            let request;
            message = message.replace('<p>', '');
            message = message.replace('</p>', '');
            if (conversation.id) {
                request = {
                    conversationsId: conversation.id,
                    message,
                    usersId: user.id,
                    name: user.name,
                    type: conversation.type,
                }
            } else {
                request = {
                    message, usersId: user.id,
                    name: user.name,
                    participants: conversation.participants, conversationsId: conversation.id
                }
            }
            socket.emit(SEND_MESSAGE, request);
            setMessage("");
        }
    }

    const sendMessage = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleMessage(message);
        }
        if (e._reactName === 'onClick') {
            handleMessage(message);
        }
    }

    const typing = () => {
        let data;
        if (conversation.type === 'group')
            data = {
                conversationsId: conversation.id, name: user.name, avatar: user.avatar, type: conversation.type
            }
        else data = {
            conversationId: conversation.id, type: conversation.type
        }
        socket.emit(TYPING, data);
    }

    const clearTyping = () => {
        socket.emit(CLEAR_TYPING, {
            conversationsId: conversation.id,
            name: user.name
        });
    }

    return (
        <div className="chats">
            <div className="chat-body">
                <div className="chat-header">
                    <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted d-xl-none"
                            type="button"
                            data-close="">

                        <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                    </button>
                    <div className="media chat-name align-items-center text-truncate">
                        <div className="avatar avatar-online d-none d-sm-inline-block mr-3">
                            <img src={
                                conversation.type === 'single' ?
                                    (conversation.participants.length > 0
                                        && conversation.participants.find(p => user.id !== p.usersId).users.avatar
                                            ? (
                                                conversation.participants.find(p => user.id !== p.usersId).users.avatar.startsWith("https")
                                                    ? conversation.participants.find(p => user.id !== p.usersId).users.avatar
                                                    : `${config.FIREBASE_TOP_LINK + "avatar%2F" +
                                                    conversation.participants.find(p => user.id !== p.usersId).users.avatar +
                                                    config.FIREBASE_BOTTOM_LINK}`
                                            )
                                            : 'https://thumbs.dreamstime.com/b/creative-vector-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mo-118823351.jpg'
                                    )
                                    :
                                    conversation.image && `${config.FIREBASE_TOP_LINK + "group%2F" + conversation.image + config.FIREBASE_BOTTOM_LINK}`
                            } alt=""/>
                        </div>

                        <div className="media-body align-self-center ">
                            <h6 className="text-truncate mb-0">{
                                conversation.type === 'single' ?
                                    (conversation.participants.length > 0
                                        && conversation.participants.find(p => user.id !== p.usersId).users.name)
                                    : conversation.name
                            }</h6>
                            <small className="text-muted">Online</small>
                        </div>
                    </div>
                    <ul className="nav flex-nowrap">
                        <li className="nav-item list-inline-item d-none d-sm-block mr-1">
                            <a className="nav-link text-muted px-1" data-toggle="collapse"
                               data-target="#searchCollapse"
                               href="# " aria-expanded="false">

                                <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </a>
                        </li>

                        <li className="nav-item list-inline-item d-none d-sm-block mr-1">
                            <a className="nav-link text-muted px-1" href="# " title="Add People">

                                <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                            </a>
                        </li>
                        <li className="nav-item list-inline-item d-none d-sm-block mr-0">
                            <div className="dropdown">
                                <a className="nav-link text-muted px-1" href="# " role="button" title="Details"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                                    </svg>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item align-items-center d-flex" href="# "
                                       data-chat-info-toggle="">

                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <span>View Info</span>
                                    </a>

                                    <a className="dropdown-item align-items-center d-flex" href="# ">

                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                                  clipRule="evenodd"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
                                        </svg>
                                        <span>Mute Notifications</span>
                                    </a>
                                    <a className="dropdown-item align-items-center d-flex" href="# ">

                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                        <span>Wallpaper</span>
                                    </a>
                                    <a className="dropdown-item align-items-center d-flex" href="# ">

                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                                        </svg>
                                        <span>Archive</span>
                                    </a>
                                    <a className="dropdown-item align-items-center d-flex" href="# ">

                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                        </svg>
                                        <span>Delete</span>
                                    </a>
                                    <a className="dropdown-item align-items-center d-flex text-danger" href="# ">

                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                                        </svg>
                                        <span>Block</span>
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item list-inline-item d-sm-none mr-0">
                            <div className="dropdown">
                                <a className="nav-link text-muted px-1" href="# " role="button" title="Details"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                    <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                                    </svg>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item align-items-center d-flex" href="# ">

                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>
                                        <span>Call</span>
                                    </a>
                                    <a className="dropdown-item align-items-center d-flex" href="# "
                                       data-toggle="collapse"
                                       data-target="#searchCollapse" aria-expanded="false">

                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                        </svg>
                                        <span>Search</span>
                                    </a>
                                    <a className="dropdown-item align-items-center d-flex" href="# "
                                       data-chat-info-toggle="">

                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <span>View Info</span>
                                    </a>
                                    <a className="dropdown-item align-items-center d-flex" href="# ">
                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                                  clipRule="evenodd"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
                                        </svg>
                                        <span>Mute Notifications</span>
                                    </a>
                                    <a className="dropdown-item align-items-center d-flex" href="# ">

                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                        <span>Wallpaper</span>
                                    </a>
                                    <a className="dropdown-item align-items-center d-flex" href="# ">

                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                                        </svg>
                                        <span>Archive</span>
                                    </a>
                                    <a className="dropdown-item align-items-center d-flex" href="# ">

                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                        </svg>
                                        <span>Delete</span>
                                    </a>
                                    <a className="dropdown-item align-items-center d-flex text-danger" href="# ">

                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                                        </svg>
                                        <span>Block</span>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="collapse border-bottom px-3" id="searchCollapse">
                    <div className="container-xl py-2 px-0 px-md-3">
                        <div className="input-group bg-light ">
                            <input type="text"
                                   className="form-control form-control-md border-right-0 transparent-bg pr-0"
                                   placeholder="Search"/>
                            <div className="input-group-append">
                                    <span className="input-group-text transparent-bg border-left-0">

                                      <svg className="hw-20 text-muted" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                        </svg>
                                    </span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="chat-content p-2" id="messageBody">
                    <div className="container" style={{paddingRight: '0px'}}>
                        <div className="message-day" onScroll={handleScroll}
                             style={{overflowY: 'auto', height: '565px'}}>
                            {loading && <div className="loadingMessage"></div>}
                            {messages.length > 0 ? messages.map((m, index) => (
                                <div key={index} className={`message ${user.id === m.users.id ? 'self' : ''}`}>
                                    {user.id !== m.users.id && (
                                        <span style={{marginLeft: '30px'}}>{m.users.name}</span>)}
                                    <div className="message-wrapper">
                                        <div className="message-content">
                                            <span>{m.message}</span>
                                        </div>
                                    </div>
                                    <div className="message-options">
                                        <div className="avatar avatar-sm"><img src={
                                            m.image && (m.image.startsWith("https") ? m.image : `${config.FIREBASE_TOP_LINK + "avatar%2F" + m.image + config.FIREBASE_BOTTOM_LINK}`) ||
                                            'https://thumbs.dreamstime.com/b/creative-vector-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mo-118823351.jpg'
                                        }/>
                                        </div>
                                        <span className="message-date">{m.createdAt}</span>
                                        <div className="dropdown">
                                            <a className="text-muted" href="# " data-toggle="dropdown"
                                               aria-haspopup="true"
                                               aria-expanded="false">
                                                <svg className="hw-18" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                                                </svg>
                                            </a>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item d-flex align-items-center" href="# ">
                                                    <svg className="hw-18 mr-2" fill="none" viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                                    </svg>
                                                    <span>Copy</span>
                                                </a>
                                                <a className="dropdown-item d-flex align-items-center" href="# ">

                                                    <svg className="hw-18 mr-2" fill="none" viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                                                    </svg>
                                                    <span>Replay</span>
                                                </a>
                                                <a className="dropdown-item d-flex align-items-center" href="# ">
                                                    <svg className="hw-18 rotate-y mr-2" fill="none"
                                                         viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                                                    </svg>
                                                    <span>Forward</span>
                                                </a>
                                                <a className="dropdown-item d-flex align-items-center" href="# ">

                                                    <svg className="hw-18 mr-2" fill="none" viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                                                    </svg>
                                                    <span>Favourite</span>
                                                </a>
                                                <a className="dropdown-item d-flex align-items-center text-danger"
                                                   href="# ">

                                                    <svg className="hw-18 mr-2" fill="none" viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                    </svg>
                                                    <span>Delete</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <span className="text-primary">{t('newChat')}</span>
                            )}
                            {typings.length > 0 && typings.map((m, index) => (
                                <div key={index} className={`message`}>
                                    {conversation.type === 'group' && (
                                        <span style={{marginLeft: '30px'}}>{m.name}</span>)}
                                    <div className="message-wrapper">
                                        <div className="message-content">
                                            <Typing/>
                                        </div>
                                    </div>
                                    <div className="message-options">
                                        <div className="avatar avatar-sm"><img src={
                                            m.image && (m.image.startsWith("https") ? m.image : `${config.FIREBASE_TOP_LINK + "avatar%2F" + m.image + config.FIREBASE_BOTTOM_LINK}`) ||
                                            'https://thumbs.dreamstime.com/b/creative-vector-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mo-118823351.jpg'
                                        }/></div>
                                    </div>
                                </div>
                            ))}
                            <div className="chat-finished" id="chat-finished"></div>
                        </div>
                    </div>
                </div>
                <div className="chat-footer">
                    <div className="attachment">
                        <div className="dropdown">
                            <button className="btn btn-secondary btn-icon btn-minimal btn-sm" type="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>

                            </button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="# ">
                                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                    <span>Gallery</span>
                                </a>
                                <a className="dropdown-item" href="# ">
                                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                                    </svg>

                                    <span>Audio</span>
                                </a>
                                <a className="dropdown-item" href="# ">
                                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                    </svg>

                                    <span>Document</span>
                                </a>
                                <a className="dropdown-item" href="# ">
                                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>

                                    <span>Contact</span>
                                </a>
                                <a className="dropdown-item" href="# ">
                                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    <span>Location</span>
                                </a>
                                <a className="dropdown-item" href="# ">
                                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                    <span>Poll</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <Editor
                        apiKey={config.TINY_MCE_KEY}
                        value={`${message}`}
                        onKeyDown={(e) => sendMessage(e)}
                        onFocus={typing}
                        onBlur={clearTyping}
                        init={{
                            height: '108px',
                            content_style: "p {margin-left: 0px;padding-left: 40px;padding-right: 40px}",
                            plugins: "emoticons",
                            toolbar: `undo redo | emoticons`,
                            toolbar_location: "bottom",
                            menubar: false,
                            statusbar: false,
                            branding: false,
                        }}
                        onEditorChange={(e) => handleEditorChange(e)}
                    />
                    <div style={{marginRight: '10px'}} onClick={(e) => sendMessage(e)}
                         className="btn btn-primary btn-icon send-icon rounded-circle text-light mb-1"
                         role="button">
                        <svg className="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>

                    </div>
                </div>
            </div>
            <ChatInfo/>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.userReducer
    }
}

export default compose(withTranslation("common"), connect(mapStateToProps, null))(MessageContent);