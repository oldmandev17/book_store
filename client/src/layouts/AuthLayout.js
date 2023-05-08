import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '../component/footer';
import Header from '../component/header';

export default function AuthLayout(props) {
  return (
    <>
      <Header></Header>
      <Box
        sx={{ bgcolor: '#152259' }}
        className="flex justify-center p-16 MainLogin !h-fit"
      >
        <Box className="mr-20 text-center text-white">
          <Box
            component="img"
            src={'/image/whitecat.png'}
            alt="image"
            className="mx-auto logo-login"
          />
          <Typography className="!font-bold !text-6xl logo_title !font-['Ysabeau']">
            Meo Meo
          </Typography>
          <Typography className="!text-2xl !mt-6">
            Nhà sách yêu thích dành cho Gen Z
          </Typography>
          <Typography className="!text-2xl">yêu thích ở Việt Nam</Typography>
        </Box>
        <Box className="w-1/3 p-12 bg-white rounded-2xl">
          <Outlet></Outlet>
        </Box>
      </Box>
      <Footer></Footer>
    </>
  );
}
