import React, { useEffect }  from 'react';
import MessageContent from "../components/messages/MessageContent";
import ProfileContent from "../components/profiles/ProfileContent";
import CallContent from "../components/calls/CallContent";
import FriendContent from "../components/friends/FriendContent";
import AppBar from "../components/AppBar";
import Modal from "../components/Modal";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import {Switch, Route } from "react-router-dom";
import socket from "../utils/socket";
import {connect} from "react-redux";
import {SET_USER_ID} from "../constants";
import Users from "../components/Users";
import {showToast} from "../plugins/sweetAlert";

const Messenger = ({user}) => {

    useEffect(() => {
        socket.emit(SET_USER_ID, user.id);
        socket.on("FAILURE", (data) => {
            showToast("error", data);
        });
        return () => {
            socket.off("FAILURE", (data) => {
                showToast("error", data);
            });
        }
    }, []);

    return (
        <React.Fragment>
            <NavBar/>
            <SideBar/>
            <main className="main main-visible">
                <Switch>
                    <Route path={'/users/:id'} component={Users} exact/>
                    <Route path={'/chats'} component={MessageContent} exact/>
                    <Route path={'/calls'} component={CallContent} exact/>
                    <Route path={'/friends'} component={FriendContent} exact/>
                    <Route path={'/profiles'} component={ProfileContent} exact/>
                </Switch>
            </main>
            <AppBar/>
            <Modal/>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
}

const mapDispatchToProps = () => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);