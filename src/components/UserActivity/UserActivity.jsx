import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Post from '../Post/Post';
import { GetWithAuth } from '../services/HttpService';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PopUp(props) {
    const { isOpen, postId, setIsOpen } = props;
    const [open, setOpen] = useState(isOpen);
    const [post, setPost] = useState(null);

    const getPost = () => {
        GetWithAuth("http://localhost:8080/posts/" + postId)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setPost(result);
                },
                (error) => {
                    console.log(error);
                }
            );
    };

    const handleClose = () => {
        setOpen(false);
        setIsOpen(false);
    };

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        if (postId) {
            getPost();
        }
    }, [postId]);

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6">
                        Close
                    </Typography>
                </Toolbar>
            </AppBar>
            {
                post ? <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName}
                    title={post.title} text={post.text} /> : "loading"
            }
        </Dialog>
    );
}

function UserActivity(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rows, setRows] = useState([]);
    const { userId } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const handleNotification = (postId) => {
        setSelectedPost(postId);
        setIsOpen(true);
    };

    const getActivity = () => {
        GetWithAuth("http://localhost:8080/users/activity/" + userId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    console.log(result);
                    setRows(result);
                },
                (error) => {
                    console.log(error);
                    setIsLoaded(true);
                    setError(error);
                }
            );
    };
    useEffect(() => {
        getActivity();
    }, []);

    return (
        <div>
            {isOpen && <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen} />}
            <Paper>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User Activity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    <TableCell align="right">
                                        <Button onClick={() => handleNotification(row[1])}>
                                            {row[3] + " " + row[0] + " your post"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default UserActivity;
