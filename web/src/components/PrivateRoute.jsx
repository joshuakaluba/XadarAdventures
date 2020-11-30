import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenUtility from './../utilities/TokenUtility';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        TokenUtility.isLoggedIn() ?
            <Component {...props} /> :
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)