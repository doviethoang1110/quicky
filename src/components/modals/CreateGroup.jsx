import React, {useEffect, useState, useCallback} from 'react';
import {Modal} from "react-bootstrap";
import ErrorMessage from "../ErrorMessage";
import {hideModal} from "../../actions/modal.action";
import {compose} from "redux";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import client from "../../plugins/apollo";
import {FIND_LIST_FRIENDS} from "../../graphql/users/users.query";
import config from "../../config";
import {storage} from "../../plugins/firebase";
import axiosService from "../../utils/axiosService";
import {showToast} from "../../plugins/sweetAlert";
import {debounce, uniqBy} from 'lodash';

const CreateGroup = ({hideCreateGroup, show, t, user}) => {

    const {register, handleSubmit, errors, getValues} = useForm({
        defaultValues: {
            groupName: ''
        }
    });
    const [step, setStep] = useState(1);
    const [users, setUsers] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [url, setUrl] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [totalPage, setTotalPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(JSON.stringify({"id": `${user.id}`}));

    const query = async (page = currentPage, filter = `{"id": "${user.id}"}`) => {
        return client.query({
            query: FIND_LIST_FRIENDS,
            variables: {
                filter: `${filter}`,
                page,
                limit: 4
            }
        });
    }

    useEffect(async () => {
        setLoading(true);
        const {data} = await query(currentPage, filter);
        let newArray;
        if (data?.findListFriends?.users && data?.findListFriends?.users?.length > 0) {
            if (currentPage > 1) {
                newArray = [
                    ...users,
                    ...data.findListFriends.users].map(e => ({
                    ...e,
                    status: participants.find(p => p.id === e.id) ? true : false
                }));

            } else {
                newArray = data.findListFriends.users.map(e => ({
                    ...e,
                    status: participants.find(p => p.id === e.id) ? true : false
                }));
            }
            setUsers(newArray);
            if (+data.findListFriends.totalPage !== +totalPage) setTotalPage(data.findListFriends.totalPage);
        } else setUsers([]);
        setLoading(false);
    }, [filter, currentPage]);

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

    const onSubmit = async () => {
        if (step === 2) {
            if (participants.length < 2) {
                document.getElementById("errorMsg").innerText = t('participants.required');
                return;
            }
            const param = {
                name: getValues().groupName,
                image,
                participants: [...participants.map(p => p.id), user.id.toString()],
                type: 'group',
                creatorId: user.id.toString()
            };
            try {
                const response = await axiosService("conversations", "POST", param);
                if (response.data.code === 422) {
                    showToast('error', response.data.message)
                } else setStep(step + 1);
            } catch (e) {
                console.log('error in create conversation', e.message);
                showToast('error', e.message)
            }
        }
        if (step === 1) setStep(step + 1);
    }

    const changeStep = (e, move) => {
        e.preventDefault();
        if (move > 0 && (step === 3 || step < 1)) return;
        setStep(step + move);
    }

    const handleCheckbox = (e, data) => {
        const newArray = [...participants];
        if (e.target.checked) newArray.push(data);
        else newArray.splice(newArray.indexOf(data), 1);
        setParticipants(newArray);
        users[users.indexOf(users.find(p => p.id === data.id))].status = e.target.checked;
        setUsers([...users]);
    }

    const handleUpload = e => {
        e.preventDefault();
        const image = e.target.files[0];
        setImage(image.name);
        const uploadTask = storage.ref(`images/media/group/${image.name}`).put(image);
        uploadTask.on("state_change", snapshot => {
            setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
        }, error => {
            console.log(error)
        }, () => {
            storage.ref("images/media/group")
                .child(image.name)
                .getDownloadURL()
                .then(async url => {
                    setUrl(url);
                })
        });
    }

    const handleScroll = async ({target: {scrollTop, clientHeight, scrollHeight}}) => {
        if (scrollTop + clientHeight >= scrollHeight) {
            if (currentPage + 1 <= totalPage) setCurrentPage(currentPage + 1);
        }
    }

    return (
        <Modal onHide={hideCreateGroup} show={show} className="modal-lg-fullscreen">
            <Modal.Header>
                <h5 className="modal-title js-title-step" id="createGroupLabel">&nbsp;<span
                    className="label label-success">1</span> {t('modal.createGroup')}</h5>
                <button onClick={(e) => hideCreateGroup(e)} type="button" className="close" data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <div className={`row pt-2 ${step === 1 ? '' : 'hide'}`} data-step="1"
                         data-title="Create a New Group">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="groupName">Group name</label>
                                <input type="text" ref={register({required: true, minLength: 10, maxLength: 50})}
                                       className="form-control form-control-md" id="groupName" name="groupName"
                                       placeholder="Type group name here"/>
                                {errors.groupName && <ErrorMessage name="groupName" value={errors.groupName.type}/>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label>Choose profile picture</label>
                                <div className="custom-file">
                                    <input type="file" onChange={(e) => handleUpload(e)}
                                           className="custom-file-input" id="groupImage" accept="image/*"/>
                                    <label className="custom-file-label" htmlFor="groupImage">Choose file</label>
                                    <img src={url} style={{display: url ? '' : 'none'}} id="preview" width="50px"
                                         height="50px"/>
                                    {(progress > 1) && (progress < 100) && (<progress value={progress} max="100"/>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`row pt-2 ${step === 2 ? '' : 'hide'}`} data-step="2"
                         data-title="Add Group Members">
                        <div className="col-12 px-0">
                            <form className="form-inline w-100 px-2 pb-2 border-bottom">
                                <div className="input-group w-100 bg-light">
                                    <input type="text" onChange={(e) => handleChange(e)}
                                           value={search} id="search"
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
                                {participants.length > 0 && participants.map(p => (
                                    <span className="text-primary">{p.name}, </span>
                                ))}
                            </form>
                        </div>
                        <div className="col-12 px-0">
                            <ul onScroll={(e) => handleScroll(e)} style={{overflowY: 'auto', height: '250px'}}
                                className="list-group list-group-flush">
                                {users.length > 0 ? users.map((u, index) => (
                                    <li key={index} className="list-group-item">
                                        <div className="media">
                                            <div className="avatar avatar-online mr-2">
                                                <img src={
                                                    u.avatar && (u.avatar.startsWith("https") ? u.avatar : `${config.FIREBASE_TOP_LINK + u.avatar + config.FIREBASE_BOTTOM_LINK}`) ||
                                                    'https://thumbs.dreamstime.com/b/creative-vector-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mo-118823351.jpg'
                                                } alt=""/>
                                            </div>

                                            <div className="media-body">
                                                <h6 className="text-truncate">
                                                    <a href="# " className="text-reset">{u.name}</a>
                                                </h6>
                                                <p className="text-muted mb-0">Online</p>
                                            </div>
                                            <div className="media-options">
                                                <div className="custom-control custom-checkbox">
                                                    <input onChange={(e) => handleCheckbox(e, {id: u.id, name: u.name})}
                                                           checked={u.status}
                                                           className="custom-control-input" type="checkbox"
                                                           id={`chx-user-${u.id}`}/>
                                                    <label className="custom-control-label"
                                                           htmlFor={`chx-user-${u.id}`}></label>
                                                </div>
                                            </div>
                                        </div>
                                        <label className="media-label" htmlFor={`chx-user-${u.id}`}></label>
                                    </li>
                                )) : (
                                    <span className="text-primary">{t('notfound')}</span>
                                )}
                            </ul>
                            {loading && (<span className="text-primary">Loading...</span>)}
                            <span className="text-danger" id="errorMsg"></span>
                        </div>
                    </div>
                    <div className={`row pt-2 ${step === 3 ? '' : 'hide'}`} data-step="3" data-title="Finished">
                        <div className="col-12">
                            <div className="d-flex justify-content-center align-items-center flex-column h-100">
                                <div className="btn btn-success btn-icon rounded-circle text-light mb-3">
                                    <svg className="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                                <h6>Group Created Successfully</h6>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                {step !== 3 && (
                    <Modal.Footer>
                        <button onClick={(e) => hideCreateGroup(e)} type="button"
                                className="btn btn-link text-muted js-btn-step mr-auto"
                                data-orientation="cancel" data-dismiss="modal">Cancel
                        </button>
                        <button onClick={(e) => changeStep(e, -1)} type="button"
                                className="btn btn-secondary  js-btn-step" data-orientation="previous"
                                data-step="0" disabled={step === 1}>Previous
                        </button>
                        <button type="submit" className="btn btn-primary js-btn-step" data-orientation="next">
                            {step === 2 ? 'Finish' : 'Next'}
                        </button>
                    </Modal.Footer>
                )}
            </form>
        </Modal>
    );
}

const mapStateToProps = state => {
    return {
        user: state.userReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideCreateGroup: () => dispatch(hideModal())
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withTranslation("common"))(CreateGroup);