import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChallengesService } from "./../services";
import {
    PageHeader,
    QRCodeRenderer,
    ShortAnswerChallenge,
    MultipleChoiceChallenge,
    ParagraphChallenge
} from "./../components";

const SelectedChallengePage = () => {

    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [challenge, setChallenge] = useState({});

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                const challenge = await ChallengesService.getChallenge(id);
                console.log(challenge);
                setChallenge(challenge);
            } catch (error) {
                setShowErrorMessage(true);
                setErrorMessage(error.message);
            }
            setLoading(false);
        };
        init();
    }, [id]);

    return (
        <div>
            <PageHeader
                title={challenge.name}
                loading={loading}
                showErrorMessage={showErrorMessage}
                errorMessage={errorMessage} />

            {
                !!challenge && !!challenge.description && challenge.description.length > 1 &&
                <div className="columns no-print">
                    <div className="column">
                        <p className="no-print"><strong>Description: </strong>{`${challenge.description}`}</p>
                    </div>
                </div>
            }

            <hr />

            {
                loading === false && challenge.challengeType === 1 &&
                <MultipleChoiceChallenge challenge={challenge} />
            }
            {
                loading === false && challenge.challengeType === 2 &&
                <ShortAnswerChallenge challenge={challenge} />
            }
            {
                loading === false && challenge.challengeType === 3 &&
                <ParagraphChallenge challenge={challenge} />
            }

            <hr />
            {
                challenge.isLocationDependant &&
                <QRCodeRenderer
                    challenge={challenge}
                    showPrintButton={true} />
            }
        </div>
    );
};

export default SelectedChallengePage;
