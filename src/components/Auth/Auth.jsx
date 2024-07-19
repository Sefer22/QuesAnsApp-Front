import React from 'react'
import { FormControl } from '@mui/material'
import { Input } from '@mui/material'
import { InputLabel } from '@mui/material'

function Auth() {
    return (
        <FormControl>
            <InputLabel>Username</InputLabel>
            <Input />
            <InputLabel style={{ top: 80 }}>Password</InputLabel>
            <Input style={{ top: 40 }} />
        </FormControl>
    )
}

export default Auth