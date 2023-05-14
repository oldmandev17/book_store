import { Box, Button, Divider, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai'
import { MdAdd, MdAddCircleOutline, MdRemove, MdRemoveCircleOutline } from 'react-icons/md';
import { BsCart2 } from 'react-icons/bs';
import { MuiThemeProvider, createTheme } from '@mui/material/styles';
import { Editor } from 'mui-rte';


const DetailProduct = () => {
    const [quantity, setQuantity] = useState(1);

    const theme = createTheme();

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleQuantityBlur = (event) => {
        const input = event.target.value.trim();
        const newQuantity = input === "" ? 1 : parseInt(input, 10);
        setQuantity(isNaN(newQuantity) ? 1 : newQuantity);
    };

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const defaultImage = '/image/shin.jpg';

    const [isZoomed, setIsZoomed] = useState(false);

    const handleMouseEnter = () => {
        setIsZoomed(true);
    };

    const handleMouseLeave = () => {
        setIsZoomed(false);
    };

    const createData = (
        name,
        description,

    ) => {
        return {
            name,
            description,
        };
    }

    const rows = [
        createData('Công ty phát hành', 'SaigonBokk'),
        createData('Ngày xuất bản', '2022-06-01'),

    ];

    return (
        <>
            <Box className="mx-auto bg-white !rounded py-16" sx={{ width: 6 / 7 }}>
                <Box className="flex justify-between w-full px-20">
                    <Box className="w-1/4 mx-auto">
                        {selectedImage ?
                            <Box
                                component="img"
                                src={selectedImage}
                                sx={{ height: 500 }}
                            />
                            :
                            <Box
                                component="img"
                                src={defaultImage}
                                sx={{ height: 500 }}
                            />
                        }
                        <Box className="flex mt-2 justify-center">
                            <Box component="img" src="/image/shin.jpg" className={`px-1 ${selectedImage === '/image/shin.jpg' ? 'border border-blue-500' : ''}`} sx={{ height: 100 }} onClick={() => handleImageClick('/image/shin.jpg')} />
                            <Box component="img" src="/image/shin-2.png" className={`px-1 ${selectedImage === '/image/shin-2.png' ? 'border border-blue-500' : ''}`} sx={{ height: 100 }} onClick={() => handleImageClick('/image/shin-2.png')} />
                            <Box component="img" src="/image/shin-3.jpg" className={`px-1 ${selectedImage === '/image/shin-3.jpg' ? 'border border-blue-500' : ''}`} sx={{ height: 100 }} onClick={() => handleImageClick('/image/shin-3.jpg')} />
                        </Box>
                    </Box>
                    <Box className="w-3/5 ml-20 !leading-9">
                        <Typography className="!font-bold !text-2xl">Shin - Cậu bé bút chì tập 1 (Bản đặc biệt kỷ niệm 10 năm ra mắt có quà tặng kèm)</Typography>
                        <Typography className="py-4">Tác giả : <Link className='!no-underline'>Nguyễn Bích Loan</Link></Typography>
                        <Box className="flex">
                            <Box className='flex mr-2 h-full'>4.1 <AiFillStar color="yellow" className="my-auto" /></Box>
                            <Divider orientation="vertical" flexItem />
                            <Box className="px-2">10 đánh giá</Box>
                            <Divider orientation="vertical" flexItem />
                            <Box className="px-2">Đã bán 34</Box>
                        </Box>
                        <Box className="flex w-full bg-slate-50 mt-12 p-4">
                            <Typography color="red" className='!text-lg !mr-6 !my-auto line-through !font-bold'>165.000 đ</Typography>
                            <Typography color="red" className='!text-4xl'>99.000 đ</Typography>
                        </Box>
                        <Box className="flex py-8">
                            <Typography className='!my-auto'>
                                Số lượng :
                            </Typography>
                            <Box className="flex px-4">
                                <Box className="flex w-1/4 border-solid border ml-4 mr-6">
                                    <button onClick={decreaseQuantity}>
                                        <MdRemove className='px-1 text-xl' />
                                    </button>
                                    <Box className="w-full ml-2 mr-2">
                                        <input
                                            min="1"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            name="numberformat"
                                            variant="standard"
                                            onBlur={handleQuantityBlur}
                                            className='!text-center w-full'
                                        />
                                    </Box>
                                    <button onClick={increaseQuantity}>
                                        <MdAdd className='px-1 text-xl' />
                                    </button>
                                </Box>
                                <Typography className='text-slate-400 !my-auto'>
                                    12 sản phẩm có sẵn
                                </Typography>
                            </Box>
                        </Box>
                        <Box className="flex justify-between w-2/5">
                            <Box className="flex button-out w-fit py-2 px-3">
                                <BsCart2 className='text-xl my-auto mr-2' />
                                Thêm vào giỏ hàng
                            </Box>
                            <Box className="flex button-out w-fit py-2 px-3">
                                <AiOutlineHeart className='text-xl my-auto mr-2' />
                                Thêm yêu thích
                            </Box>
                        </Box>
                        <Box className="button-out w-2/5 mt-3 py-2 px-3 text-center text-xl">
                            CHỌN MUA
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="mx-auto" sx={{ width: 6 / 7 }}>
                <Box className="bg-white !rounded py-16 mt-6 px-20" sx={{ width: 5 / 7 }}>
                    <Typography className='!text-2xl'>CHI TIẾT SẢN PHẨM</Typography>
                    <TableContainer component={Paper} className='p-12 mt-8 !w-fit'>
                        <Table sx={{ minWidth: 650 }} aria-label="simple tabl">
                            <TableBody>
                                {rows.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {Object.keys(row).map((key, cellIndex) => (
                                            <TableCell key={cellIndex} className={cellIndex === 1 ? 'gray-column' : ''}
                                                style={{ width: cellIndex === 0 ? '40%' : '60%' }}>
                                                {row[key]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer >
                </Box>
            </Box>
            <Box className="mx-auto" sx={{ width: 6 / 7 }}>
                <Box className="bg-white !rounded py-16 mt-6 px-20" sx={{ width: 5 / 7 }}>
                    <Typography className='!text-2xl'>MÔ TẢ SẢN PHẨM</Typography>
                    <></>
                </Box>
            </Box>
        </>
    )
}

export default DetailProduct