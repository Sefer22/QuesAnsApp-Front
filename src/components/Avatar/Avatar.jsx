import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

function AvatarComponent() {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(0);

    const handleChange = (event) => {
        setSelectedValue(parseInt(event.target.value, 10));
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <Card sx={{ maxWidth: 345, margin: 50 }}>
                <CardMedia
                    sx={{ height: 280 }}
                    alt="User Avatar"
                    image={`/avatars/avatar/${selectedValue}.jpg`}
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
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 360,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="parent-modal-title" variant="h6" component="h2">
                        Select an Avatar
                    </Typography>
                    <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {[0, 1, 2, 3, 4, 5, 6].map((value) => {
                            const labelId = `radio-list-label-${value}`;
                            return (
                                <ListItem
                                    key={value}
                                    secondaryAction={
                                        <Radio
                                            edge="end"
                                            onChange={handleChange}
                                            checked={selectedValue === value}
                                            value={value}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    }
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`Avatar n°${value + 1}`}
                                                src={`/avatars/avatar/${value}.jpg`}
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
    );
}

export default AvatarComponent;
