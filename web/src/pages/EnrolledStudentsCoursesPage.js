import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { PageHeader } from "../components";
import { CoursesService } from '../services';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const EnrolledStudentsCoursesPage = (props) => {

    const { id } = useParams();
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [course, setCourse] = useState({});
    const [studentEnrollments, setStudentEnrollments] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                const course = await CoursesService.getCourse(id);
                setCourse(course);

                const enrollments = await CoursesService.getCourseEnrolledStudents(id);
                setStudentEnrollments(enrollments);
                console.log(enrollments);

            } catch (error) {
                setShowErrorMessage(true);
                setErrorMessage(error.message);
            }
            setLoading(false);
        };
        init();
    }, [id]);

    const _onViewStudentChallengeClick = (studentId) => history.push(`/enrolledchallenge/${id}/${studentId}`);

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
                        Enrolled Students
                    </h4>
                </div>
            </div>

            <br />

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell align="right">Date Enrolled</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentEnrollments.map((studentEnrollment) => (
                            <TableRow key={studentEnrollment.id} onClick={() => _onViewStudentChallengeClick(studentEnrollment.applicationUserId)}>
                                <TableCell component="th" scope="row">
                                    {studentEnrollment.email}
                                </TableCell>
                                <TableCell align="right">
                                    {moment(studentEnrollment.dateCreated).format('MMMM Do YYYY')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default EnrolledStudentsCoursesPage;
