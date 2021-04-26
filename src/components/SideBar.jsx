import React, { useEffect, useState } from 'react';
import MessageAside from "./messages/MessageAside";
import CallAside from "./calls/CallAside";
import FriendAside from "./friends/FriendAside";
import ProfileAside from "./profiles/ProfileAside";

const SideBar = () => {
    const [pathName, setPathName] = useState(window.location.pathname);

    useEffect(() => {
        setPathName(window.location.pathname);
    }, [window.location.pathname])
    return (
        <aside className="sidebar">
            <div className="tab-content">
                {pathName === '/chats' && (<MessageAside/>)}
                {pathName === '/calls' && (<CallAside/>)}
                {pathName === '/friends' && (<FriendAside/>)}
                {pathName === '/profiles' && (<ProfileAside/>)}
            </div>
        </aside>
    );
}

export default SideBar