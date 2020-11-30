import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { PageHeader } from "../components";
import { CoursesService, ChallengesService, UsersService } from '../services';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const EnrolledStudentsChallengePage = () => {

    const { id, studentId } = useParams();

    const [loading, setLoading] = useState(true);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [course, setCourse] = useState({});
    const [challenges, setChallenges] = useState([]);
    const [user, setUser] = useState({});

    const classes = useStyles();

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                const course = await CoursesService.getCourse(id);
                const challenges = await ChallengesService.getUserCourseChallenges(id, studentId);
                const user = await UsersService.getUserEmail(studentId);

                setCourse(course);
                setChallenges(challenges);
                setUser(user);

            } catch (error) {
                setShowErrorMessage(true);
                setErrorMessage(error.message);
            }
            setLoading(false);
        };
        init();
    }, [id, studentId]);

    return (
        <div>
            <PageHeader
                title={!!course ? course.name : ''}
                loading={loading}
                showErrorMessage={showErrorMessage}
                errorMessage={errorMessage} />

            <div className="columns">
                <div className="column is-centered">
                    <h4 className="has-text-centered is-size-4">
                        <strong>{!!user && !!user.email && user.email}</strong>  | Challenges
                    </h4>
                </div>
            </div>

            <br />

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Completed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {challenges.map((challenge) => (
                            <TableRow key={challenge.id}>
                                <TableCell component="th" scope="row">
                                    {challenge.name}
                                </TableCell>
                                <TableCell align="right">
                                    {challenge.completed ? 'Completed' : 'Incomplete'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default EnrolledStudentsChallengePage;
