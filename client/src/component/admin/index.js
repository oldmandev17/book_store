import { Box, Typography } from '@mui/material'
import React from 'react'
import Sidebar from './Sidebar'
import LogOut from './LogOut'

const Admin = (props) => {
    const { content, title } = props;
    return (
        <Box className="flex" sx={{ height: '100%', width: '100%' }}>
            <Sidebar sx={{ width: 2 / 13 }} />
            <Box sx={{ width: 11 / 13, height: 'fit-content' }}>
                <LogOut />
                <Box className="p-6">
                    <Typography className="text-center !text-4xl color !font-semibold">{title}</Typography>
                    {content}
                </Box>
            </Box>
        </Box>
    )
}

export default Admin