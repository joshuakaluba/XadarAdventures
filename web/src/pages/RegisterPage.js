import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import validator from 'validator';
import { PrimaryButton, PrimaryInput, PageHeader } from "./../components";
import { UsersService, AuthenticationContext } from "./../services";

const RegisterPage = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useContext(AuthenticationContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const _registerAsync = async () => {
        try {
            setLoading(true);

            const credentials = {
                'email': email,
                'password': password,
                'confirmPassword': confirmPassword
            };

            await UsersService.register(credentials);
            setIsLoggedIn(!isLoggedIn);
            props.history.push("/");
        } catch (error) {
            setShowErrorMessage(true);
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    return (
        <div>
            <PageHeader
                title={'Register'}
                loading={loading}
                showErrorMessage={showErrorMessage}
                errorMessage={errorMessage} />

            <PrimaryInput
                placeholder={"Email"}
                value={email}
                loading={loading}
                disabled={loading}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />

            <PrimaryInput
                placeholder={"Password"}
                password
                value={password}
                loading={loading}
                disabled={loading}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />

            <PrimaryInput
                placeholder={"Confirm password"}
                password
                value={confirmPassword}
                loading={loading}
                disabled={loading}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }}
            />

            <div className="buttons">
                <div className="field is-grouped">
                    <PrimaryButton
                        text="Sign up"
                        onClick={_registerAsync}
                        disabled={
                            loading ||
                            password.length < 6 ||
                            password !== confirmPassword ||
                            !validator.isEmail(email)
                        }
                        loading={loading}
                    />
                    <div className="control">
                        <Link className="button is-secondary" to="/login">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RegisterPage;