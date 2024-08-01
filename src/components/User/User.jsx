import React from 'react'
import { useParams } from 'react-router-dom'
import UserAvatar from '../Avatar/UserAvatar';
import UserActivity from '../UserActivity/UserActivity';


function User() {

    const { userId } = useParams();
    const [user, setUser] = useState();

    const savePost = () => {
        fetch("http://localhost:8080/users/" + userId,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("tokenKey")
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
            )
    }




    return (
        <div style={{ display: 'flex' }}>
            {user ? <Avatar avatarId={user.avatarId} /> : ""}
            <UserActivity userId={userId} />
        </div>
    )

}

export default User