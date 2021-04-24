import React, {useState, useEffect, useCallback} from 'react';
import {Modal} from "react-bootstrap";
import {hideModal} from "../../actions/modal.action";
import {connect} from "react-redux";
import client from "../../plugins/apollo";
import {FIND_LIST_FRIENDS} from "../../graphql/users/users.query";
import {debounce} from 'lodash';
import {withTranslation} from "react-i18next";
import {compose} from "redux";
import config from "../../config";

const NewChat = ({hideNewChatModal, show, user, t}) => {

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
                limit: 5
            }
        });
    }

    const handleScroll = async ({target: {scrollTop, clientHeight, scrollHeight}}) => {
        if (scrollTop + clientHeight >= scrollHeight) {
            if (currentPage + 1 <= totalPage) setCurrentPage(currentPage + 1);
        }
    }

    const handleChange = async (e) => {
        setLoading(true);
        setSearch(e.target.value);
        if (e.target.value) delayedQuery(e.target.value);
        else {
            setFilter(JSON.stringify({"id": `${user.id}`}));
            setLoading(false);
        }
        setCurrentPage(1);
    }

    const delayedQuery = useCallback(debounce(async q => {
        const newFilter = (typeof filter === 'string') ? JSON.parse(filter) : filter;
        newFilter.name = q.toString();
        setFilter(`${JSON.stringify(newFilter)}`);
        setLoading(false);
    }, 1000), []);

    useEffect(async () => {
        setLoading(true);
        const {data} = await query(currentPage, filter);
        let newArray;
        console.log(filter)
        if (data?.findListFriends?.users && data?.findListFriends?.users?.length > 0) {
            if (currentPage > 1) newArray = [...users, ...data.findListFriends.users];
            else newArray = data.findListFriends.users;
            setUsers(newArray);
            if (+data.findListFriends.totalPage !== +totalPage) setTotalPage(data.findListFriends.totalPage);
        } else setUsers([]);
        setLoading(false);
    }, [currentPage, filter]);

    return (
        <React.Fragment>
            <Modal onHide={hideNewChatModal} show={show} className="modal-lg-fullscreen">
                <Modal.Header>
                    <h5 className="modal-title" id="startConversationLabel">New Chat</h5>
                    <button onClick={hideNewChatModal} type="button" className="close" data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-12">
                            <form className="form-inline w-100 p-2 border-bottom">
                                <div className="input-group w-100 bg-light">
                                    <input type="text" id="search"
                                           value={search}
                                           onChange={(e) => handleChange(e)}
                                           className="form-control form-control-md search border-right-0 transparent-bg pr-0"
                                           placeholder="Search"/>
                                    <div className="input-group-append">
                                        <div className="input-group-text transparent-bg border-left-0" role="button">

                                            <svg className="hw-20" fill="none" viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-12">
                            <ul className="list-group list-group-flush"
                                onScroll={handleScroll}
                                style={{overflowY: 'auto', height: '350px'}}>
                                {loading && (<span className="text-primary">Loading...</span>)}
                                {users.length > 0 ? users.map((u, index) => (
                                    <li key={index} className="list-group-item">
                                        <div className="media">
                                            <div className="avatar avatar-online mr-2">
                                                <img src={
                                                    u.avatar && (u.avatar.startsWith("https") ? u.avatar : `${config.FIREBASE_TOP_LINK + "avatar%2F" + u.avatar + config.FIREBASE_BOTTOM_LINK}`) ||
                                                    'https://thumbs.dreamstime.com/b/creative-vector-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mo-118823351.jpg'
                                                } alt=""/>
                                            </div>
                                            <div className="media-body">
                                                <h6 className="text-truncate">
                                                    <a href="# " className="text-reset">{u.name}</a>
                                                </h6>
                                                <p className="text-muted mb-0">Online</p>
                                            </div>
                                        </div>
                                    </li>
                                )) : (
                                    <span className="text-primary">{t('notfound')}</span>
                                )}
                            </ul>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        user: state.userReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideNewChatModal: () => dispatch(hideModal())
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withTranslation('common'))(NewChat);