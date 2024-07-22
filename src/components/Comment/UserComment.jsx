import React from 'react';
import { Link } from "react-router-dom";
import { CardContent, Avatar, InputAdornment, OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    boxShadow: 'none',
    color: 'white',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    background: 'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)'
}));

function UserComment(props) {
    const { text, userId, userName = "" } = props;  // Default value for userName

    return (
        <CardContent>
            <OutlinedInput
                disabled
                id='outlined-adornment-amount'
                multiline
                inputProps={{ maxLength: 250 }}
                fullWidth
                value={text}
                startAdornment={
                    <InputAdornment position='start'>
                        <StyledLink to={`/users/${userId}`}>
                            <StyledAvatar aria-label="recipe">
                                {userName && userName.charAt(0).toUpperCase()}
                            </StyledAvatar>
                        </StyledLink>
                    </InputAdornment>
                }
            />
        </CardContent>
    );
}

export default UserComment;
