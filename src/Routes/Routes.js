import React from "react";
import { BrowserRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Main from "../components/pages/Main";
import Register from "../components/pages/Register";
import Login from "../components/pages/Login";
import Home from "../components/pages/Home"
import ResetPassword from "../components/pages/ForgotPassword"
import UpdatePassword from "../components/pages/ResetPassword"
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

// import Main from "../components/pages/Main";
// import Register from "../components/pages/Register";
// import Login from "../components/pages/Login";


const RouteLinks = () => {
    const history = createBrowserHistory();
    // console.log(localstorage())
    return (
        <>

            <Switch>


                <PublicRoute restricted={false} component={Home} path="/" exact />
                <PublicRoute restricted={true} component={Register} path="/register"  exact/>
                <PublicRoute restricted={true} component={Login} path="/login" exact />
                <PublicRoute restricted={true} component={ResetPassword} path="/reset-password" exact />
                <PublicRoute restricted={true} component={UpdatePassword} path="/update-password" exact />
                <PrivateRoute component={Main} path="/main"  exact/>



            </Switch>
        </>
    );
}

export default RouteLinks;
