import React from "react";
import '../../index.css';
import { Box, Link, Typography } from "@mui/material";
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { MdOutlineVisibility } from 'react-icons/md';


export default function Login() {
    return (
        <>
            <Header />
            <Box sx={{ bgcolor: '#152259' }} className="flex justify-center p-32 MainLogin !h-fit ">
                <Box className="text-white text-center mr-20">
                    <Box component='img' src={"/image/whitecat.png"} alt="image" className="logo-login mx-auto" />
                    <Typography className="!font-bold !text-6xl logo_title !font-['Ysabeau']">MeoMeo</Typography>
                    <Typography className="!text-2xl !mt-6">Nhà sách yêu thích dành cho Gen Z</Typography>
                    <Typography className="!text-2xl">yêu thích ở Việt Nam</Typography>
                </Box>
                <Box className="bg-white p-16 rounded-2xl h-full w-1/3">
                    <form>
                        <Typography className="!text-4xl !font-bold text-center color">Đăng nhập</Typography>
                        <Input
                            placeholder="Email"
                            variant="soft"
                            className="mt-8"
                        />
                        <Input
                            placeholder="Mật khẩu"
                            type="password"
                            variant="soft"
                            className="mt-8 mb-8"
                            endDecorator={<MdOutlineVisibility size={20} />}
                        />
                        <Button className="button w-full !text-xl !mb-2">Đăng nhập</Button>
                        <Link className="!no-underline" href="/forgot">Quên mật khẩu ?</Link>
                    </form>
                    <Box className="mt-20 text-center">
                        <Typography>Bạn mới biết đến nhà sách Meo Meo ?</Typography>
                        <Link className="!no-underline" href="/signup">Đăng ký</Link>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};