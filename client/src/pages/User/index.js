import React, { useState } from "react";
import '../../index.css';
import User from "../../component/user";
import { Box, Checkbox, FormControlLabel, InputAdornment, Link, Pagination, TextField, Typography } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import SlideShow from "../../component/SlideShow";
import ProductList from "../../component/user/ProductList";
import CateSearch from "../../component/user/CateSearch";


export default function MainUSer() {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 15;
    const totalProducts = 50;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    const productList = [
        {
            srcimg: "/image/doremon.jpg",
            name: "Doraemon - Chú Mèo Máy Đến Từ Tương Lai Tập 11",
            star: "4.5",
            sold: "14",
            price: "17.500 đ",
        },
        {
            srcimg: "/image/shin.jpg",
            name: "Cậu bé bút chì tập 1 (Bản đặc biệt kỷ niệm 10 năm ra mắt có quà tặng kèm)",
            star: "5.0",
            sold: "1",
            price: "17.500 đ",
        },
        {
            srcimg: "/image/conan.jpg",
            name: "Thám tử lừng danh Conan tập 100",
            star: "0.0",
            sold: "4",
            price: "17.500 đ",
        },
        {
            srcimg: "/image/doremon.jpg",
            name: "Doraemon - Chú Mèo Máy Đến Từ Tương Lai Tập 11",
            star: "4.5",
            sold: "14",
            price: "17.500 đ",
        },
        {
            srcimg: "/image/shin.jpg",
            name: "Cậu bé bút chì tập 1 (Bản đặc biệt kỷ niệm 10 năm ra mắt có quà tặng kèm)",
            star: "5.0",
            sold: "1",
            price: "17.500 đ",
        },
        {
            srcimg: "/image/conan.jpg",
            name: "Thám tử lừng danh Conan tập 100",
            star: "0.0",
            sold: "4",
            price: "17.500 đ",
        },
        {
            srcimg: "/image/doremon.jpg",
            name: "Doraemon - Chú Mèo Máy Đến Từ Tương Lai Tập 11",
            star: "4.5",
            sold: "14",
            price: "17.500 đ",
        },
        {
            srcimg: "/image/shin.jpg",
            name: "Cậu bé bút chì tập 1 (Bản đặc biệt kỷ niệm 10 năm ra mắt có quà tặng kèm)",
            star: "5.0",
            sold: "1",
            price: "17.500 đ",
        },
        {
            srcimg: "/image/conan.jpg",
            name: "Thám tử lừng danh Conan tập 100",
            star: "0.0",
            sold: "4",
            price: "17.500 đ",
        },
        {
            srcimg: "/image/doremon.jpg",
            name: "Doraemon - Chú Mèo Máy Đến Từ Tương Lai Tập 11",
            star: "4.5",
            sold: "14",
            price: "17.500 đ",
        },
        {
            srcimg: "/image/shin.jpg",
            name: "Cậu bé bút chì tập 1 (Bản đặc biệt kỷ niệm 10 năm ra mắt có quà tặng kèm)",
            star: "5.0",
            sold: "1",
            price: "17.500 đ",
        },
        {
            srcimg: "/image/conan.jpg",
            name: "Thám tử lừng danh Conan tập 100",
            star: "0.0",
            sold: "4",
            price: "17.500 đ",
        },
    ];


    return (
        <>
            <User
                content={
                    <>
                        <Box className="flex justify-center p-4">
                            <Box className="grid grid-cols-7 text-center cursor-pointer">
                                <Link className="button-nav w-40 !no-underline !text-black">Trinh thám</Link>
                                <Link className="button-nav !no-underline !text-black">Ngôn tình</Link>
                                <Link className="button-nav !no-underline !text-black">Tiểu thuyết</Link>
                                <Link className="button-nav !no-underline !text-black">Lịch sử</Link>
                                <Link className="button-nav !no-underline !text-black">Khoa học</Link>
                                <Link className="button-nav !no-underline !text-black">Hư cấu</Link>
                                <Link className="button-nav !no-underline !text-black">Xem thêm</Link>
                            </Box >
                        </Box>
                        <Box className="flex mx-auto rounded bg-slate-100 !rounded" sx={{ width: 6 / 7 }}>
                            <SlideShow />
                        </Box>
                        <Box className="mx-auto rounded bg-slate-100 !rounded" sx={{ width: 6 / 7 }}>
                            <Typography className="Background text-center text-white p-2 rounded-t-lg !text-2xl !font-bold !mt-4">TOP SÁCH NỔI BẬT TRONG THÁNG</Typography>
                            <Box className="flex justify-between p-8">
                                <Box className="flex -rotate-6">
                                    <Box component='img' src={"/image/nhagiakim.png"} alt="image" className='mt-2' sx={{ height: 300, width: 200 }} />
                                    <Box className="border-solid border-2 border-black mt-2 w-3 bg-white"></Box>
                                </Box>
                                <Box
                                    className="mt-2 rounded py-4 px-6"
                                    sx={{
                                        bgcolor: '#A83109', height: 2 / 3, marginLeft: -4, width: 1 / 5
                                    }}>
                                    <Typography className="!ml-5 text-white !font-bold !text-3xl">Nhà giả kim</Typography>
                                    <Typography className="!ml-5 text-white !mt-3 !text-xs">Liên tục là tác phẩm bán chạy trong nhiều tháng liền tại nhà sách chúng tôi. Như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông.</Typography>
                                    <Typography className="text-center text-white !text-xs !mt-8">Trinh thám - tình yêu - lịch sử</Typography>
                                    <Box className="mx-auto py-2 px-8 text-white !text-sm !mt-2 border-solid border border-white w-fit">Chi tiết</Box>

                                </Box>

                                <Box className="flex -rotate-6 ml-8">
                                    <Box component='img' src={"/image/chienbinhcauvong.png"} alt="image" sx={{ height: 300, width: 200 }} />
                                    <Box className="border-solid border-2 border-black mt-1 w-3 bg-white" sx={{ height: 296 }}></Box>
                                </Box>
                                <Box
                                    className="mt-2 rounded py-4 px-6"
                                    sx={{
                                        bgcolor: '#AB9C25', height: 2 / 3, marginLeft: -4, width: 1 / 5
                                    }}>
                                    <Typography className="!ml-5 text-white !font-bold !text-3xl">Chiến binh cầu vồng</Typography>
                                    <Typography className="!ml-5 text-white !mt-3 !text-xs">Một tác phẩm có tầm ảnh hưởng sâu rộng nhất Indonesia. Chiến binh Cầu vồng có cả tình yêu trong sáng tuổi học trò lẫn những trò đùa tinh quái, cả nước mắt lẫn tiếng cười .</Typography>
                                    <Typography className="text-center text-white !text-xs !mt-4">Tâm lý xã hội - tình yêu</Typography>
                                    <Box className="mx-auto py-2 px-8 text-white !text-sm !mt-2 border-solid border border-white w-fit">Chi tiết</Box>

                                </Box>

                                <Box className="flex -rotate-6 ml-8">
                                    <Box component='img' src={"/image/nguoiduadieu.png"} alt="image" sx={{ height: 300, width: 200 }} />
                                    <Box className="border-solid border-2 border-black mt-2 w-3 bg-white" sx={{ height: 290, marginLeft: -1 }}></Box>
                                </Box>
                                <Box
                                    className="mt-2 rounded py-4 px-6"
                                    sx={{
                                        bgcolor: '#A6976F', height: 2 / 3, marginLeft: -4, width: 1 / 5
                                    }}>
                                    <Typography className="!ml-5 text-white !font-bold !text-3xl">Người đưa diều</Typography>
                                    <Typography className="!ml-5 text-white !mt-3 !text-xs">Một tác phẩm có tầm ảnh hưởng sâu rộng nhất Indonesia. Chiến binh Cầu vồng có cả tình yêu trong sáng tuổi học trò lẫn những trò đùa tinh quái, cả nước mắt lẫn tiếng cười .</Typography>
                                    <Typography className="text-center text-white !text-xs !mt-4">Tâm lý xã hội - tình yêu</Typography>
                                    <Box className="mx-auto py-2 px-8 text-white !text-sm !mt-2 border-solid border border-white w-fit">Chi tiết</Box>

                                </Box>

                            </Box>
                        </Box>
                        <Box className="mx-auto mt-8 rounded bg-slate-100 !rounded" sx={{ width: 6 / 7 }}>
                            <Box className="flex justify-end px-8 py-4">
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                />
                            </Box>
                            <Box className="flex w-full">
                                <CateSearch />
                                <Box className="grid grid-cols-5 w-5/6 h-fit rounded ml-6 mt-4">
                                    {productList.slice(startIndex, endIndex).map((product, index) => (
                                        <ProductList key={index} {...product} />
                                    ))}
                                </Box>
                            </Box>
                            <Box className="flex justify-end px-8 py-4">
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                />
                            </Box>
                        </Box>
                    </>
                }
            />
        </>
    );
};