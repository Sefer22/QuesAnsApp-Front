import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserAvatar from '../Avatar/UserAvatar';
import UserActivity from '../UserActivity/UserActivity';
import { GetWithAuth } from '../services/HttpService';

function User() {
    const { userId } = useParams();
    const [user, setUser] = useState();

    const getUser = () => {
        GetWithAuth("http://localhost:8080/users/" + userId)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setUser(result);
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            {user ? <UserAvatar avatarId={user.avatarId} userId={userId} userName={user.userName} /> : ""}
            {localStorage.getItem("currentUser") == userId ? <UserActivity userId={userId} /> : ""}
        </div>
    );
}

export default User;
