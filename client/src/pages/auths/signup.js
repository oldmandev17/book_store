import React, { useState } from "react";
import '../../index.css';
import { Box, Link, Typography } from "@mui/material";
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { MdOutlineVisibility } from 'react-icons/md';
import ModalEmail from "../../component/auth/ModalEmail";




export default function SignUp(props) {

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };
    return (
        <>
            <Header />
            <Box sx={{ bgcolor: '#152259', heght: 200 }} className="flex justify-center p-24 MainLogin">
                <Box className="text-white text-center mr-20">
                    <Box component='img' src={"./image/whitecat.png"} alt="image" className="logo-login mx-auto" />
                    <Typography className="!font-bold !text-6xl logo_title !font-['Ysabeau']">MeoMeo</Typography>
                    <Typography className="!text-2xl !mt-6">Nhà sách yêu thích dành cho Gen Z</Typography>
                    <Typography className="!text-2xl">yêu thích ở Việt Nam</Typography>
                </Box>
                <Box className="bg-white p-16 rounded-2xl h-full">
                    <form className="w-full mx-auto " action="/confirm">
                        < Typography className="!text-4xl text-center">Đăng ký</Typography>
                        <Input
                            placeholder="User name"
                            variant="soft"
                            className="mt-6"
                        />
                        <Input
                            placeholder="Email"
                            variant="soft"
                            className="mt-6"
                        />
                        <Input
                            placeholder="Mật khẩu"
                            type="password"
                            variant="soft"
                            className="mt-6 mb-4"
                            endDecorator={<MdOutlineVisibility size={20} />}
                        />
                        <Input
                            placeholder="Nhập lại mật khẩu"
                            variant="soft"
                            type="password"
                            className="mt-6 mb-4"
                            endDecorator={<MdOutlineVisibility size={20} />}
                        />
                        <Button className="button !text-xl !mb-2 w-full" onClick={handleOpenModal}>TIẾP THEO</Button>
                        <ModalEmail
                            handleClose={() => setShowModal(false)}
                            show={showModal}
                            title='Xin vui lòng kiểm tra email vừa nhập để hoàn tất việc đăng ký tài khoản của bạn'
                        >
                        </ModalEmail>
                    </form>

                    <Box className="mt-4 text-center">
                        <Typography>Bằng việc đăng ký, bạn đã đồng ý với chúng tôi về</Typography>
                        <Link className="!no-underline" href="">Điều khoản dịch vụ </Link>
                        <span > & </span>
                        <Link className="!no-underline" href=""> Chính sách bảo mật</Link>
                    </Box>
                    <Box className="flex mt-20 text-center justify-center">
                        <Typography className="italic !mr-2">Bạn đã có tài khoản?</Typography>
                        <Link className="!no-underline italic" href="login">Đăng nhập</Link>
                    </Box>
                </Box >
            </Box >

            <Footer />
        </>
    );
};