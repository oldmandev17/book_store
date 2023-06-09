import { Box, Typography } from '@mui/material';
import React from 'react';
import 'dist/output.css';

const Header = () => {
  return (
    <>
      <Box className="flex p-4 ml-12">
        <Box
          component="img"
          src={'/image/blackcat.png'}
          alt="image"
          className="logo"
        />
        <Typography className="!font-black !text-3xl !my-auto !font-['Ysabeau']">
          MeoMeo
        </Typography>
      </Box>
    </>
  );
};

export default Header;
