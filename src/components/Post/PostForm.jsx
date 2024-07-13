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
import Button from '@mui/material';

const theme = createTheme();

const ExpandMore = styled((props) => <IconButton {...props} />)(({ theme, expand }) => ({
    // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const PostForm = (props) => {
    const { title, text, userId, userName } = props;
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleLike = () => {
        setLiked(!liked);
    }

    return (
        <div className='postContainer'>
            <Card sx={{ maxWidth: 800, textAlign: 'left' }}>
                <CardHeader
                    avatar={
                        <Link style={{ textDecoration: 'none', boxShadow: 'none', color: 'white' }} to={{ pathname: '/users' + userId }}>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={<OutlinedInput id='outlined-adornment-amount' multiline placeholder='Title'
                        inputProps={{ maxLength: 25 }} fullWidth>

                    </OutlinedInput>}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {<OutlinedInput id='outlined-adornment-amount' multiline placeholder='Text'
                            inputProps={{ maxLength: 250 }} fullWidth
                            endAdornment={
                                <InputAdorment position='end'>
                                    <Button></Button>
                                </InputAdorment>
                            }
                        >
                        </OutlinedInput>}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        onClick={handleLike}
                        aria-label="add to favorites">
                        <FavoriteIcon style={liked ? { color: 'red' } : null} />
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
                    <CardContent>

                    </CardContent>
                </Collapse>
            </Card>
            {/* {title}
            {text} */}
        </div>
    );
};

export default PostForm;
