import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function Avatar() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                alt="User Avatar"
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
                <Button size="small">Change Avatar</Button>
            </CardActions>
        </Card>
    );
}

export default Avatar