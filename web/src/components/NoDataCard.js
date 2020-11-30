import React from 'react';

const NoDataCard = (props) => {
    return (
        <div className="columns is-centered">
            <div className="column is-half ">
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src="assets/images/no-data.png" alt="No data" />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            <p className="title is-4 has-text-centered">
                                {props.noDataText}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoDataCard;