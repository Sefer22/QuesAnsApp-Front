import React from 'react'
import { useParams } from 'react-router-dom'
import UserAvatar from '../Avatar/UserAvatar';
import UserActivity from '../UserActivity/UserActivity';


function User() {

    const { userId } = useParams();

    return (
        <div>
            <UserAvatar avatarId={0} />
            <UserActivity />
        </div>
    )

}

export default User