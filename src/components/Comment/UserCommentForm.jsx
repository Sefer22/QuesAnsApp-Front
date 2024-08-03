import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { CardContent, Avatar, InputAdornment, OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { PostWithAuth } from '../services/HttpService';

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    boxShadow: 'none',
    color: 'white',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    background: 'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)'
}));

function UserCommentForm(props) {
    const { userId, userName, postId, setCommentRefresh } = props;
    const [text, setText] = useState("");

    const saveComment = () => {
        PostWithAuth("http://localhost:8080/comments", {
            postId: postId,
            userId: userId,
            text: text
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const handleSubmit = () => {
        saveComment();
        setText("");
        setCommentRefresh();
    }
    const handleChange = (value) => {
        setText(value);
    }

    return (
        <CardContent>
            <OutlinedInput
                id='outlined-adornment-amount'
                multiline
                inputProps={{ maxLength: 250 }}
                fullWidth
                onChange={(i) => handleChange(i.target.value)}
                startAdornment={
                    <InputAdornment position='start'>
                        <StyledLink to={`/users/${userId}`}>
                            <StyledAvatar aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </StyledAvatar>
                        </StyledLink>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position='end'>
                        <Button variant='contained'
                            style={{
                                background: 'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)',
                                color: 'white'
                            }}
                            onClick={handleSubmit}
                        >Comment
                        </Button>
                    </InputAdornment>
                }
                value={text}
            ></OutlinedInput>
        </CardContent>
    );
}

export default UserCommentForm;
