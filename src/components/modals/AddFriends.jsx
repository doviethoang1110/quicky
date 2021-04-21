import React, {useCallback, useState, useEffect} from 'react';
import {useApolloClient} from "@apollo/client";
import {debounce} from "lodash";
import {FIND_USERS} from "../../graphql/users/users.query";
import './AddFriends.css';
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {hideModal} from "../../actions/modal.action";
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

const AddFriends = ({user, show, hideAddFriendModal, t}) => {
    const history = useHistory();

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

    const goToProfile = (e, id) => {
        e.preventDefault();
        history.push(`/users/${id}`)
    }

    const prevent = (e) => {
        if (e.key === 'Enter') e.preventDefault();
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
                        <ul onScroll={scrollToEnd} className="contacts-list" id="listFriends"
                            style={{height: 'auto', overflowY: 'auto'}}>
                            {users.length > 0 && users.map((d, index) => (
                                <li onClick={(e) => goToProfile(e, d.id)} key={index}
                                    className="contacts-item incoming">
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
                                            <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                                                    type="button">
                                                <span style={{height: '512px', width: '512px'}}></span>
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