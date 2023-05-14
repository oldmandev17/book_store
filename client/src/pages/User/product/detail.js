import React, { useState } from "react";
import '../../../index.css';
import User from "../../../component/user";
import BreadCrumb from "../../../component/Breadcumb";
import Product from "../../../component/user/ProductList";
import { Box, Typography } from "@mui/material";
import DetailProduct from "../../../component/user/DetailProduct";



export default function DetailProductUSer() {
    return (
        <>
            <User
                content={
                    <Box className="bg-slate-100">
                        <BreadCrumb />
                        <DetailProduct />
                    </Box>
                }
            />
        </>
    );
};