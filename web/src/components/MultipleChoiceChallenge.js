import React from 'react';

import PrimaryTextArea from './PrimaryTextArea';
import PrimaryInput from './PrimaryInput';

const MultipleChoiceChallenge = (props) => {

    const multipleChoiceOptions = JSON.parse(props.challenge.multipleChoiceOptions);

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
                        value={props.challenge.multipleChoiceQuestion}
                        disabled={true} />
                </div>
            </div>

            <div className="columns">
                <div className="column">
                    <p>Choices: </p>
                </div>
            </div>

            <div className='columns'>
                <div className='column'>
                    <p>Option 1:</p>
                    <PrimaryInput
                        value={multipleChoiceOptions.multipleChoiceOption1}
                        disabled={true} />
                </div>
            </div>

            <div className='columns'>
                <div className='column'>
                    <p>Option 2:</p>
                    <PrimaryInput
                        value={multipleChoiceOptions.multipleChoiceOption2}
                        disabled={true} />
                </div>
            </div>

            <div className='columns'>
                <div className='column'>
                    <p>Option 3:</p>
                    <PrimaryInput
                        value={multipleChoiceOptions.multipleChoiceOption3}
                        disabled={true} />
                </div>
            </div>

            <div className='columns'>
                <div className='column'>
                    <p>Option 4:</p>
                    <PrimaryInput
                        value={multipleChoiceOptions.multipleChoiceOption4}
                        disabled={true} />
                </div>
            </div>

            <div className="columns">
                <div className="column">
                    <p>Answer: <strong>Option {props.challenge.multipleChoiceSolution}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default MultipleChoiceChallenge;