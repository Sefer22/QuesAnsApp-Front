import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {

    let history = useHistory();

    const onClick = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currenUser")
        localStorage.removeItem("userName")
        history.go(0)
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" style={{ flexGrow: '1', textAlign: 'left' }}>
                            <Link style={{ textDecoration: 'none', boxShadow: 'none', color: 'white' }} to="/">Home</Link>
                        </Typography>
                        <Typography variant="h6">
                            {localStorage.getItem("currentUser") == null ? <Link to="/auth"></Link> :
                                <div><IconButton onClick={onClick}><LockOpen></LockOpen></IconButton>
                                    <Link style={{ textDecoration: 'none', boxShadow: 'none', color: 'white' }} to={{ pathname: '/users' + localStorage.getItem("currentUser") }}>Login/Register</Link>
                                </div>}
                        </Typography>
                        {/* <Link style={{ textDecoration: 'none', boxShadow: 'none', color: 'white' }} to={{ pathname: '/users/' + userId }}></Link> */}
                    </Toolbar>
                </AppBar>
            </Box>
        </div >
    )
}

export default Navbar