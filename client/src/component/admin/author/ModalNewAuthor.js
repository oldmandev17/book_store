import { Box, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Modal, Select, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';

const ModalNewAuthor = (props) => {
    const { show, handleClose } = props;

    const handleModalClose = () => {
        handleClose();
    };
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInputChange = (event) => {
        setSelectedFile(URL.createObjectURL(event.target.files[0]));
    };
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
                    <Typography className='text-center !text-4xl color !font-medium'>Thêm tác giả</Typography>
                    <Box className="flex p-12">
                        <Box className="w-2/3 mt-10">
                            <TextField id="outlined-basic" label="Tên tác giả" variant="outlined" className='w-2/3 !mr-6 KumbhSans' />
                            <FormControlLabel control={<Switch defaultChecked />} label="Hiện thị tác giả" className='mt-2 !ml-4 KumbhSans ' />
                            <TextField id="outlined-basic" label="Ngày sinh" variant="outlined" type='date' InputLabelProps={{ shrink: true }} className='w-2/3 !mr-6 !mt-4 KumbhSans' />
                            <FormControl sx={{ width: 3 / 11 }} className='!ml-4 !mt-4'>
                                <InputLabel className='!bg-white !px-1'>Giới tính</InputLabel>
                                <Select
                                    label="Giới tính"
                                >
                                    <MenuItem value="Male">Nam</MenuItem>
                                    <MenuItem value="Female">Nữ</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField id="outlined-basic" label="Mô tả" variant="outlined" className='w-full !mt-4 KumbhSans' multiline rows={2} />
                        </Box>
                        <Box className="grid justify-end w-1/3 mt-6">
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange}
                            />
                            <label htmlFor="fileInput">
                                {selectedFile ? (
                                    <img src={selectedFile} alt="Selected" width="200" className='hover-upload' />
                                ) : (
                                    <Typography
                                        sx={{ textAlign: 'center', lineHeight: '200px', cursor: 'pointer', width: 200, height: 200 }}
                                        className='hover-upload'
                                    >
                                        Chưa có ảnh được chọn
                                    </Typography>
                                )}
                            </label>
                        </Box>
                    </Box>
                    <Box className='flex justify-end py-4'>
                        <Box className="button-out mx-right rounded-md w-fit py-2 px-8 h-fit mr-10 cursor-pointer" onClick={handleClose}>
                            <Typography className='text-center KumbhSans !font-medium'>
                                Xác nhận
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalNewAuthor