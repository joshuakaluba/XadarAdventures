import React from "react";

const ErrorMessage = (props) => {
    return (
        <div className="notification is-danger">
            {props.message}
        </div>
    );
};

export default ErrorMessage;
