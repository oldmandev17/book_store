import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import Menu from './Menu';
import { AiOutlineHome, AiOutlineSetting, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from 'react-icons/bi';
import { BsPeopleFill } from "react-icons/bs";
import { RiBillLine } from 'react-icons/ri';
import { ImStatsBars } from 'react-icons/im';
import { MdManageAccounts } from 'react-icons/md';


const Sidebar = () => {
    return (
        <Box className="Background h-full" sx={{ width: 2 / 13 }}>
            <Box className="text-white text-center py-10">
                <Box component='img' src={"/image/whitecat.png"} alt="image" className="logo mx-auto mb-8" />
                <Typography className="!font-bold !text-xl logo_title KumbhSans">Xin chào admin</Typography>
                <Divider className='bg-white !mt-12' />
            </Box>
            <Box className="p-2 mt-12">
                <Menu icon={<AiOutlineHome />} title="Trang chủ" link="/admin/home" />
                <Menu icon={<BiCategory />} title="Thể loại" link="/admin/cate" />
                <Menu icon={<BsPeopleFill />} title="Tác giả" link="/admin/author" />
                <Menu icon={<AiOutlineShoppingCart />} title="Sản phẩm" link="/admin/product" />
                <Menu icon={<RiBillLine />} title="Hoá đơn" link="/admin/bill" />
                <Menu icon={<ImStatsBars />} title="Doanh thu" />
                <Menu icon={<MdManageAccounts />} title="Tài khoản" link="/admin/account" />
                <Box className="mt-28">
                    <Menu icon={<AiOutlineSetting />} title="Thiết lập" link="/admin/setting" />
                </Box>
            </Box>
        </Box >
    )
}

export default Sidebar