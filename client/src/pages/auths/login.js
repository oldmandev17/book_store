import { Box, Link, Typography } from '@mui/material';
import 'index.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import IconEyeToggle from 'component/icon/IconEyeToggle';
import { Button, ButtonGoogle } from 'component/button';
import useToggleValue from 'hooks/useToggleValue';
import { Input } from 'component/input';
import { useDispatch } from 'react-redux';
import { authLogin } from 'stores/auth/auth-slice';

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Vui lòng nhập đúng email')
    .required('Email không thể bỏ trống'),
  password: yup
    .string()
    .required('Mật khẩu không thể bỏ trống')
    .min(8, 'Mật khẩu phải nhiều hơn 8 kí tự'),
});

export default function Login() {
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
  });

  const dispatch = useDispatch();

  const handleLogin = (values) => {
    dispatch(authLogin(values));
  };
  return (
    <>
      <form
        className="flex flex-col w-full mx-auto gap-y-3 lg:gap-y-6"
        onSubmit={handleSubmit(handleLogin)}
      >
        <Typography className="!text-4xl !font-bold text-center color">
          Đăng nhập
        </Typography>
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
        <Button className="w-full" kind="primary" type="submit">
          Đăng nhập
        </Button>
      </form>
      <Box className="flex flex-col mt-3 lg:gap-y-4 gap-y-2">
        <Box className="text-right">
          <Link className="!no-underline" href="/forgot">
            Quên mật khẩu ?
          </Link>
        </Box>
        <ButtonGoogle text="Google"></ButtonGoogle>
        <Box className="text-center">
          <Typography>Bạn mới biết đến nhà sách Meo Meo ?</Typography>
          <Link className="!no-underline" href="/signup">
            Đăng ký
          </Link>
        </Box>
      </Box>
    </>
  );
}
