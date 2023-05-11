import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

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
  const {} = useForm({
    resolver: yupResolver(newPasswordSchema),
    mode: 'onSubmit',
  });
}
