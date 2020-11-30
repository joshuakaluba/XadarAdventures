import React from "react";

const LoadingBar = (props) => {
    return (
        props.loading === true && 
        <progress className="progress is-small is-primary" max="100">15%</progress>
    );
};

export default LoadingBar;
