import React, { useState } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { OutlinedInput } from '@mui/material';
import { Button } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

const theme = createTheme();

const ExpandMore = styled((props) => <IconButton {...props} />)(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const PostForm = (props) => {
    const { userId, userName, refreshPosts } = props;
    const [expanded, setExpanded] = useState(false);
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {
        fetch("http://localhost:8080/posts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("tokenKey")
                },
                body: JSON.stringify({
                    title: title,
                    userId: userId,
                    text: text
                }),
            })
            .then((res) => res.json())
            .then(() => {
                setIsSent(true);
                setTitle("");
                setText("");
                refreshPosts();
            })
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
        setIsSent(false);
    }

    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSent(false);
    };

    return (
        <div className='postContainer'>
            <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
                <Alert onClose={handleClose} severity='success'>
                    Your message is sent!
                </Alert>
            </Snackbar>

            <Card sx={{ maxWidth: 800, textAlign: 'left' }}>
                <CardHeader
                    avatar={
                        <Link style={{ textDecoration: 'none', boxShadow: 'none', color: 'white' }} to={`/users/${userId}`}>
                            <Avatar sx={{ background: 'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)' }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={<OutlinedInput id='outlined-adornment-amount' multiline placeholder='Title'
                        inputProps={{ maxLength: 25 }} fullWidth
                        value={title}
                        onChange={(i) => handleTitle(i.target.value)}
                    />}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput id='outlined-adornment-amount' multiline placeholder='Text'
                            inputProps={{ maxLength: 250 }} fullWidth
                            value={text}
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
                        />
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default PostForm;
