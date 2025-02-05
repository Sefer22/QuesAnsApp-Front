import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { CiLogout } from "react-icons/ci";

function Navbar() {

    let navigate = useNavigate();


    const onClick = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("userName")
        navigate(0);
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
                            {localStorage.getItem("currentUser") == null ? <Link to="/auth">Login/Register</Link> :
                                <div><IconButton style={{ color: '#fff', textDecoration: 'none', boxShadow: 'none' }} onClick={onClick}><CiLogout /></IconButton>
                                    <Link to={{ pathname: '/users/' + localStorage.getItem("currentUser") }}>Profile</Link>
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