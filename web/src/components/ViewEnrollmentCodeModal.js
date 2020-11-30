import React from 'react';

const ViewEnrollmentCodeModal = (props) => {
    return (
        <div className={`modal ${props.visible === true ? 'is-active' : ''}`}>
            <div className="modal-background "></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Enrollment Code</p>
                    <button className="delete" aria-label="close" onClick={props.onDismiss} />
                </header>
                <section className="modal-card-body">

                    <div className="field">
                        <div className="control">
                            <div className="columns is-centered">
                                <div className="column">
                                    <h3 className="has-text-centered is-size-3">{props.course.enrollmentCode}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button className="button" onClick={props.onDismiss}>
                        Ok
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ViewEnrollmentCodeModal;
