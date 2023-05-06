import { Box, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Modal, Select, Switch, TextField, Typography } from '@mui/material';
import React from 'react'
import { MdClose } from 'react-icons/md';

const ModalChangePasswordAccount = (props) => {
    const { show, handleClose } = props;

    const handleModalClose = () => {
        handleClose();
    };
    return (
        <Modal open={show} onClose={handleModalClose}>
            <Box className='bg-white w-2/5 mx-auto mt-60 border-none rounded-md'>
                <Box className="flex p-6 justify-between">
                    <Box className="flex">
                        <Box component='img' src={"/image/blackcat.png"} alt="image" className="logo" />
                        <Typography className="!font-black !text-3xl !my-auto KumbhSans color">MeoMeo Bookstore</Typography>
                    </Box>
                    <IconButton className='h-10 close' onClick={handleClose}>
                        <MdClose onClick={handleClose} />
                    </IconButton>
                </Box>
                <Box className='grid justify-center'>
                    <Typography className='text-center !text-4xl color !font-medium'>Đổi mật khẩu</Typography>
                    <Box className="!py-10">
                        <TextField id="outlined-basic" label="Nhập mật khẩu mới" variant="outlined" className='!ml-16 KumbhSans w-3/4' />
                        <TextField id="outlined-basic" label="Nhập lại mật khẩu mới" variant="outlined" className='!ml-16 KumbhSans w-3/4 !mt-4' />
                    </Box>
                    <Box className='flex justify-center py-4'>
                        <Box className="button-out mx-right rounded-md w-fit py-2 px-8 h-fit mr-10 cursor-pointer" onClick={handleClose}>
                            <Typography className='text-center KumbhSans !font-medium'>
                                Xác nhận
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal >
    )
}

export default ModalChangePasswordAccount