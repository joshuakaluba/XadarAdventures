import React, { useState, createContext } from "react";
import TokenUtility from '../utilities/TokenUtility';

//create context
export const AuthenticationContext = createContext();
AuthenticationContext.displayName = "AuthenticationContext";

//context provider with initial state.
export const AuthenticationContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(TokenUtility.isLoggedIn());

    return (
        <AuthenticationContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
            {props.children}
        </AuthenticationContext.Provider>
    );
};