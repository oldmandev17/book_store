import { Box } from '@mui/material'
import React from 'react'
import { BsInstagram } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'

const Footer = () => {
    return (
        <Box className="Background flex w-full !text-white">
            <table class="table-fixed !mx-auto !mt-8">
                <thead className="mb-6">
                    <tr className="grid grid-cols-3 text-left">
                        <th className="w-60"> CHĂM SÓC KHÁCH HÀNG</th>
                        <th>VỀ NHÀ SÁCH</th>
                        <th>LIÊN HỆ NHÀ SÁCH TRÊN</th>
                    </tr>
                </thead>
                <tbody>
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
        </Box>
    )
}

export default Footer