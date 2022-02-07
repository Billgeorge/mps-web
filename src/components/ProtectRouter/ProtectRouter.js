import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from '../../service/AuthenticationService'
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProtectRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated() === true
            ? <><Alert style={{marginTop:'65px', marginLeft:'65px'}} severity="warning">Actualmente la creación de ordenes no funciona</Alert>
                <Component {...props} />
            </>
            : <Redirect to='/login' />
    )} />
)

export default ProtectRoute;