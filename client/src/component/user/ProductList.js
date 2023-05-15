import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';

const ProductList = (props) => {
    const { name, star, sold, price, srcimg } = props;
    const shortenName = (name) => {
        if (name.length > 50) {
            return name.substr(0, 50) + "..";
        }
        return name;
    };


    return (
        <>
            <Box className="product bg-white w-fit h-fit p-4 mt-6 rounded cursor-pointer">
                <Box component="img" src={srcimg} alt="image" className="mt-2" sx={{ height: 256, width: 200 }} />
                <Typography sx={{ width: 170 }} className="!text-sm">
                    {shortenName(name)}
                </Typography>
                <Typography sx={{ width: 170 }} className="flex !text-sm text-slate-500">
                    {star} <AiFillStar color="yellow" className="my-auto" /> | Đã bán {sold}
                </Typography>
                <Typography sx={{ width: 170 }} color="red" className="!text-xl">
                    {price}
                </Typography>
            </Box>
        </>
    );
};

export default ProductList;