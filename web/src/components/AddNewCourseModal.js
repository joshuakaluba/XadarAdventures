import React from 'react';
import PrimaryButton from './PrimaryButton';
import PrimaryInput from './PrimaryInput';
import PrimaryTextArea from './PrimaryTextArea';

const AddNewCourseModal = (props) => {
    return (
        <div className={`modal ${props.visible === true ? 'is-active' : ''}`}>
            <div className="modal-background "></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Add new course</p>
                    <button className="delete" aria-label="close" onClick={props.onDismiss} />
                </header>
                <section className="modal-card-body">
                    <PrimaryInput
                        placeholder={"Course name"}
                        value={props.newCourseName}
                        loading={props.loading}
                        disabled={props.loading}
                        onChange={props.onCourseNameChange} />
                    <div className="field">
                        <div className="control">
                            <PrimaryTextArea
                                placeholder="Course description"
                                value={props.newCourseDescription}
                                disabled={props.loading}
                                onChange={props.onCourseDescriptionChange} />
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <PrimaryButton
                        text="Save changes"
                        disabled={props.loading || props.newCourseDescription.length <= 0 || props.newCourseName.length <= 0}
                        loading={props.loading}
                        onClick={props.addNewCourse} />
                    <button className="button" onClick={props.onDismiss}>
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default AddNewCourseModal;
