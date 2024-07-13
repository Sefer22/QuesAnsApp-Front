import React from 'react'
import { Link } from "react-router-dom";
import { CardContent, Avatar, InputAdornment, makeStyles, OutlinedInput } from '@mui/material';

const useStyles = makeStyles((theme) => ({

}));

function Comment(props) {

    const { text, userId, userName } = props;

    return (
        <CardContent>
            <OutlinedInput disabled
                id='outlined-adornment-amount' multiline
                inputProps={{ maxLength: 25 }} fullWidth
                value={text}
                startAdornment={
                    <InputAdornment position='start'>
                        <Link style={{ textDecoration: 'none', boxShadow: 'none', color: 'white' }} to={`/users/${userId}`}>
                            <Avatar sx={{ background: 'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)' }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
            >
            </OutlinedInput>
        </CardContent>
    )
}

export default Comment