import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoginAuth } from '../utils';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, Redirect the user to /signin page
        <Route {...rest} render={props => (
            isLoginAuth() ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;