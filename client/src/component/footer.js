import { Box, Typography } from '@mui/material';
import React from 'react';
import 'dist/output.css';

const footer = () => {
  return (
    <Box className="w-full mt-8 ">
      <table className="mx-auto table-fixed">
        <thead className="mb-6">
          <tr className="grid grid-cols-3 text-left">
            <th className="w-96"> CHĂM SÓC KHÁCH HÀNG</th>
            <th>VỀ NHÀ SÁCH</th>
            <th>LIÊN HỆ NHÀ SÁCH</th>
          </tr>
        </thead>
        <tbody>
          <tr className="grid grid-cols-3 font-medium text-left">
            <td className="w-96">Trung tâm trợ giúp</td>
            <td>Giới thiệu nhà sách</td>
            <td>Facebook</td>
          </tr>
          <tr className="grid grid-cols-3 font-medium text-left">
            <td className="w-96">Hướng dẫn mua hàng</td>
            <td>Điều khoản</td>
            <td>Instagram</td>
          </tr>
          <tr className="grid grid-cols-4 font-medium text-left">
            <td className="w-96">Chăm sóc khách hàng</td>
          </tr>
        </tbody>
      </table>
      <Box className="flex justify-center px-16 py-2">
        <Typography>©2023 MeoMeo Bookstore Coppy Right</Typography>
      </Box>
    </Box>
  );
};

export default footer;
