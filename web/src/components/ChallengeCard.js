import React from 'react';
import { Link } from 'react-router-dom';

const ChallengeCard = (props) => {
    return (
        <div className="column is-4">
            <div className="card course-card" >
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{props.challenge.name}</p>
                        </div>
                    </div>
                    <div className="content">
                        {
                            !!props.challenge &&
                            !!props.challenge.description &&
                            (props.challenge.description.length > 100 ? 
                                `${props.challenge.description.substring(0, 100)}...` : props.challenge.description)

                        }
                    </div>
                    <div className="columns">
                        <div className="column">
                            <Link className="button is-primary" to={`/selectedchallenge/${props.challenge.id}`}>
                                <strong>Select</strong>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeCard;
