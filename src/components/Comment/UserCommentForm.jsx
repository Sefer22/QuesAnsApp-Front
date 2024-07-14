import React from 'react';
import { Link } from "react-router-dom";
import { CardContent, Avatar, InputAdornment, OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    boxShadow: 'none',
    color: 'white',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    background: 'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)'
}));

function UserCommentForm(props) {
    const { text, userId, userName } = props;

    const handleSubmit = () => {

    }

    return (
        <CardContent>
            <OutlinedInput
                id='outlined-adornment-amount'
                multiline
                inputProps={{ maxLength: 250 }}
                fullWidth
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
            />
        </CardContent>
    );
}

export default UserCommentForm;
