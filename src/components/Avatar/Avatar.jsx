import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Radio from '@mui/material/Checkbox';

function Avatar() {

    const [open, setOpen] = useState(false);
    const [checked, setChecked] = React.useState([1]);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
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
                    image="/avatars/avatar0.png"
                    title="User Avatar"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Username
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        User Info
                    </Typography>
                </CardContent>
                <CardActions>
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
                        {[1, 2, 3, 4, 5, 6].map((value) => {
                            const labelId = `checkbox-list-secondary-label-${value}`;
                            return (
                                <ListItem
                                    key={value}
                                    secondaryAction={
                                        <Radio
                                            edge="end"
                                            onChange={handleToggle(value)}
                                            checked={checked.indexOf(value) !== -1}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    }
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`Avatar n°${value}`}
                                                src={`/avatars/${value}.png`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={labelId} primary={`Line item ${value}`} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            </Modal>
        </div>
    )
}

export default Avatar