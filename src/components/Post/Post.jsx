import React, { useState, useRef, useEffect } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
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
import { Link } from 'react-router-dom'
import { Container } from '@mui/material';
import UserComment from '../Comment/UserComment';
import UserCommentForm from '../Comment/UserCommentForm';

const theme = createTheme();

const ExpandMore = styled((props) => <IconButton {...props} />)(({ theme, expand }) => ({
    // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
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

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            setLikeCount(likeCount + 1);
        } else {
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

    const checkLikes = () => {
        var likeControl = likes.find((like) => like.userId === userId);
        if (likeControl != null)
            setIsLiked(true);
    }

    useEffect(() => {
        if (isInitialMount.current)
            isInitialMount.current = false;
        else
            refreshComments();
    }, [commentList])

    useEffect(() => { checkLikes() }, [])

    return (
        <div className='postContainer'>
            <Card sx={{ maxWidth: 800, textAlign: 'left' }}>
                <CardHeader
                    avatar={
                        <Link style={{ textDecoration: 'none', boxShadow: 'none', color: 'white' }} to={`/users/${userId}`}>
                            <Avatar sx={{ background: 'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)' }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
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
                        aria-label="add to favorites">
                        <FavoriteIcon style={isLiked ? { color: 'red' } : null} />
                        <IconButton>
                            {likeCount}
                        </IconButton>
                    </IconButton>
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
                                    <UserComment userId={1} userName={"USER"} text={comment.text}></UserComment>
                                ))
                            ) : "Loading..."}
                        <UserCommentForm userId={1} userName={"USER"} postId={postId}></UserCommentForm>
                    </Container>
                </Collapse>
            </Card>
            {/* {title}0
            {text} */}
        </div>
    );
};

export default Post;
