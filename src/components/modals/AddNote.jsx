import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import {hideModal} from "../../actions/modal.action";
import {connect} from "react-redux";
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import axiosService from "../../utils/axiosService";
import ErrorMessage from "../ErrorMessage";
import {showToast} from "../../plugins/sweetAlert";

const AddNote = ({hideAddNote, show, user, t, addNoteToArray}) => {
    const init = {
        title: '',
        details: '',
        date: '',
        tag: 1
    }

    const { register, handleSubmit, errors, setValue } = useForm({defaultValues: init});

    const onSubmit = async data => {
        try {
            const response = await axiosService("notes", "POST", {...data, usersId: user.id});
            console.log(response.data);
            if (response.data.code === 406) {
                showToast('error', response.data.errors.message);
                return;
            }
            Object.keys(init).forEach((i) => {
                setValue(i, init[i]);
            });
            addNoteToArray()
            showToast('success', t('success'));
        } catch (e) {
            console.log('error add note', e);
            showToast('error', t('failure'));
        }
    }

    return (
        <Modal onHide={hideAddNote} show={show} className="modal-lg-fullscreen">
            <Modal.Header>
                <h5 className="modal-title" id="addNoteModalLabel">Add new note</h5>
                <button onClick={hideAddNote} type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="addNoteName" className="col-form-label">Note title:</label>
                        <input type="text" ref={register({required: true, minLength: 10, maxLength: 50})}
                               className="form-control" id="addNoteName" name="title"
                               placeholder="Add note title here"/>
                        {errors.title && <ErrorMessage name="title" value={errors.title.type}/>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="addNoteDetails" className="col-form-label">Note details:</label>
                        <textarea className="form-control hide-scrollbar" id="addNoteDetails" rows="4"
                                  ref={register({required: true, maxLength: 300})} name="details"
                                  placeholder="Add note descriptions"></textarea>
                        {errors.details && <ErrorMessage name="details" value={errors.details.type}/>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="addNoteDate" className="col-form-label">Note date:</label>
                        <input type="datetime-local" ref={register({required: true})}
                               className="form-control" id="addNoteDate" name="date"
                               placeholder="Add note title here"/>
                        {errors.date && <ErrorMessage name="date" value={errors.date.type}/>}
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Note tag:</label>
                        <select ref={register({})} name="tag" className="custom-select font-size-sm shadow-none">
                            <option selected value={1}>Personal</option>
                            <option value={2}>Important</option>
                            <option value={3}>Work</option>
                            <option value={4}>Favourite</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={hideAddNote} type="button" className="btn btn-light border" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Add task</button>
                </Modal.Footer>
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
        hideAddNote: () => dispatch(hideModal())
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withTranslation("common"))(AddNote);