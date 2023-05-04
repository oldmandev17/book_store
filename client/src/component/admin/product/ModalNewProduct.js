import { Box, Divider, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Modal, Select, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';

const ModalNewProduct = (props) => {
    const { show, handleClose } = props;

    const handleModalClose = () => {
        handleClose();
    };

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileInputChange = (event) => {
        const files = event.target.files;
        const urls = [];
        for (let i = 0; i < files.length; i++) {
            urls.push(URL.createObjectURL(files[i]));
        }
        setSelectedFiles(urls);
    };
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };


    return (
        <Modal open={show} onClose={handleModalClose}>
            <Box className='bg-white w-3/5 mx-auto mt-40 border-none rounded-md'>
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
                    <Typography className='text-center !text-4xl color !font-medium'>Thêm sản phẩm</Typography>
                    <Box className="flex p-12">
                        <Box className="w-2/3 mt-10">
                            <TextField id="outlined-basic" label="Tên sản phẩm" variant="outlined" className='w-3/5 !mr-6 KumbhSans' />
                            <FormControlLabel control={<Switch defaultChecked />} label="Hiện thị sản phẩm" className='mt-2 !ml-2 KumbhSans ' />
                            <Box className="flex justify-between">
                                <TextField id="outlined-basic" label="Tên tác giả" variant="outlined" className='!mr-6 !mt-4 KumbhSans' sx={{ width: 5 / 9 }} />
                                <FormControl className="!mt-4" sx={{ width: 4 / 10 }}>
                                    <InputLabel className='!bg-white !px-1'>Phân loại </InputLabel>
                                    <Select
                                        value={age}
                                        label="Thể loại"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Giáo khoa</MenuItem>
                                        <MenuItem value={20}>Chính trị</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box className="flex justify-between">
                                <TextField
                                    id="outlined-basic"
                                    label="Giá tiền"
                                    variant="outlined"
                                    className='!mt-4 KumbhSans'
                                    sx={{ width: 5 / 9 }}
                                    InputProps={{
                                        endAdornment: (
                                            <Typography color='GrayText'>VND</Typography>
                                        ),
                                    }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Số lượng"
                                    variant="outlined"
                                    sx={{ width: 4 / 10 }}
                                    className='!mt-4 KumbhSans'
                                    InputProps={{
                                        endAdornment: (
                                            <>
                                                <Divider orientation="vertical" />
                                                <select className='!text-slate-500 !ml-2'>
                                                    <option>--Chọn--</option>
                                                    <option value="">Bộ</option>
                                                    <option value="">Thùng</option>
                                                    <option value="">Hộp</option>
                                                    <option value="">Quyển</option>
                                                </select>
                                            </>
                                        ),
                                    }}
                                />
                            </Box>
                            <TextField id="outlined-basic" label="Mô tả" variant="outlined" className='w-full !mt-4 KumbhSans' multiline rows={2} />
                        </Box>
                        <Box className="flex justify-end w-1/3 h-64 !overflow-x-auto !whitespace-nowrap mt-8">
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange}
                                multiple
                            />
                            <label htmlFor="fileInput">
                                {selectedFiles.length > 0 ? (
                                    selectedFiles.map((url) => (
                                        <img key={url} src={url} alt="Selected" width="200" className='hover-upload' />
                                    ))
                                ) : (
                                    <Typography
                                        sx={{ textAlign: 'center', lineHeight: '200px', cursor: 'pointer', width: 200, height: 200 }}
                                        className='hover-upload'
                                    >
                                        Chưa có hình ảnh
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
    )
}

export default ModalNewProduct