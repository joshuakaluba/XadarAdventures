import React from 'react';

const PrimaryButton = (props) => {
    return (
        <button className={`button is-primary ${props.loading ? 'is-loading' : ''}`}
            onClick={props.onClick}
            disabled={props.disabled}>
            <strong>
                {props.text}
            </strong>
        </button>
    );
};

export default PrimaryButton;