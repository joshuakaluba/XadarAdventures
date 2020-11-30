import React from 'react';
import LoadingBar from './LoadingBar';
import ErrorMessage from './ErrorMessage';

const PageHeader = (props) => {
    return (
        <div className="no-print">
            {
                props.showErrorMessage === true &&
                <ErrorMessage message={props.errorMessage} />
            }
            {
                props.loading === true &&
                <LoadingBar loading={props.loading} />
            }
            <div className="columns">
                <div className="column is-centered">
                    <h3 className="has-text-centered is-size-3">
                        {props.title}
                    </h3>
                </div>
            </div>
            {
                props.showAddButton === true && props.loading === false &&
                <div className="columns">
                    <div className="column">
                        <button className="button is-primary" onClick={props.onAddClick}>
                            <strong>{props.addButtonTitle}</strong>
                        </button>
                    </div>

                    {
                        !!props.children && props.children
                    }
                </div>
            }           
        </div>
    );
};

export default PageHeader;