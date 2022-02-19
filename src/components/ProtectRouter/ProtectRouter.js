import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from '../../service/AuthenticationService'

const ProtectRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated() === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

export default ProtectRoute;