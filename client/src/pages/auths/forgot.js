import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Link, Typography } from '@mui/material';
import ModalEmail from 'component/auth/ModalEmail';
import { Button } from 'component/button';
import { Input } from 'component/input';
import 'index.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  authRequestPasswordReset,
  authUpdateShowForgot,
} from 'stores/auth/auth-slice';
import * as yup from 'yup';

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Vui lòng nhập đúng email')
    .required('Email không thể bỏ trống'),
});

export default function Forgot() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onSubmit',
  });

  const dispatch = useDispatch();
  const { showForgot } = useSelector((state) => state.auth);
  const [button, setButton] = useState('Tiếp theo');

  const handleForgotPassword = (values) => {
    values.redirectUrl =
      window.location.protocol + '//' + window.location.host + '/newPassword';
    dispatch(authRequestPasswordReset(values));
  };

  return (
    <>
      <form
        className="flex flex-col w-full mx-auto gap-y-3 lg:gap-y-6"
        onSubmit={handleSubmit(handleForgotPassword)}
      >
        <Typography className="!text-4xl !font-bold text-center color">
          Quên mật khẩu
        </Typography>
        <Input
          control={control}
          name="email"
          type="email"
          placeholder="Email"
          error={errors.email?.message}
        ></Input>
        <Button className="w-full" kind="primary" type="submit">
          {button}
        </Button>
        <ModalEmail
          handleClose={() => {
            dispatch(authUpdateShowForgot(false));
            setButton('Gửi lại email');
          }}
          show={showForgot}
          title="Xin vui lòng kiểm tra email vừa nhập để hoàn tất việc cài đặt mật khẩu"
        ></ModalEmail>
      </form>
      <Box className="mt-10 text-center">
        <Typography>Quay lại trang đăng nhập?</Typography>
        <Link className="!no-underline" href="/login">
          Đăng nhập
        </Link>
      </Box>
    </>
  );
}
