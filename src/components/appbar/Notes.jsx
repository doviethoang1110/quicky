import React, {useEffect, useState, useCallback} from 'react';
import AppBarHeader from "./AppBarHeader";
import {showModal} from "../../actions/modal.action";
import {connect} from "react-redux";
import axiosService from "../../utils/axiosService";
import {formatDateTime} from "../../utils/helpers";
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import {debounce} from 'lodash';
import client from "../../plugins/apollo";
import {FIND_NOTES} from "../../graphql/notes/notes.query";
import {showToast} from "../../plugins/sweetAlert";

const Notes = ({title, openAddNoteModal, t}) => {

    const [notes, setNotes] = useState([]);
    const [tag, setTag] = useState(0);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState(JSON.stringify({}));

    const tags = [1, 2, 3, 4];

    const handleInput = async (e) => {
        e.preventDefault();
        delayedQuery(filter, e.target.value);
        setSearch(e.target.value)
    }

    const handleUpdateTag = async (e, id, data) => {
        e.preventDefault();
        try {
            const found = notes.find(n => n.id === id);
            if (found && found.tag !== data.tag) {
                const res = await axiosService(`notes/update-tag/${id}`, "PATCH", data);
                const temp = res.data.result;
                found.tag = temp.tag;
                notes[notes.indexOf(found)] = found;
                setNotes([...notes]);
            }
        } catch (e) {
            console.log('error update tag', e);
        }
    }

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axiosService(`notes/${id}`, "DELETE");
            notes.splice(notes.indexOf(notes.find(n => n.id === id)), 1);
            setNotes([...notes]);
            showToast("success", response.data.message);
        } catch (e) {
            console.log('error delete note', e);
            showToast("error", e.message);
        }
    }

    const delayedQuery = useCallback(debounce(async (filter, q) => {
        const newFilter = (typeof filter === 'string') ? JSON.parse(filter) : filter;
        if (q !== "") {
            newFilter.title = q.toString();
            setFilter(`${JSON.stringify(newFilter)}`);
        } else {
            delete newFilter.title;
            setFilter(JSON.stringify(newFilter));
        }
    }, 1000), []);

    const handleFilter = async (e, value) => {
        const newFilter = (typeof filter === 'string') ? JSON.parse(filter) : filter;
        if (value !== 0) {
            newFilter.tag = value.toString();
            setFilter(`${JSON.stringify(newFilter)}`);
        } else {
            delete newFilter.tag;
            setFilter(JSON.stringify(newFilter));
        }
        setTag(value);
    }

    useEffect(async () => {
        const {data} = await client.query({
            query: FIND_NOTES,
            variables: {
                filter: filter,
                sort: '["id": "DESC"]',
                attributes: 'id,title,details,tag,date'
            }
        });
        setNotes(data.getNotes.map(m => ({...m})));
    }, [filter]);

    return (
        <div className="tab-pane h-100 active" id="notes" role="tabpanel" aria-labelledby="notes-tab">
            <div className="appnavbar-content-wrapper">
                <div className="appnavbar-scrollable-wrapper">
                    <AppBarHeader title={title}/>

                    <div className="appnavbar-body">
                        <div className="appnavbar-body-title">
                            <div className="dropdown mr-2">
                                <button className="btn btn-outline-default dropdown-toggle" type="button"
                                        data-notes-filter-list="" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">{t(`tag.${tag}`)}
                                </button>
                                <div className="dropdown-menu">
                                    {/*<a className="dropdown-item" data-notes-filter="" data-select="all-chats" href="# ">{t(`tag.${tag}`)}</a>*/}
                                    <button onClick={(e) => handleFilter(e, 0)}
                                            className="dropdown-item">{t('tag.0')}</button>
                                    {tags.length > 0 && tags.map((i, index) => (
                                        <button onClick={(e) => handleFilter(e, i)}
                                                key={index} className="dropdown-item">{t(`tag.${i}`)}</button>
                                    ))}
                                </div>
                            </div>
                            <form className="form-inline">
                                <div className="input-group">
                                    <input type="text"
                                           onChange={(e) => handleInput(e)}
                                           value={search}
                                           className="form-control search border-right-0 transparent-bg pr-0"
                                           placeholder="Search notes"/>
                                    <div className="input-group-append">
                                        <div className="input-group-text transparent-bg border-left-0" role="button">

                                            <svg className="text-muted hw-20" fill="none" viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="note-container">
                            {notes.length > 0 && notes.map(n => (
                                <div key={n.id} className="note">
                                    <div className="note-body">
                                        <div className="note-added-on">{formatDateTime(n.date)}</div>
                                        <h5 className="note-title">{n.title}</h5>
                                        <p className="note-description">{n.details}</p>
                                    </div>
                                    <div className="note-footer">
                                        <div className="note-tools">
                                            {+n.tag === 1 && (<span className="badge badge-info">{t('tag.1')}</span>)}
                                            {+n.tag === 2 && (
                                                <span className="badge badge-primary">{t('tag.2')}</span>)}
                                            {+n.tag === 3 && (
                                                <span className="badge badge-success">{t('tag.3')}</span>)}
                                            {+n.tag === 4 && (<span className="badge badge-danger">{t('tag.4')}</span>)}
                                        </div>
                                        <div className="note-tools">
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                                                    type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <svg className="hw-20" xmlns="http://www.w3.org/2000/svg"
                                                         height="24"
                                                         width="24"
                                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                                                    </svg>
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    {tags.length > 0 && tags.map((i, index) => (
                                                        <button onClick={(e) => handleUpdateTag(e, n.id, {tag: i})}
                                                                key={index}
                                                                className="dropdown-item">{t(`tag.${i}`)}</button>
                                                    ))}
                                                    <div className="dropdown-divider"></div>
                                                    <button onClick={(e) => handleDelete(e, n.id)} className="dropdown-item text-danger">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="appnavbar-footer">
                        <div className="btn btn-primary btn-block" role="button"
                             onClick={(e) => openAddNoteModal()}
                        >Add new note
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        openAddNoteModal: () => dispatch(showModal({show: true, name: 'addNote'}))
    }
}

export default compose(connect(null, mapDispatchToProps), withTranslation("common"))(Notes);