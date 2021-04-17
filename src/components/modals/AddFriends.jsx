import React, {useCallback, useState, useEffect} from 'react';
import {useApolloClient} from "@apollo/client";
import {debounce} from "lodash";
import {FIND_USERS} from "../../graphql/users/users.query";
import './AddFriends.css';
import socket from "../../utils/socket";
import {SEND_ADD_FRIEND_REQUEST} from "../../constants";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {hideModal} from "../../actions/modal.action";
import {compose} from "redux";
import {withTranslation} from "react-i18next";

const AddFriends = ({user, show, hideAddFriendModal, t}) => {
    const client = useApolloClient();

    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);

    const delayedQuery = useCallback(debounce(async q => {
        const {data} = await client.query({
            query: FIND_USERS,
            variables: {
                filter: `{"name": "${q}","id": "${user.id}"}`,
                page: currentPage,
                limit: 1
            }
        });
        setUsers(data.getUsers.users.map(m => ({...m})));
        setTotalPage(data.getUsers.totalPage);
        setLoading(false);
    }, 1000), []);

    const handleInput = (e) => {
        setLoading(true);
        setQuery(e.target.value);
        const temp = document.getElementById("username").value;
        if (temp) delayedQuery(temp);
        else {
            setUsers([]);
            setTotalPage(null);
            setCurrentPage(1);
            setLoading(false);
        }
    }

    const scrollToEnd = async ({target: {scrollTop, clientHeight, scrollHeight}}) => {
        if (scrollTop + clientHeight >= scrollHeight) {
            if (currentPage + 1 <= totalPage) {
                setLoading(true);
                const {data} = await client.query({
                    query: FIND_USERS,
                    variables: {
                        filter: `{"name": "${query}","id": "${user.id}"}`,
                        page: currentPage + 1,
                        limit: 1
                    }
                });
                if (data.getUsers.users.length > 0) {
                    setUsers([...new Set([...users, ...data.getUsers.users.map(m => ({...m}))])]);
                    setTotalPage(data.getUsers.totalPage);
                    setCurrentPage(currentPage + 1);
                    setLoading(false);
                }
            }
        }
    }

    const prevent = (e) => {
        if (e.key === 'Enter') e.preventDefault();
    }

    const addFriends = (e, id) => {
        e.preventDefault();
        socket.emit(SEND_ADD_FRIEND_REQUEST, {sender: user, receiver: id});
    }

    return (
        <Modal onHide={hideAddFriendModal} show={show} className="modal-lg-fullscreen">
            <Modal.Header>
                <h5 className="modal-title" id="inviteOthersLabel">{t('modal.addFriend')}</h5>
                <button onClick={hideAddFriendModal} type="button" className="close" data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="username">{t('label.username')}</label>
                            <input onKeyDown={prevent} onChange={handleInput} type="text"
                                   className="form-control form-control-md" id="username"
                                   placeholder="Type user name here" value={query}/>
                        </div>
                    </div>
                    <div className="col-12">
                        {loading && (<span className="text-primary">Loading...</span>)}
                        {users.length > 0 && (<label htmlFor="listFriends">Search result</label>)}
                        <ul onScroll={scrollToEnd} className="contacts-list" id="listFriends" dataCallList=""
                            style={{height: 'auto', overflowY: 'auto'}}>
                            {users.length > 0 && users.map((d, index) => (
                                <li key={index} className="contacts-item incoming">
                                    <div className="contacts-link">
                                        <div className="avatar">
                                            <img
                                                src={d.avatar || 'https://www.vippng.com/png/detail/416-4161690_empty-profile-picture-blank-avatar-image-circle.png'}
                                                alt=""/>
                                        </div>
                                        <div className="contacts-content">
                                            <div className="contacts-info">
                                                <h6 className="chat-name text-truncate">{d.name}</h6>
                                            </div>
                                        </div>
                                        <div className="contacts-action">
                                            <button onClick={(e) => addFriends(e, d.id)}
                                                    className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                                                    type="button">
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1"
                                                     enableBackground="new 0 0 512 512" height="512"
                                                     viewBox="0 0 512 512" width="512">
                                                    <g>
                                                        <path
                                                            d="m511 317c0-57.897-47.103-105-105-105-30.88 0-58.686 13.401-77.916 34.691-11.197-5.725-22.815-10.488-34.724-14.254 35.218-22.367 58.64-61.716 58.64-106.437 0-69.477-56.523-126-126-126s-126 56.523-126 126c0 44.624 23.319 83.901 58.41 106.293-34.163 10.711-65.468 29.567-91.509 55.607-42.497 42.497-65.901 98.999-65.901 159.099v50.001c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15v-50.001c0-11.275-.885-22.645-2.614-33.945 36.844-16.321 62.614-53.232 62.614-96.054zm-381-191c0-52.935 43.065-96 96-96s96 43.065 96 96-43.065 96-96 96-96-43.065-96-96zm291 320.999v35.001h-390v-35.001c0-107.522 87.477-194.999 195-194.999 29.47 0 58.645 6.83 85.229 19.819-6.554 13.693-10.229 29.015-10.229 45.181 0 57.897 47.103 105 105 105 4.488 0 8.911-.284 13.252-.833 1.158 8.616 1.748 17.26 1.748 25.832zm6.7-58.212c-.373.094-.743.193-1.103.314-6.549 1.874-13.454 2.899-20.597 2.899-41.355 0-75-33.645-75-75s33.645-75 75-75 75 33.645 75 75c0 33.811-22.494 62.457-53.3 71.787z"/>
                                                        <path
                                                            d="m436 302h-15v-15c0-8.284-6.716-15-15-15s-15 6.716-15 15v15h-15c-8.284 0-15 6.716-15 15s6.716 15 15 15h15v15c0 8.284 6.716 15 15 15s15-6.716 15-15v-15h15c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/>
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {loading && (<div id="loader"></div>)}
                        </ul>
                        <div id="scroll-end"></div>
                        {query && users.length === 0 && (<span className="text-danger">Not found</span>)}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideAddFriendModal: () => dispatch(hideModal())
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withTranslation("common"))(AddFriends);