import React from 'react';
import PrimaryButton from './PrimaryButton';

const SignOutModal = (props) => {
    return (
        <div className={`modal ${props.showSignOutModal === true ? 'is-active' : ''}`}>
            <div className="modal-background "></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title ">Sign out</p>
                    <button className="delete" aria-label="close" onClick={props.onClose} />
                </header>
                <section className="modal-card-body">
                    <div className="content">
                        <div className="title is-6">Are you sure you want to sign out?</div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <PrimaryButton
                        text="Sign out"
                        onClick={props.signOut} />

                    <button
                        className="button"
                        onClick={props.onClose}>
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default SignOutModal;