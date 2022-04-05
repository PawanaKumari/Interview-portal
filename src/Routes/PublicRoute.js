import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoginAuth } from '../utils';
const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLoginAuth() && restricted ?
                <Redirect to="/main" />
            : <Component {...props} />
        )} />
        
    );
};

export default PublicRoute;