import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Admin from "../../../component/admin";
import TableList from "../../../component/admin/TableList";
import { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import ModalNewCate from "../../../component/admin/cate/ModalList/ModalNewCate";
import { BsSearch } from "react-icons/bs";
import { MdAdd } from "react-icons/md";

export default function Category() {

    const [showModalNew, setShowModalNew] = useState(false);


    const handleOpenModalNew = () => {
        setShowModalNew(true);
    };

    const createData = (
        id,
        name,
        description,
        icon,
        updateDate,
    ) => {
        return { id, name, description, icon, updateDate };
    }

    const columns = ['Mã thể loại', 'Tên thể loại', 'Mô tả', 'Icon', 'Ngày cập nhật'];

    const rows = [
        createData(1, 'Frozen yoghurt', 'Đây là giày', <AiOutlineSetting className="" />, '24/6/2022'),
        createData(2, 'Thanh Thanh', 'lp', 'hihi', '24/6/2022'),
    ];
    return (
        <>
            <Admin
                title="Quản lí thể loại"
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
                        <Box className="flex justify-end mt-8">
                            <Box className="flex button-out mx-right rounded-md w-fit py-2 px-8 h-fit mr-10 cursor-pointer" onClick={handleOpenModalNew}>
                                <MdAdd className="!my-auto text-2xl" />
                                <Typography className='text-center KumbhSans !font-medium !text-xl'>
                                    Thêm thể loại
                                </Typography>
                            </Box>
                        </Box>
                        <TableList createData={createData} rows={rows} columns={columns} type="category" />
                        <ModalNewCate
                            handleClose={() => setShowModalNew(false)}
                            show={showModalNew}
                        />
                    </>
                }
            />
        </>
    );
}