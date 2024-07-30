import React from 'react'
import { useParams } from 'react-router-dom'
import UserAvatar from '../Avatar/UserAvatar';
import UserActivity from '../UserActivity/UserActivity';


function User() {

    const { userId } = useParams();

    return (
        <div style={{ display: 'flex' }}>
            <UserAvatar avatarId={0} />
            <UserActivity userId={userId} />
        </div>
    )

}

export default User