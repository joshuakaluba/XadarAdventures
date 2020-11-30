import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = (props) => {
    return (
        <div className="column is-4">
            <div className="card course-card" >
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{props.course.name}</p>
                        </div>
                    </div>
                    <div className="content">
                        {props.course.description}
                    </div>
                    {
                        <div className="columns">
                            <div className="column">
                                <Link className="button is-primary" to={`/challenges/${props.course.id}`}>
                                    <strong>Select</strong>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
