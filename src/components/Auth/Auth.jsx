import React from 'react'
import { FormControl } from '@mui/material'
import { Input } from '@mui/material'
import { InputLabel, Button } from '@mui/material'

function Auth() {
    return (
        <FormControl>
            <InputLabel>Username</InputLabel>
            <Input />
            <InputLabel style={{ top: 80 }}>Password</InputLabel>
            <Input style={{ top: 40 }} />
            <Button variant="contained"
                style={{
                    marginTop: 60,
                    background: 'linear-gradient(45deg,#2196F3 30%,#21cbf3 90%)',
                    color: 'white'
                }}
            >Register</Button>
        </FormControl>
    )
}

export default Auth