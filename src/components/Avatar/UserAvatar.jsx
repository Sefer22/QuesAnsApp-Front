import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MaterialAvatar from '@mui/material/Avatar';
import { PutWithAuth } from '../services/HttpService';

function UserAvatar(props) {
    const { avatarId, userId, userName } = props;
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(avatarId);

    const saveAvatar = () => {
        PutWithAuth("http://localhost:8080/users/" + localStorage.getItem("currentUser"), {
            avatar: selectedValue,
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        saveAvatar();
    };

    const handleChange = (event) => {
        setSelectedValue(parseInt(event.target.value));
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 300 }}
                    image={`/avatars/avatar${selectedValue}.png`}
                    title="User Avatar"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        User Info
                    </Typography>
                </CardContent>
                <CardActions>
                    {localStorage.getItem("currentUser") == userId ? <Button size="small" onClick={handleOpen}>Change Avatar</Button> : ""}
                    <Button size="small" onClick={handleOpen}>Change Avatar</Button>
                </CardActions>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <RadioGroup
                            aria-labelledby="avatar-radio-group-label"
                            name="avatar-radio-group"
                            value={selectedValue}
                            onChange={handleChange}
                        >
                            {[0, 1, 2, 3, 4, 5, 6].map((value) => {
                                const labelId = `radio-list-label-${value}`;
                                return (
                                    <ListItem key={value} disablePadding>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <MaterialAvatar
                                                    alt={`Avatar n°${value}`}
                                                    src={`/avatars/avatar${value}.png`}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText id={labelId} primary={`Avatar ${value}`} />
                                            <FormControlLabel
                                                value={value}
                                                control={<Radio />}
                                                label=""
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </RadioGroup>
                    </List>
                </Box>
            </Modal>
        </div>
    );
}

export default UserAvatar;
