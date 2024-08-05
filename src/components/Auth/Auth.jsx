import React, { useState } from 'react'
import { Box, FormControl } from '@mui/material'
import { Input } from '@mui/material'
import { InputLabel, Button, FormHelperText } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { PostWithoutAuth } from '../../services/HttpService'

function Auth() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const handleUsername = (value) => {
        setUsername(value);
    }

    const handlePassword = (value) => {
        setPassword(value);
    }

    const sendRequest = async (path) => {
        PostWithoutAuth("http://localhost:8080/auth/" + path, {
            userName: username,
            password: password,
        })
            .then((res) => res.json())
            .then((result) => {
                localStorage.setItem("tokenKey", result.accessToken);
                localStorage.setItem("refreshKey", result.refreshToken);
                localStorage.setItem("currentUser", result.userId);
                localStorage.setItem("userName", username)
            })
            .catch((err) => console.log(err))
    }

    const handleButton = (path) => {
        sendRequest(path)
        setUsername("")
        setPassword("")
        navigate("/auth")
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" style={{ marginTop: '15px' }}>
            <FormControl margin="normal" fullWidth>
                <InputLabel>Username</InputLabel>
                <Input value={username} onChange={(i) => handleUsername(i.target.value)} />
            </FormControl>
            <FormControl margin="normal" fullWidth>
                <InputLabel>Password</InputLabel>
                <Input type="password" value={password} onChange={(i) => handlePassword(i.target.value)} />
            </FormControl>
            <Button variant="contained"
                style={{
                    marginTop: 60,
                    background: 'linear-gradient(45deg,#2196F3 30%,#21cbf3 90%)',
                    color: 'white'
                }}
                onClick={() => handleButton("register")}
            >Register</Button>
            <FormHelperText style={{ margin: 20 }}>Are you already registered?</FormHelperText>
            <Button variant="contained"
                style={{
                    background: 'linear-gradient(45deg,#2196F3 30%,#21cbf3 90%)',
                    color: 'white'
                }}
                onClick={() => handleButton("login")}
            >Login</Button>
        </Box>
    )
}

export default Auth