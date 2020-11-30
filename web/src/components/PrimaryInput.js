import React from 'react';

const PrimaryInput = (props) => {
    return (
        <div className="field">
            <div className={`control ${!!props.loading && props.loading === true ? 'is-loading' : ''}`}>
                <input className={`input is-info`}
                    type={!!props.password ? 'password' : 'text'}
                    disabled={props.disabled}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange} />
            </div>
        </div>
    );
};

export default PrimaryInput;