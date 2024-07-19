import React from 'react'
import { FormControl } from '@mui/material'
import { Input } from '@mui/material'
import { InputLabel } from '@mui/material'

function Auth() {
    return (
        <FormControl>
            <InputLabel>Username</InputLabel>
            <Input />
            <InputLabel>Password</InputLabel>
            <Input />
        </FormControl>
    )
}

export default Auth