import React from 'react'
import { useParams } from 'react-router-dom'
import UserAvatar from '../Avatar/UserAvatar';

function User() {

    const { userId } = useParams();

    return (
        <div>User {userId}
            <UserAvatar />
        </div>
    )

}

export default User