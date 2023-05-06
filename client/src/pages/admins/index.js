import Sidebar from "../../component/admin/Sidebar";
import { Box, Typography } from "@mui/material";
import { RiBillLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { TiShoppingCart } from "react-icons/ti";
import LogOut from "../../component/admin/LogOut";
import MenuIcon from "../../component/admin/home/MenuIcon";
import { BsPeopleFill } from "react-icons/bs";
import { MdManageAccounts } from 'react-icons/md';
import Admin from "../../component/admin";
import { Link } from "react-router-dom";



export default function AdminPage() {
    return (
        <Admin
            title="Chào mừng quản trị viên"
            content={
                <>
                    <Box className="flex p-12 mt-20">
                        <MenuIcon icon={<MdManageAccounts />} title="Tài khoản" link="account" />
                        <MenuIcon icon={<BiCategoryAlt />} title="Thể loại" link="cate" />
                        <MenuIcon icon={<BsPeopleFill />} title="Tác giả" link="author" />
                    </Box>
                    <Box className="flex p-12">
                        <MenuIcon icon={<TiShoppingCart />} title="Sản phẩm" link="product" />
                        <MenuIcon icon={<RiBillLine />} title="Hoá đơn" link="bill" />

                    </Box>
                </>
            }
        />
    );
}