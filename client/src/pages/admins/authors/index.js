import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Admin from "../../../component/admin";
import TableList from "../../../component/admin/TableList";
import { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import ModalNewCate from "../../../component/admin/cate/ModalList/ModalNewCate";
import { BsSearch } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import ModalNewAuthor from "../../../component/admin/author/ModalNewAuthor";

export default function Author() {

    const [showModalNew, setShowModalNew] = useState(false);


    const handleOpenModalNew = () => {
        setShowModalNew(true);
    };

    const createData = (
        name,
        year,
        updateDate,

    ) => {
        return {
            name,
            year,
            updateDate,
        };
    }

    const columns = ['Tên tác giả', 'Năm sinh', 'Ngày cập nhật'];

    const rows = [
        createData('Helen', 2001, '24/6/2021'),
    ];
    return (
        <>
            <Admin
                title="Quản lí tác giả"
                content={
                    <>
                        <Box className="flex mt-8 !w-full !p-8">
                            <Box className="flex w-full justify-end ">
                                <FormControl sx={{ width: 1 / 8, bgcolor: '#FCFAFA' }} className="!mr-1">
                                    <InputLabel className='!bg-white'>Loại tìm kiếm</InputLabel>
                                    <Select
                                        label="Tác giả"
                                    >
                                        <MenuItem value={0} default>Tất cả</MenuItem>
                                        <MenuItem value={30}>Tác giả</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    sx={{
                                        bgcolor: '#FCFAFA'
                                    }}
                                    className="w-5/6"
                                    placeholder="Tìm kiếm tác giả"
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
                                    Thêm tác giả
                                </Typography>
                            </Box>
                        </Box>
                        <TableList createData={createData} rows={rows} columns={columns} type="author" />
                        <ModalNewAuthor
                            handleClose={() => setShowModalNew(false)}
                            show={showModalNew}
                        />
                    </>
                }
            />
        </>
    );
}