import React from "react";
import Loading from "./components/Loading";
import Register from "./containers/Register";
import {Switch, Route, Redirect} from "react-router-dom";
import Messenger from "./containers/Messenger";
import Login from "./containers/Login";
import {connect} from "react-redux";
import {compose} from 'redux';
import ThankYou from "./containers/ThankYou";
import ForgetPassword from "./containers/ForgetPassword";
import ResetPassword from "./containers/ResetPassword";
import {withTranslation} from 'react-i18next';

const App = (props) => {
    return (
        <React.Fragment>
            {props.loading && (<Loading/>)}
            <Switch>
                {props.user ? (
                    <React.Fragment>
                        {['/chats', '/friends', '/calls', '/profiles'].includes(window.location.pathname) || (
                            <Redirect to={"/chats"}/>)}
                        <Route path={"/"} component={Messenger}/>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Redirect from="/" to="/login" exact/>
                        <Route path={"/register"} component={Register} exact/>
                        <Route path={"/login"} component={Login} exact/>
                        <Route path={"/thank-you"} component={ThankYou} exact/>
                        <Route path={"/forget-password"} component={ForgetPassword} exact/>
                        <Route path={"/reset-password"} component={ResetPassword} exact/>
                    </React.Fragment>
                )}
            </Switch>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.loadingReducer,
        user: state.userReducer
    }
}

const mapDispatchToProps = () => {
    return {}
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withTranslation('common'))(App);