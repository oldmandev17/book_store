import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

function ModalEmail(props) {
    const { show, handleClose, title } = props;

    const handleModalClose = () => {
        handleClose();
    };

    return (
        <Modal open={show} onClose={handleModalClose}>
            <Box className='bg-white w-1/3 mx-auto mt-60 rounded'>
                <Box className="flex">
                    <Box component='img' src={"/image/blackcat.png"} alt="image" className="logo" />
                    <Typography className="!font-black !text-3xl !my-auto !font-['Ysabeau']">MeoMeo</Typography>
                </Box>
                <Box className='p-2'>
                    <Typography className='text-center'>{title}</Typography>
                    <Box className='flex justify-center py-4'>
                        <Button className='button' onClick={handleClose}>Xác nhận</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalEmail;
