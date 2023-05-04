import { Box, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Modal, Select, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import ModalChangePasswordAccount from './ModalChangePasswordAccount';

const ModalEditAccount = (props) => {

    const [showModalChange, setShowModalChange] = useState(false);

    const handleOpenModalChange = () => {
        setShowModalChange(true);
    };

    const { show, handleClose } = props;

    const handleModalClose = () => {
        handleClose();
    };
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInputChange = (event) => {
        setSelectedFile(URL.createObjectURL(event.target.files[0]));
    };
    return (
        <>
            <Modal open={show} onClose={handleModalClose}>
                <Box className='bg-white w-4/5 mx-auto mt-40 border-none rounded-md'>
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
                        <Typography className='text-center !text-4xl color !font-medium'>Chỉnh sửa tài khoản</Typography>
                        <Box className="flex p-12 justify-between">
                            <Box className="w-2/3 mt-10">
                                <Box className="flex justify-between">
                                    <TextField id="outlined-basic" label="Tên tài khoản" variant="outlined" className='!mr-6 KumbhSans' sx={{ width: 3 / 7 }} />
                                    <FormControl sx={{ width: 1 / 5 }}>
                                        <InputLabel className='!bg-white !px-1'>Giới tính</InputLabel>
                                        <Select
                                            label="Giới tính"
                                        >
                                            <MenuItem value="Male">Nam</MenuItem>
                                            <MenuItem value="Female">Nữ</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControlLabel control={<Switch defaultChecked />} label="Admin" className='!ml-4 KumbhSans ' labelPlacement="top" />
                                    <FormControlLabel control={<Switch defaultChecked />} label="Kích hoạt" className='!ml-4 KumbhSans ' labelPlacement="top" />
                                </Box>
                                <Box className="flex mt-4 justify-between">
                                    <TextField id="outlined-basic" label="Họ và tên" variant="outlined" className='KumbhSans' sx={{ width: 5 / 9 }} />
                                    <TextField id="outlined-basic" label="Số điện thoại" variant="outlined" type='number' className='KumbhSans' sx={{ width: 3 / 7 }} />
                                </Box>
                                <Box className="flex mt-4 justify-between">
                                    <TextField id="outlined-basic" label="Ngày sinh" variant="outlined" type='date' InputLabelProps={{ shrink: true }} className='KumbhSans' sx={{ width: 5 / 9 }} />
                                    <TextField id="outlined-basic" label="Email" variant="outlined" type='email' className='KumbhSans' sx={{ width: 3 / 7 }} />
                                </Box>
                                <Box className="flex mt-4">
                                    <TextField id="outlined-basic" label="Địa chỉ" variant="outlined" fullWidth className='KumbhSans !mr-10' multiline rows={4} sx={{ width: 5 / 9 }} />
                                    <Box className='flex !mx-auto'>
                                        <Box className="button-out rounded-md w-fit py-2 px-12 h-fit mr-10 cursor-pointer" onClick={() => handleOpenModalChange()}>
                                            <Typography className='text-center KumbhSans !font-medium'>
                                                Đổi mật khẩu
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="grid justify-center w-1/3 mt-24">
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileInputChange}
                                />
                                <label htmlFor="fileInput">
                                    {selectedFile ? (
                                        <img src={selectedFile} alt="Selected" width="200" className='hover-upload !rounded-full' />
                                    ) : (
                                        <Typography
                                            sx={{ textAlign: 'center', lineHeight: '200px', cursor: 'pointer', width: 200, height: 200 }}
                                            className='hover-upload !rounded-full'
                                        >
                                            Chưa có ảnh đại diện
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
            </Modal >
            <ModalChangePasswordAccount
                handleClose={() => setShowModalChange(false)}
                show={showModalChange} />
        </>
    )
}

export default ModalEditAccount