import Admin from "../../../component/admin";
import { Box, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { BsCheckLg, BsSearch } from "react-icons/bs";
import { MdAdd, MdDeleteOutline } from "react-icons/md";
import ModalDelete from "../../../component/admin/ModalDelete";
import { BiDetail } from "react-icons/bi";
import ModalDetail from "../../../component/admin/bill/ModalDetail";
import { AiOutlineEdit } from "react-icons/ai";
import ModalNewAccount from "../../../component/admin/account/ModalNewAccount";
import ModalEditAccount from "../../../component/admin/account/ModalEditAccount";


export default function Account() {

    const [showModalDelete, setShowModalDelete] = useState(false);

    const [showModalDetail, setShowModalDetail] = useState(false);

    const [showModalNew, setShowModalNew] = useState(false);

    const [showModalEdit, setShowModalEdit] = useState(false);

    const handleOpenModalDelete = () => {
        setShowModalDelete(true);
    };

    const handleOpenModalNew = () => {
        setShowModalNew(true);
    };

    const handleOpenModalEdit = () => {
        setShowModalEdit(true);
    };


    const handleOpenModalDetail = () => {
        setShowModalDetail(true);
    };

    const createData = (
        name,
        nickname,
        phone,
        email,
        updateDate,
        isAdmin,

    ) => {
        return {
            name,
            nickname,
            phone,
            email,
            updateDate,
            isAdmin: isAdmin ? <BsCheckLg className="ml-3" /> : '',
        };
    }
    const columns = ['Họ và tên', 'Tên đăng nhập', 'Số điện thoại', 'Email', 'Ngày cập nhật', 'Admin'];

    const rows = [
        createData('Nguyễn Thị Xuân Thanh', 'thanhcuoi', '038453243', 'nguyenthiuanka2--1@gmail.com', '24/6/2023', true),
        createData('Nguyễn Thị Xuân Thanh', 'thanhcuoi', '038453243', 'nguyenthiuanka2--1@gmail.com', '24/6/2023', true),
        createData('Nguyễn Thị Xuân Thanh', 'thanhcuoi', '038453243', 'nguyenthiuanka2--1@gmail.com', '24/6/2023', false),

    ];
    return (
        <>
            <Admin
                title="Quản lí tài khoản"
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
                                        <MenuItem value={10}>Mã </MenuItem>
                                        <MenuItem value={20}>Họ và tên</MenuItem>
                                        <MenuItem value={30}>Số điện thoại</MenuItem>
                                        <MenuItem value={30}>Email</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    sx={{
                                        bgcolor: '#FCFAFA'
                                    }}
                                    className="w-5/6"
                                    placeholder="Tìm kiếm tài khoản"
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
                        <Box className="flex justify-end mt-8">
                            <Box className="flex button-out mx-right rounded-md w-fit py-2 px-8 h-fit mr-10 cursor-pointer" onClick={() => handleOpenModalNew()}>
                                <MdAdd className="!my-auto text-2xl" />
                                <Typography className='text-center KumbhSans !font-medium !text-xl'>
                                    Thêm tài khoản
                                </Typography>
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
                                                    {key === 'isAdmin' ? row[key] : row[key]}
                                                </TableCell>
                                            ))}
                                            <TableCell className='!text-center'>
                                                <Tooltip title="Chi tiết">
                                                    <IconButton onClick={() => handleOpenModalDetail()}>
                                                        <BiDetail color='blue' />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Chỉnh sửa">
                                                    <IconButton>
                                                        <AiOutlineEdit color='orange' onClick={() => handleOpenModalEdit()} />
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
                            title={
                                <>
                                    <Typography>Bạn thực sự muốn xoá tài khoản này ?</Typography>
                                    <Typography>Thay vào đó hãy thử tắt kích hoạt của tài khoản này.</Typography>
                                </>
                            }
                            content="Xác nhận"
                            type='bill'
                        />
                        <ModalDetail
                            handleClose={() => setShowModalDetail(false)}
                            show={showModalDetail}
                        />
                        <ModalEditAccount
                            handleClose={() => setShowModalEdit(false)}
                            show={showModalEdit}
                        />
                        <ModalNewAccount
                            handleClose={() => setShowModalNew(false)}
                            show={showModalNew}
                        />
                    </>
                }
            />
        </>
    );

}