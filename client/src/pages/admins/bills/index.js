import Admin from "../../../component/admin";
import { Box, Divider, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import TableList from "../../../component/admin/TableList";
import ModalNewProduct from "../../../component/admin/product/ModalNewProduct";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdAdd, MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import ModalDelete from "../../../component/admin/ModalDelete";
import { BiDetail } from "react-icons/bi";
import ModalDetail from "../../../component/admin/bill/ModalDetail";


export default function Bill() {

    const [showModalDelete, setShowModalDelete] = useState(false);

    const [showModalDetail, setShowModalDetail] = useState(false);

    const handleOpenModalDelete = () => {
        setShowModalDelete(true);
    };


    const handleOpenModalDetail = () => {
        setShowModalDetail(true);
    };

    const createData = (
        id,
        cash,
        form,
        cashDate

    ) => {
        return {
            id,
            cash,
            form,
            cashDate
        };
    }
    const columns = ['Mã đơn hàng', 'Thành tiền', 'Hình thức thanh toán', 'Ngày thanh toán'];

    const rows = [
        createData(1, '3000 VND', 'ZaloPay', '24/6/2022'),
        createData(2, '3000 VND', 'ZaloPay', '24/6/2022'),

    ];
    return (
        <>
            <Admin
                title="Quản lí hoá đơn"
                content={
                    <>
                        <Box className="flex mt-8 !w-full !p-8">
                            <Box className="flex w-full justify-end">
                                <FormControl sx={{ width: 1 / 8, bgcolor: '#FCFAFA' }} className="!mr-1">
                                    <InputLabel className='!bg-white'>Loại tìm kiếm</InputLabel>
                                    <Select
                                        label="Thể loại"
                                    >
                                        <MenuItem value={0} default>Tất cả</MenuItem>
                                        <MenuItem value={10}>Mã hoá đơn</MenuItem>
                                        <MenuItem value={20}>Tên sản phẩm</MenuItem>
                                        <MenuItem value={30}>Tác giả</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    sx={{
                                        bgcolor: '#FCFAFA'
                                    }}
                                    className="w-5/6"
                                    placeholder="Tìm kiếm hoá đơn"
                                    InputProps={{
                                        startAdornment: (
                                            <>
                                                <BsSearch />
                                            </>
                                        ),
                                    }} t

                                />
                            </Box>
                        </Box>
                        <TableContainer component={Paper} className='p-12 mt-8'>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column, index) => (
                                            <TableCell key={index} className='!text-left !font-bold KumbhSans'>{column}</TableCell>
                                        ))}
                                        <TableCell className='!text-center !font-semibold KumbhSans'>Thao tác</TableCell>
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
                                            <TableCell className='!text-center'>
                                                <Tooltip title="Chi tiết">
                                                    <IconButton onClick={() => handleOpenModalDetail()}>
                                                        <BiDetail color='blue' />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Xoá">
                                                    <IconButton onClick={() => handleOpenModalDelete()}>
                                                        <MdDeleteOutline color='red' />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer >
                        <ModalDelete
                            handleClose={() => setShowModalDelete(false)}
                            show={showModalDelete}
                            title="Bạn thực sự muốn xoá hoá đơn này ?"
                            content="Xác nhận"
                            type='bill'
                        />
                        <ModalDetail
                            handleClose={() => setShowModalDetail(false)}
                            show={showModalDetail}
                        />
                    </>
                }
            />
        </>
    );

}