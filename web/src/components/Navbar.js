import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "../services/AuthenticationContext";
import TokenUtility from './../utilities/TokenUtility';
import SignOutModal from './SignOutModal';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useContext(AuthenticationContext);
    const [showSignOutModal, setShowSignOutModal] = useState(false);

    const _initializeNavbar = () => {
        const $navbarBurgers = Array.prototype.slice.call(
            document.querySelectorAll(".navbar-burger"),
            0
        );
        if ($navbarBurgers.length > 0) {
            $navbarBurgers.forEach((el) => {
                el.addEventListener("click", () => {
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);
                    el.classList.toggle("is-active");
                    $target.classList.toggle("is-active");
                });
            });
        }
    };

    useEffect(() => {
        _initializeNavbar();
    }, [isLoggedIn]);

    const _signOut = () => {
        setIsLoggedIn(false);
        TokenUtility.logOut();
        window.location.reload();
    };

    return (
        <nav className="navbar is-link no-print" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <img src="assets/images/home.png" alt="logo" />
                </Link>
                
                {
                    // eslint-disable-next-line
                    <a
                        role="button"
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                }
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-end">
                    {!isLoggedIn && (
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link className="button is-primary" to="/register">
                                    <strong>Sign up</strong>
                                </Link>
                                <Link className="button is-light" to="/login">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    )}
                    {isLoggedIn && (
                        <div className="navbar-item">
                            <div className="buttons">
                                <button className="button is-light" onClick={() => { setShowSignOutModal(true); }}>
                                    <strong>Sign out</strong>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <SignOutModal
                    onClose={() => { setShowSignOutModal(false); }}
                    showSignOutModal={showSignOutModal}
                    signOut={_signOut} />

            </div>
        </nav>
    );
};
export default Navbar;