import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Link, Typography } from '@mui/material';
import { Button } from 'component/button';
import 'index.css';
import IconEyeToggle from 'component/icon/IconEyeToggle';
import { Input } from 'component/input';
import useToggleValue from 'hooks/useToggleValue';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authResetPassword } from 'stores/auth/auth-slice';
import { useEffect } from 'react';

const newPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required('Mật khẩu mới không thể bỏ trống')
    .min(8, 'Mật khẩu mới phải nhiều hơn 8 kí tự'),
  newConfirmPassword: yup
    .string()
    .required('Xác nhận mật khẩu mới không thể bỏ trống')
    .min(8, 'Xác nhận mật khẩu mới phải nhiều hơn 8 kí tự'),
});

export default function NewPassword() {
  const { id, resetString } = useParams();
  const { redirect } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      setTimeout(() => {
        navigate(redirect);
        reset();
      }, 1000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newPasswordSchema),
    mode: 'onSubmit',
  });

  const handleNewPassword = (values) => {
    values.userId = id;
    values.resetString = resetString;
    dispatch(authResetPassword(values));
  };

  const {
    value: showNewPassword,
    handleToggleValue: hanndleToggleNewPassword,
  } = useToggleValue();
  const {
    value: showNewConfirmPassword,
    handleToggleValue: handleToggleNewConfirmPassword,
  } = useToggleValue();

  return (
    <>
      <form
        className="flex flex-col w-full mx-auto gap-y-3 lg:gap-y-6"
        onSubmit={handleSubmit(handleNewPassword)}
      >
        <Typography className="!text-4xl !font-bold text-center color">
          Đặt lại mật khẩu
        </Typography>
        <Input
          control={control}
          name="newPassword"
          placeholder="Mật khẩu"
          type={`${showNewPassword ? 'text' : 'password'}`}
          error={errors.newPassword?.message}
        >
          <IconEyeToggle
            open={showNewPassword}
            onClick={hanndleToggleNewPassword}
          ></IconEyeToggle>
        </Input>
        <Input
          control={control}
          name="newConfirmPassword"
          placeholder="Mật khẩu"
          type={`${showNewConfirmPassword ? 'text' : 'password'}`}
          error={errors.newConfirmPassword?.message}
        >
          <IconEyeToggle
            open={showNewConfirmPassword}
            onClick={handleToggleNewConfirmPassword}
          ></IconEyeToggle>
        </Input>
        <Button className="w-full" kind="primary" type="submit">
          Tiếp tục
        </Button>
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
