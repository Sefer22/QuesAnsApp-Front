import React, { useState } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MdInsertComment } from "react-icons/md";
import { Link } from 'react-router-dom'
import { OutlinedInput } from '@mui/material';
import { Button } from '@mui/material';
import { InputAdornment } from '@mui/material';

const theme = createTheme();

const ExpandMore = styled((props) => <IconButton {...props} />)(({ theme, expand }) => ({
    // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const PostForm = (props) => {
    const { userId, userName } = props;
    const [expanded, setExpanded] = useState(false);
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const savePost = () => {
        fetch("http://localhost:8080/posts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    userId: userId,
                    text: text
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error"))
            .finally(() => setLoading(false));
    }

    const handleSubmit = () => {
        if (loading) return;
        setLoading(true);
        savePost();
    }
    const handleTitle = (value) => {
        setTitle(value);
    }

    const handleText = (value) => {
        setText(value);
    }

    return (
        <div className='postContainer'>
            <Card sx={{ maxWidth: 800, textAlign: 'left' }}>
                <CardHeader
                    avatar={
                        <Link style={{ textDecoration: 'none', boxShadow: 'none', color: 'white' }} to={{ pathname: '/users' + userId }}>
                            <Avatar sx={{ background: 'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)' }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={<OutlinedInput id='outlined-adornment-amount' multiline placeholder='Title'
                        inputProps={{ maxLength: 25 }} fullWidth
                        onChange={(i) => handleTitle(i.target.value)}
                    >

                    </OutlinedInput>}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {<OutlinedInput id='outlined-adornment-amount' multiline placeholder='Text'
                            inputProps={{ maxLength: 250 }} fullWidth
                            onChange={(i) => handleText(i.target.value)}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <Button variant='contained'
                                        style={{
                                            background: 'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)',
                                            color: 'white'
                                        }}
                                        onClick={handleSubmit}
                                        disabled={loading}
                                    >
                                        {loading ? 'Posting...' : 'Post'}
                                    </Button>
                                </InputAdornment>
                            }
                        >
                        </OutlinedInput>}
                    </Typography>
                </CardContent>
            </Card>
            {/* {title}
            {text} */}
        </div>
    );
};

export default PostForm;
