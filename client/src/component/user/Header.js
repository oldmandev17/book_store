import styled from '@emotion/styled';
import { Box, IconButton, InputAdornment, InputBase, TextField, Typography, alpha } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { MdAccountCircle, MdOutlineNotificationsNone } from 'react-icons/md';
import { BsCart2, BsFillHeartFill, BsSearch } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';

const Header = () => {
    return (
        <Box className="Background flex p-4 justify-between">
            <Box className="flex">
                <Box component='img' src={"/image/whitecat.png"} alt="image" className="logo" />
                <Typography className="text-white !text-3xl !my-auto !font-['Ysabeau']">MeoMeo</Typography>
            </Box>
            <Box className="flex justify-end my-auto w-1/2">
                <TextField
                    className='bg-white h-fit justify-end w-2/3 !mr-4 !mt-2 rounded'
                    placeholder='Hãy tìm kiếm cuốn sách cho riêng mình'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment className='ml-2 mr-2'>
                                <BsSearch />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                />
                <Box className='flex !my-auto'>
                    <IconButton className='!text-white !text-3xl'>
                        <BsCart2 />
                    </IconButton>
                    <IconButton className='!text-white !text-3xl'>
                        <AiFillHeart />
                    </IconButton>
                    <IconButton className='!text-white !text-3xl'>
                        <MdOutlineNotificationsNone />
                    </IconButton>
                    <Box component='img' src={"/image/image.png"} alt="image" className='mt-2 rounded-full' sx={{ height: 35, width: 35 }} />
                </Box>
            </Box>
        </Box >
    )
}

export default Header