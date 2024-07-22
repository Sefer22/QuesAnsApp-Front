import React, { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MdInsertComment } from "react-icons/md";
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import UserComment from '../Comment/UserComment';
import UserCommentForm from '../Comment/UserCommentForm';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Post = (props) => {
    const { title, text, userId, userName, postId, likes } = props;
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const isInitialMount = useRef(true);
    const [likeCount, setLikeCount] = useState(likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [likeId, setLikeId] = useState(null);

    const disabled = localStorage.getItem("currentUser") == null;

    const setCommentRefresh = () => {
        setRefresh(true);
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            saveLikes();
            setLikeCount(likeCount + 1);
        } else {
            deleteLike();
            setLikeCount(likeCount - 1);
        }
    }

    const refreshComments = () => {
        fetch("http://localhost:8080/comments?postId=" + postId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCommentList(result);
                },
                (error) => {
                    console.log(error);
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    const saveLikes = () => {
        fetch("http://localhost:8080/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey")
            },
            body: JSON.stringify({
                userId: localStorage.getItem("currentUser"),
                postId: postId
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                setLikeId(result.id);
            })
            .catch((err) => console.log(err))
    }

    const deleteLike = () => {
        fetch("http://localhost:8080/likes/" + likeId, {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("tokenKey")
            },
        })
            .catch((err) => console.log(err))
    }

    const checkLikes = () => {
        var likeControl = likes.find((like) => "" + like.userId === localStorage.getItem("currentUser"));
        if (likeControl != null) {
            setLikeId(likeControl.id);
            setIsLiked(true);
        }
    }

    useEffect(() => {
        if (!isInitialMount.current) {
            refreshComments();
        } else {
            isInitialMount.current = false;
        }
    }, [commentList])

    useEffect(() => { checkLikes() }, [])

    return (
        <div className='postContainer'>
            <Card sx={{ maxWidth: 800, textAlign: 'left' }}>
                <CardHeader
                    avatar={
                        <Link style={{ textDecoration: 'none', boxShadow: 'none', color: 'white' }} to={`/users/${userId}`}>
                            <Avatar sx={{ background: 'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)' }} aria-label="recipe">
                                {userName && userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={title}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        onClick={handleLike}
                        aria-label="add to favorites"
                        disabled={disabled}
                    >
                        <FavoriteIcon style={isLiked ? { color: "red" } : null} />
                    </IconButton>
                    {likeCount}
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <MdInsertComment />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed>
                        {error ? "Error occurred" :
                            isLoaded ? (
                                Array.isArray(commentList) && commentList.map((comment) => (
                                    <UserComment key={comment.id} userId={comment.userId} userName={comment.userName || ""} text={comment.text} />
                                ))
                            ) : "Loading..."}
                        {disabled ? "" : <UserCommentForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} postId={postId} setCommentRefresh={setCommentRefresh} />}
                    </Container>
                </Collapse>
            </Card>
        </div>
    );
};

export default Post;
