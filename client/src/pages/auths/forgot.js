import React, { useState } from 'react';
import { Box, Link, Typography } from '@mui/material';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Header from 'component/header';
import Footer from 'component/footer';
import 'index.css';
import ModalEmail from 'component/auth/ModalEmail';

export default function Forgot(props) {
  const [showModal, setShowModal] = useState(false);

  const [sendEmail, setSendEmail] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSendEmail(true);
  };

  return (
    <>
      <form className="w-full mx-auto " action="/confirm">
        <Typography className="!text-4xl !font-bold text-center color">
          Quên mật khẩu
        </Typography>
        <Input placeholder="Email" variant="soft" className="mt-12 mb-6" />
        {!sendEmail && (
          <Button
            className="button w-full !text-xl !mb-2"
            onClick={handleOpenModal}
          >
            TIẾP THEO
          </Button>
        )}
        {sendEmail && (
          <Button className="button w-full !text-xl !mb-2">
            GỬI LẠI EMAIL
          </Button>
        )}
        <ModalEmail
          handleClose={handleCloseModal}
          show={showModal}
          title="Xin vui lòng kiểm tra email vừa nhập để hoàn tất việc cài đặt mật khẩu"
        ></ModalEmail>
      </form>
      <Box className="mt-20 text-center">
        <Typography>Quay lại trang đăng nhập?</Typography>
        <Link className="!no-underline" href="/login">
          Đăng nhập
        </Link>
      </Box>
    </>
  );
}
