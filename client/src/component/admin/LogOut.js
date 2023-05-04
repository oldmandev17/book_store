import { Box, Typography } from '@mui/material'
import React from 'react'

const LogOut = () => {
    return (
        <Box className="flex justify-between p-6">
            <Typography className="color KumbhSans !text-4xl !font-semibold w-fit">MeoMeo BookStore</Typography>
            <Box className="button-out mx-right rounded-md w-fit py-2 px-8 h-fit mr-10 cursor-pointer" >
                <Typography className='text-center KumbhSans !font-medium !text-xl'>
                    Đăng xuất
                </Typography>
            </Box>
        </Box>
    )
}

export default LogOut