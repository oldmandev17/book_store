import React, { useState } from "react";
import '../../../index.css';
import User from "../../../component/user";
import BreadCrumb from "../../../component/Breadcumb";
import Product from "../../../component/user/ProductList";



export default function ProductUSer() {
    return (
        <>
            <User
                content={
                    <>
                        <BreadCrumb />
                    </>
                }
            />
        </>
    );
};