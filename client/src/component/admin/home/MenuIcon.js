import { Box, Link, Typography } from '@mui/material'
import React from 'react'

const MenuIcon = (props) => {
    const { icon, title, link } = props
    return (
        <Box className="w-fit cursor-pointer mx-auto" >
            <Link href={link} className="!no-underline w-fit cursor-pointer mx-auto">
                <Box className="button-menu mx-auto color rounded-md xl p-4">
                    {icon}
                </Box>
                <Typography className="!text-3xl !mt-4 !text-slate-600 text-center">{title}</Typography>
            </Link>
        </Box >
    )
}

export default MenuIcon