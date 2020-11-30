import React from 'react';

const PrimaryCheckbox = (props) => {
    return (
        <label className="checkbox">
            <input
                type="checkbox"
                onChange={props.onChange}
                defaultChecked={props.defaultChecked} />
            {props.checkBoxLabel}
        </label>
    );
};

export default PrimaryCheckbox;