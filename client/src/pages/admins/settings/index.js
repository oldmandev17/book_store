import Admin from "../../../component/admin";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { BiSupport } from "react-icons/bi";
import { BsFillPersonLinesFill, BsTelephone } from "react-icons/bs";
import { MdOutlineMailOutline, MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
import ModalChangePassword from "../../../component/admin/setting/ModalChangePassword";
import EditUser from "../../../component/admin/setting/EditUser";


export default function Setting() {

    const [showModalChange, setShowModalChange] = useState(false);

    const [showModalChangeUser, setShowModalChangeUser] = useState(false);

    const handleOpenModalChangeUser = () => {
        setShowModalChangeUser(true);
    };

    const handleOpenModalChange = () => {
        setShowModalChange(true);
    };

    return (
        <>
            <Admin
                title="Thiết lập"
                content={
                    <Box className="p-12">
                        <Box className="flex">
                            <Box className="grid w-1/3 mt-20">
                                <Box component='img' src={"/image/image.png"} alt="image" className="!rounded-full mx-auto" sx={{ width: 237 }} />
                                <Box className="text-center mt-4">
                                    <Typography className="!font-bold KumbhSans">Nguyễn Thị Xuân Thanh</Typography>
                                    <Typography color='GrayText ' className="KumbhSans">Admin</Typography>
                                </Box>
                                <Box className="mt-5 text-center mx-auto">
                                    <Typography className="flex">
                                        <MdOutlineMailOutline size={23} className="mr-3" />
                                        <Link className="KumbhSans font-bold">nguyenthixuanka2001@gmail.com</Link>
                                    </Typography>
                                    <Typography className="flex !mt-2">
                                        <BsTelephone size={20} className="mr-3" />
                                        <Link className="KumbhSans font-bold">0387570906</Link>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className="grid w-2/3 mt-20">
                                <Box className="flex button-out rounded-md w-fit py-2 px-8 h-fit mr-10 cursor-pointer" onClick={() => handleOpenModalChange()}>
                                    <MdPassword className="!my-auto text-2xl mr-2" />
                                    <Typography className='text-center KumbhSans !text-xl !font-semibold'>
                                        Đổi mật khẩu
                                    </Typography>
                                </Box>
                                <Box className="flex button-out rounded-md w-fit py-2 px-8 h-fit mr-10 cursor-pointer">
                                    <BsFillPersonLinesFill className="!my-auto text-2xl mr-2" />
                                    <Typography className='text-center KumbhSans !text-xl !font-semibold' onClick={() => handleOpenModalChangeUser()}>
                                        Chỉnh sửa thông tin tài khoản
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box className='grid justify-end py-4'>
                            <Typography className="text-center !font-bold">Gặp khó khăn ?</Typography>
                            <Box className="flex button-out mx-right w-fit py-4 px-12 w-fit h-fit cursor-pointer support">
                                <BiSupport size={20} className="mt-1 mr-1" />
                                <Typography className='text-center KumbhSans !font-medium !text-xl !font-semibold'>
                                    Hỗ trợ
                                </Typography>
                            </Box>
                        </Box>
                        <ModalChangePassword
                            handleClose={() => setShowModalChange(false)}
                            show={showModalChange}
                        />
                        <EditUser
                            handleClose={() => setShowModalChangeUser(false)}
                            show={showModalChangeUser}
                        />
                    </Box >
                }
            />
        </>
    );

}