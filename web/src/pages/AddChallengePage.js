import React, { useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import { useParams, useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import { ChallengeTypes, MultipleChoiceOptions } from './../constants';
import { ChallengesService } from '../services';
import {
    PageHeader,
    PrimaryInput,
    PrimaryButton,
    PrimaryTextArea,
    PrimaryDropdown,
    PrimaryCheckbox
} from './../components';

const AddChallengePage = () => {

    const history = useHistory();
    const { id } = useParams();

    const { addToast } = useToasts();

    const [loading, setLoading] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [challengeName, setChallengeName] = useState("");
    const [challengeDescription, setChallengeDescription] = useState("");
    const [isLocationDependant, setIsLocationDependant] = useState(false);
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [challengeType, setChallengeType] = useState(-1);

    const [shortAnswerQuestion, setShortAnswerQuestion] = useState("");
    const [shortAnswerSolution, setShortAnswerSolution] = useState("");

    const [markdown, setMarkdown] = useState("**Hello world!!!**");

    const [multipleChoiceOption1, setMultipleChoiceOption1] = useState("");
    const [multipleChoiceOption2, setMultipleChoiceOption2] = useState("");
    const [multipleChoiceOption3, setMultipleChoiceOption3] = useState("");
    const [multipleChoiceOption4, setMultipleChoiceOption4] = useState("");

    const [multipleChoiceQuestion, setMultipleChoiceQuestion] = useState("");
    const [multipleChoiceSolution, setMultipleChoiceSolution] = useState(-1);

    const _challengeTypeChange = (selection) => setChallengeType(selection.value);

    const _multipleChoiceChange = (selection) => setMultipleChoiceSolution(selection.value);

    const _createChallengeAsync = async () => {
        setLoading(true);
        try {
            const options = JSON.stringify({
                multipleChoiceOption1,
                multipleChoiceOption2,
                multipleChoiceOption3,
                multipleChoiceOption4
            });

            const challenge = {
                courseId: id,
                latitude,
                longitude,
                name: challengeName,
                description: challengeDescription,
                challengeType,
                isLocationDependant,
                shortAnswerQuestion,
                shortAnswerSolution,
                multipleChoiceQuestion,
                paragraphText: markdown,
                multipleChoiceSolution,
                multipleChoiceOptions: options
            };

            await ChallengesService.createChallenge(challenge);

            addToast('Challenge saved successfully', { appearance: 'success' });

            history.push(`/challenges/${id}`);
        } catch (error) {
            setShowErrorMessage(true);
            setErrorMessage(error.message);
        }
        setLoading(false);
    };

    const _locationBasedChanged = () => setIsLocationDependant(!isLocationDependant);

    return (
        <div>
            <PageHeader
                title={`Add Challenge`}
                loading={loading}
                showErrorMessage={showErrorMessage}
                errorMessage={errorMessage} />

            <div className="columns is-centered">
                <div className="column is-10">
                    <PrimaryInput
                        placeholder={"Challenge name"}
                        value={challengeName}
                        loading={loading}
                        disabled={loading}
                        onChange={(e) => {
                            setChallengeName(e.target.value);
                        }} />

                    <PrimaryTextArea
                        placeholder="Course description"
                        value={challengeDescription}
                        disabled={loading}
                        onChange={(e) => {
                            setChallengeDescription(e.target.value);
                        }} />

                    <br />

                    <div className="columns">
                        <div className="column">
                            <PrimaryCheckbox
                                checkBoxLabel={'Location based challenge'}
                                onChange={_locationBasedChanged} defaultChecked={isLocationDependant} />
                        </div>
                    </div>

                    {
                        isLocationDependant === true &&
                        <div className="columns">
                            <div className="column">
                                <PrimaryInput
                                    placeholder={"Latitude"}
                                    value={latitude}
                                    loading={loading}
                                    disabled={loading}
                                    onChange={(e) => {
                                        setLatitude(e.target.value);
                                    }} />
                            </div>
                            <div className="column">
                                <PrimaryInput
                                    placeholder={"Longitude"}
                                    value={longitude}
                                    loading={loading}
                                    disabled={loading}
                                    onChange={(e) => {
                                        setLongitude(e.target.value);
                                    }} />
                            </div>
                        </div>
                    }

                    <PrimaryDropdown
                        options={ChallengeTypes}
                        value={ChallengeTypes[0]}
                        onChange={_challengeTypeChange}
                        placeholder="Select challenge type" />

                    <br />

                    {
                        challengeType === 1 &&
                        <div>
                            <PrimaryInput
                                placeholder="Multiple choice question"
                                value={multipleChoiceQuestion}
                                loading={loading}
                                disabled={loading}
                                onChange={(e) => {
                                    setMultipleChoiceQuestion(e.target.value);
                                }} />

                            <hr />

                            <PrimaryInput
                                placeholder="Multiple choice option 1"
                                value={multipleChoiceOption1}
                                loading={loading}
                                disabled={loading}
                                onChange={(e) => {
                                    setMultipleChoiceOption1(e.target.value);
                                }} />

                            <PrimaryInput
                                placeholder="Multiple choice option 2"
                                value={multipleChoiceOption2}
                                loading={loading}
                                disabled={loading}
                                onChange={(e) => {
                                    setMultipleChoiceOption2(e.target.value);
                                }} />

                            <PrimaryInput
                                placeholder="Multiple choice option 3"
                                value={multipleChoiceOption3}
                                loading={loading}
                                disabled={loading}
                                onChange={(e) => {
                                    setMultipleChoiceOption3(e.target.value);
                                }} />

                            <PrimaryInput
                                placeholder="Multiple choice option 4"
                                value={multipleChoiceOption4}
                                loading={loading}
                                disabled={loading}
                                onChange={(e) => {
                                    setMultipleChoiceOption4(e.target.value);
                                }} />

                            <hr />

                            <PrimaryDropdown
                                options={MultipleChoiceOptions}
                                value={MultipleChoiceOptions[0]}
                                onChange={_multipleChoiceChange}
                                placeholder="Select correct multiple choice option" />

                            <br />

                        </div>
                    }

                    {
                        challengeType === 2 &&
                        <div>
                            <PrimaryInput
                                placeholder="Short answer question"
                                value={shortAnswerQuestion}
                                loading={loading}
                                disabled={loading}
                                onChange={(e) => {
                                    setShortAnswerQuestion(e.target.value);
                                }} />

                            <PrimaryTextArea
                                placeholder="Short answer solution, comma separated for multiple accepted answers"
                                value={shortAnswerSolution}
                                loading={loading}
                                disabled={loading}
                                onChange={(e) => {
                                    setShortAnswerSolution(e.target.value);
                                }} />
                        </div>
                    }

                    {
                        challengeType === 3 &&
                        <MDEditor
                            value={markdown}
                            onChange={setMarkdown} />
                    }

                    <br />

                    <PrimaryButton
                        text={'Create challenge'}
                        onClick={_createChallengeAsync}
                        loading={loading}
                        disabled={challengeType < 0} />

                </div>
            </div>

        </div>
    );
};

export default AddChallengePage;