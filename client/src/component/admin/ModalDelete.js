import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import React from 'react'
import { AiOutlineCloseCircle, AiOutlineQuestionCircle, AiOutlineWarning } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';

const ModalDelete = (props) => {
    const { show, handleClose, title, content } = props;

    const handleModalClose = () => {
        handleClose();
    };

    return (
        <Modal open={show} onClose={handleModalClose}>
            <Box className='bg-white w-1/3 mx-auto mt-60 rounded'>
                <Box className="flex p-6 justify-between">
                    <Box className="flex">
                        <AiOutlineQuestionCircle size={40} color='blue' className='mx-auto' />
                        <Typography className='!text-4xl color !font-medium'>{content}</Typography>
                    </Box>
                </Box>
                <Box className='p-2'>
                    <Typography className='text-center p-4'>{title}</Typography>
                    <Box className='flex justify-end py-4 mr-4'>
                        <Button className='button-back !mr-4 !px-5' onClick={handleClose}>Huỷ bỏ</Button>
                        <Button className='button !px-4' onClick={handleClose} >Xác nhận</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalDelete