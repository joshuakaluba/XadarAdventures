import React from "react";
import PrimaryTextArea from './PrimaryTextArea';

const ShortAnswerChallenge = (props) => {
    return (
        <div className="no-print">
            <div className="columns">
                <div className="column">
                    <p>Challenge question: </p>
                </div>
            </div>
            <div className='columns'>
                <div className='column'>
                    <PrimaryTextArea
                        value={props.challenge.shortAnswerQuestion}
                        disabled={true} />
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <p>Accepted answers (comma separated): </p>
                </div>
            </div>
            <div className='columns'>
                <div className='column'>
                    <PrimaryTextArea
                        value={props.challenge.shortAnswerSolution}
                        disabled={true} />
                </div>
            </div>
        </div>
    );
};

export default ShortAnswerChallenge;
