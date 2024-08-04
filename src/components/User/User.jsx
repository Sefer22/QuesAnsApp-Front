import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserAvatar from '../Avatar/UserAvatar';
import UserActivity from '../UserActivity/UserActivity';

function User() {
    const { userId } = useParams();
    const [user, setUser] = useState();

    const fetchUser = () => {
        fetch("http://localhost:8080/users/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setUser(result);
                },
                (error) => {
                    console.log(error);
                }
            );
    };

    useEffect(() => {
        fetchUser();
    }, [userId]);

    return (
        <div style={{ display: 'flex' }}>
            {user ? <UserAvatar avatarId={user.avatarId} userId={userId} userName={user.userName} /> : ""}
            {localStorage.getItem("currentUser") == userId ? <UserActivity userId={userId} /> : ""}
        </div>
    );
}

export default User;
