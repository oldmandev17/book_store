import { Box, Link, Typography } from '@mui/material'
import React from 'react'

const Menu = (props) => {
    const { icon, title, link } = props
    return (
        <Link href={link} className="!no-underline">
            <Box className="button w-4/5 !mb-2 mx-auto p-2 rounded-md" >
                <Box className="flex ml-8">
                    < Box className='my-auto' >
                        {icon}
                    </Box >
                    <Typography className='!ml-4 font-medium KumbhSans !text-xl'>
                        {title}
                    </Typography>
                </Box >
            </Box >
        </Link>
    )
}
export default Menu