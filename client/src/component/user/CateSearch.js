import { Box, Checkbox, FormControlLabel, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import { BsSearch } from 'react-icons/bs'

const CateSearch = () => {
    return (
        <Box className="Background mt-10 w-1/6 rounded ml-6">
            <Box className="px-5 w-full mt-12">
                <TextField
                    className='bg-white h-fit rounded  w-full'
                    placeholder='Tìm kiếm'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment className='ml-2 mr-2'>
                                <BsSearch />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                />
            </Box>
            <Box className="px-5 py-12 px-3 text-white">
                <Typography>Thế loại nổi bật</Typography>
                <Box className="grid grid-cols-1 ml-4">
                    <FormControlLabel control={<Checkbox />} label="Sách văn học" />
                    <FormControlLabel control={<Checkbox />} label="Tiểu thuyết" />
                    <FormControlLabel control={<Checkbox />} label="Sách thiếu nhi" />
                    <FormControlLabel control={<Checkbox />} label="Sách kỹ năng sống" />
                    <FormControlLabel control={<Checkbox />} label="Sách khoa học kỹ thuật" />
                    <FormControlLabel control={<Checkbox />} label="Sách lịch sử" />
                    <FormControlLabel control={<Checkbox />} label="Sách tham khảo" />
                    <FormControlLabel control={<Checkbox />} label="Truyện tranh" />
                    <FormControlLabel control={<Checkbox />} label="Sách y học" />
                </Box>
            </Box>
            <Box className="px-5 mb-12 px-3 text-white">
                <Typography>English Book</Typography>
                <Box className="grid grid-cols-1 ml-4">
                    <FormControlLabel control={<Checkbox />} label="Memory books" />
                    <FormControlLabel control={<Checkbox />} label="Novels" />
                    <FormControlLabel control={<Checkbox />} label="Story Books" />
                    <FormControlLabel control={<Checkbox />} label="Travel Books" />
                    <FormControlLabel control={<Checkbox />} label="Poetry Books" />
                    <FormControlLabel control={<Checkbox />} label="Biography Books" />
                    <FormControlLabel control={<Checkbox />} label="Religious books" />
                    <FormControlLabel control={<Checkbox />} label="Knowledge" />
                    <FormControlLabel control={<Checkbox />} label="Comics" />
                </Box>
            </Box>
        </Box >
    )
}

export default CateSearch