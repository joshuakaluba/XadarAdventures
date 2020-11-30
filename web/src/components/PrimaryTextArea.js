import React from 'react';

const PrimaryTextArea = (props) => {
    return (
        <textarea
            className="textarea is-info"
            value={props.value}
            disabled={props.disabled}
            onChange={props.onChange}
            placeholder={props.placeholder}>
        </textarea>
    );
};

export default PrimaryTextArea;