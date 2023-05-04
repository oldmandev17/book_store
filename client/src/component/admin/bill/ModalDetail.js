import { Box, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { MdClose } from 'react-icons/md';

const ModalDetail = (props) => {
    const { show, handleClose } = props;

    const handleModalClose = () => {
        handleClose();
    };

    const createData = (
        id,
        product,
        cash,
        quanlity,
        payment,

    ) => {
        return {
            id,
            product,
            cash,
            quanlity,
            payment,
        };
    }
    const columns = ['Mã sản phẩm', 'Tên sản phẩm', 'Đơn giá', 'Số lượng', 'Thành tiền'];

    const rows = [
        createData(1, 'Tú hú trên đồi Tu Hú', '400000 VND', 2, '24/6/2022'),
        createData(2, 'Tú hú trên đồi Tu Hú', '400000 VND', 2, '24/6/2022'),

    ];
    return (
        <Modal open={show} onClose={handleModalClose}>
            <Box className='bg-white w-3/5 mx-auto mt-60 border-none rounded-md'>
                <Box className="flex p-6 justify-between">
                    <Box className="flex">
                        <Box component='img' src={"/image/blackcat.png"} alt="image" className="logo" />
                        <Typography className="!font-black !text-3xl !my-auto KumbhSans color">MeoMeo Bookstore</Typography>
                    </Box>
                    <IconButton className='h-10 close' onClick={handleClose}>
                        <MdClose onClick={handleClose} />
                    </IconButton>
                </Box>
                <Box className='p-2'>
                    <Typography className='text-center !text-4xl color !font-medium'>Chi tiết hoá đơn</Typography>
                </Box>
                <TableContainer component={Paper} className='p-12'>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell key={index} className='!text-left !font-bold KumbhSans'>{column}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {Object.keys(row).map((key, cellIndex) => (
                                        <TableCell key={cellIndex} align="left">
                                            {row[key]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer >
            </Box>
        </Modal>
    )
}

export default ModalDetail