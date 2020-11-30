import React from 'react';

const  HomePage = (props) => {    

    function onClickInstructorButton(){
        props.history.push("instructors");
    }

    function onClickStudentsButton(){
        props.history.push("courses");
    }

    return (
        <div>
            <div className="columns is-centered">
                <div className="column">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src="assets/images/instructor.png" alt="instructor" />
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="content">

                                <p className="title is-3">Instructors</p>

                                <button className="button is-primary" onClick={onClickInstructorButton} >
                                    <strong>
                                        Continue as an instructor
                                    </strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card" >
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src="assets/images/student.png" alt="student" />
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="content">

                                <p className="title is-3">Students</p>

                                <button className="button is-link" onClick={onClickStudentsButton}>
                                    <strong>Continue as a student</strong>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default HomePage;

