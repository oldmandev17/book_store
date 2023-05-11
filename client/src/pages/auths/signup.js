import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Link, Typography } from '@mui/material';
import ModalEmail from 'component/auth/ModalEmail';
import { Button } from 'component/button';
import { Checkbox } from 'component/checkbox';
import IconEyeToggle from 'component/icon/IconEyeToggle';
import { Input } from 'component/input';
import useToggleValue from 'hooks/useToggleValue';
import 'index.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { authSignup, authUpdateShowSignup } from 'stores/auth/auth-slice';
import * as yup from 'yup';

const signupSchema = yup.object({
  name: yup.string().required('Tên không thể bỏ trống'),
  email: yup
    .string()
    .email('Vui lòng nhập đúng email')
    .required('Email không thể bỏ trống'),
  password: yup
    .string()
    .required('Mật khẩu không thể bỏ trống')
    .min(8, 'Mật khẩu phải nhiều hơn 8 kí tự'),
  confirmPassword: yup
    .string()
    .required('Xác nhận mật khẩu không thể bỏ trống')
    .min(8, 'Xác nhận mật khẩu phải nhiều hơn 8 kí tự'),
});

export default function SignUp() {
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();
  const {
    value: showConfirmPassword,
    handleToggleValue: handleToggleConfirmPassword,
  } = useToggleValue();
  const { value: acceptTerm, handleToggleValue: handleToggleTerm } =
    useToggleValue();

  const { showSignup } = useSelector((state) => state.auth);

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: 'onSubmit',
  });

  const dispatch = useDispatch();

  const handleSignUp = (values) => {
    values.currentUrl =
      window.location.protocol + '//' + window.location.host + '/verify';
    dispatch(authSignup(values));
  };

  useEffect(() => {
    if (showSignup) reset();
  }, [showSignup, reset]);

  return (
    <>
      <form
        className="flex flex-col w-full mx-auto gap-y-3 lg:gap-y-6"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <Typography className="!text-4xl !font-bold text-center color">
          Đăng ký
        </Typography>
        <Input
          control={control}
          name="name"
          placeholder="Tên"
          error={errors.name?.message}
        ></Input>
        <Input
          control={control}
          name="email"
          type="email"
          placeholder="Email"
          error={errors.email?.message}
        ></Input>
        <Input
          control={control}
          name="password"
          placeholder="Mật khẩu"
          type={`${showPassword ? 'text' : 'password'}`}
          error={errors.password?.message}
        >
          <IconEyeToggle
            open={showPassword}
            onClick={handleTogglePassword}
          ></IconEyeToggle>
        </Input>
        <Input
          control={control}
          name="confirmPassword"
          type={`${showConfirmPassword ? 'text' : 'password'}`}
          placeholder="Nhập lại mật khẩu"
          error={errors.confirmPassword?.message}
        >
          <IconEyeToggle
            open={showConfirmPassword}
            onClick={handleToggleConfirmPassword}
          ></IconEyeToggle>
        </Input>
        <Box className="text-center ">
          <Checkbox name="term" checked={acceptTerm} onClick={handleToggleTerm}>
            <Typography>
              Bạn đồng ý với chúng tôi về{' '}
              <Link className="!no-underline" href="">
                Điều khoản dịch vụ{' '}
              </Link>
              <span> & </span>
              <Link className="!no-underline" href="">
                {' '}
                Chính sách bảo mật
              </Link>
            </Typography>
          </Checkbox>
        </Box>
        <Button
          disabled={!acceptTerm}
          className={`w-full ${!acceptTerm ? 'cursor-not-allowed' : ''}`}
          kind="primary"
          type="submit"
        >
          Tiếp theo
        </Button>
      </form>
      <ModalEmail
        handleClose={() => dispatch(authUpdateShowSignup(false))}
        show={showSignup}
        title="Xin vui lòng kiểm tra email của bạn để hoàn tất việc đăng ký tài khoản."
      ></ModalEmail>
      <Box className="flex justify-center mt-10 text-center">
        <Typography className="italic !mr-2">Bạn đã có tài khoản?</Typography>
        <Link className="!no-underline" href="login">
          Đăng nhập
        </Link>
      </Box>
    </>
  );
}
