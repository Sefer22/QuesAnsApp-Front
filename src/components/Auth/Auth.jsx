import React, { useState } from 'react'
import { FormControl } from '@mui/material'
import { Input } from '@mui/material'
import { InputLabel, Button, FormHelperText } from '@mui/material'

function Auth() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (value) => {
        setUsername(value);
    }

    const handlePassword = (value) => {
        setPassword(value);
    }

    const handleRegister = () => {

    }

    const handleLogin = () => {

    }

    return (
        <FormControl>
            <InputLabel>Username</InputLabel>
            <Input onChange={(i) = handleUsername(i.target.value)} />
            <InputLabel style={{ top: 80 }}>Password</InputLabel>
            <Input style={{ top: 40 }}
                onChange={(i) => handlePassword(i.target.value)}
            />
            <Button variant="contained"
                style={{
                    marginTop: 60,
                    background: 'linear-gradient(45deg,#2196F3 30%,#21cbf3 90%)',
                    color: 'white'
                }}
                onClick={handleRegister}
            >Register</Button>
            <FormHelperText style={{ margin: 20 }}>Are you already registered?</FormHelperText>
            <Button variant="contained"
                style={{
                    background: 'linear-gradient(45deg,#2196F3 30%,#21cbf3 90%)',
                    color: 'white'
                }}
                onClick={handleLogin}
            >Login</Button>
        </FormControl>
    )
}

export default Auth