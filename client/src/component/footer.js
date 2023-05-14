import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import '../dist/output.css';
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";


const footer = () => {
    return (
        <>
            <Box className="flex w-full !mt-8">
                <table class="table-fixed !mx-auto !mt-8">
                    <thead className="mb-6">
                        <tr className="grid grid-cols-3 text-left">
                            <th className="w-60"> CHĂM SÓC KHÁCH HÀNG</th>
                            <th>VỀ NHÀ SÁCH</th>
                            <th>LIÊN HỆ NHÀ SÁCH TRÊN</th>
                        </tr>
                    </thead>
                    <tbody className='text-slate-500'>
                        <tr className="grid grid-cols-3 text-left mt-6">
                            <td className="w-80">Trung tâm trợ giúp</td>
                            <td>Giới thiệu nhà sách</td>
                            <td className='flex'><FaFacebookF className='mt-1 mr-1' />Facebook</td>
                        </tr>
                        <tr className="grid grid-cols-3 text-left mt-2">
                            <td className="w-96">Hướng dẫn mua hàng</td>
                            <td>Điều khoản</td>
                            <td className='flex'><BsInstagram className='mt-1 mr-1' />Instagram</td>
                        </tr>
                        <tr className="grid grid-cols-3 text-left mt-2">
                            <td className="w-96">Chăm sóc khách hàng</td>
                            <td className="w-96">Tuyển dụng</td>

                        </tr>
                        <tr className="grid grid-cols-3 text-left mt-2">
                            <td className="w-96">Chính sách bảo hành</td>
                            <td className="w-96">Flash Sale</td>

                        </tr>
                        <tr className="grid grid-cols-3 text-left mt-2">
                            <td className="w-96">Chính sách bảo mật</td>
                        </tr>
                        <tr className="grid grid-cols-3 text-left mt-2">
                            <td className="w-96">MeoMeo Blog</td>
                        </tr>
                        <tr className="grid grid-cols-3 text-left mt-2">
                            <td className="w-96">Trả hàng và hoàn tiền</td>
                        </tr>
                    </tbody>
                </table>
                <Box component='img' src={"/image/map.jpg"} sx={{ width: 300, height: 300 }} className='mr-20' />
            </Box >
            <Box className="flex justify-center py-6">
                <Divider className='w-4/5' sx={{ color: '#565656' }} />
            </Box>
            <Box className="flex justify-center py-8">
                <Box className="grid grid-cols-3 text-center text-slate-500">
                    <Typography className="w-80 border-r-2">CHÍNH SÁCH BẢO MẬT</Typography>
                    <Typography className='border-r-2'>QUY CHẾ HOẠT ĐỘNG</Typography>
                    <Typography>CHÍNH SÁCH TRẢ HÀNG & TRẢ TIỀN</Typography>
                </Box >
            </Box>
            <Box className="flex justify-center">
                <Box component='img' src={"/image/bct.png"} sx={{ width: 100, height: 30 }} className='ml-1' />
                <Box component='img' src={"/image/bct.png"} sx={{ width: 100, height: 30 }} className='ml-6' />
                <Box component='img' src={"/image/sp.png"} sx={{ width: 35, height: 35 }} className='ml-6' />
            </Box>
            <Box className="text-center mt-2 text-slate-500">
                <Typography>Địa chỉ: Tầng 4, Tòa nhà Capital Place Quận Tân Bình, Thành phố Hồ Chí Minh, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotromeomeostore</Typography>
                <Typography>Chịu Trách Nhiệm Quản Lý Nội Dung: Đoàn Vân - Điện thoại liên hệ: 024 73081221 (ext 4678)</Typography>
                <Typography>Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hồ Chí Minh cấp lần đầu ngày 10/02/2015</Typography>
                <Typography>© 2017 - Bản quyền thuộc về MeoMeo Co. ltd</Typography>
            </Box>
        </>
    )
}

export default footer