import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { CoursesService, ChallengesService } from "./../services";
import {
    PageHeader,
    NoDataCard,
    ChallengesList,
    ViewEnrollmentCodeModal
} from "./../components";


const ChallengesPage = () => {

    const { id } = useParams();
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showEnrollmentCodeModal, setShowEnrollmentCodeModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [course, setCourse] = useState({});
    const [challenges, setChallenges] = useState([]);

    const _onAddChallengeClick = () => history.push(`/addchallenge/${id}`);
    const _onViewCourseEnrollmentClick = () => history.push(`/enrolledstudents/${id}`);
    const _onShowEnrollmentCodeModal = () => setShowEnrollmentCodeModal(true);
    const _onDismissEnrollmentCodeModal = () => setShowEnrollmentCodeModal(false);

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                const course = await CoursesService.getCourse(id);
                setCourse(course);

                const challenges = await ChallengesService.getAllChallengesByCourse(id);
                setChallenges(challenges);
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
                title={!!course ? course.name : ''}
                loading={loading}
                showErrorMessage={showErrorMessage}
                errorMessage={errorMessage}
                showAddButton={true}
                addButtonTitle={'Add new challenge'}
                onAddClick={_onAddChallengeClick} >
                <div className="column" style={{ textAlign: 'right' }}>
                    <button className="button is-dark" onClick={_onShowEnrollmentCodeModal} style={{ marginRight: 10 }}>
                        <strong>{'View course enrollment code'}</strong>
                    </button>
                    <button className="button is-dark" onClick={_onViewCourseEnrollmentClick}>
                        <strong>{'View course statistics'}</strong>
                    </button>
                </div>
            </PageHeader>

            <ChallengesList challenges={challenges} />
            {
                challenges.length === 0 &&
                <NoDataCard noDataText={'There are currently no challenges for this course'} />
            }

            <ViewEnrollmentCodeModal
                course={course}
                visible={showEnrollmentCodeModal}
                onDismiss={_onDismissEnrollmentCodeModal.bind(this)} />
        </div>
    );
};

export default ChallengesPage;
