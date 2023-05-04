import Admin from "../../../component/admin";
import { Box, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import TableList from "../../../component/admin/TableList";
import ModalNewProduct from "../../../component/admin/product/ModalNewProduct";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdAdd } from "react-icons/md";


export default function Product() {

    const [showModalNew, setShowModalNew] = useState(false);

    const handleOpenModalNew = () => {
        setShowModalNew(true);
    };
    const createData = (
        id,
        name,
        author,
        cate,
        money,
        quanlity,
        updateDate,
    ) => {
        return {
            id,
            name,
            author,
            cate,
            money,
            quanlity,
            updateDate,
        };
    }
    const columns = ['Mã sản phẩm', 'Tên sản phẩm', 'Tác giả', 'Phân loại', 'Đơn giá', 'Số lượng tồn', 'Ngày cập nhật'];

    const rows = [
        createData(1, 'Frozen yoghurt', 'Thanh', 'Con người', 30000, 15, '24/6/2022'),
        createData(1, 'Frozen yoghurt', 'Thanh', 'Con người', 30000, 15, '24/6/2022'),
        createData(1, 'Frozen yoghurt', 'Thanh', 'Con người', 30000, 15, '24/6/2022'),
        createData(1, 'Frozen yoghurt', 'Thanh', 'Con người', 30000, 15, '24/6/2022'),
        createData(1, 'Frozen yoghurt', 'Thanh', 'Con người', 30000, 15, '24/6/2022'),
        createData(1, 'Frozen yoghurt', 'Thanh', 'Con người', 30000, 15, '24/6/2022'),
    ];
    return (
        <>
            <Admin
                title="Quản lí sản phẩm"
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
                                        <MenuItem value={10}>Mã sản phẩm</MenuItem>
                                        <MenuItem value={20}>Tên sản phẩm</MenuItem>
                                        <MenuItem value={30}>Tác giả</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    sx={{
                                        bgcolor: '#FCFAFA'
                                    }}
                                    className="w-5/6"
                                    placeholder="Tìm kiếm sản phẩm"
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
                        <Box className="flex justify-end mr-8">
                            <Box className="flex button-out rounded-md w-1/7 py-2 px-8 h-fitcursor-pointer" onClick={handleOpenModalNew}>
                                <MdAdd className="!my-auto text-2xl" />
                                <Typography className='text-center KumbhSans !text-xl'>
                                    Thêm sản phẩm
                                </Typography>
                            </Box>
                        </Box>
                        <TableList createData={createData} rows={rows} columns={columns} type="product" />
                        <ModalNewProduct
                            handleClose={() => setShowModalNew(false)}
                            show={showModalNew}
                        />
                    </>
                }
            />
        </>
    );

}