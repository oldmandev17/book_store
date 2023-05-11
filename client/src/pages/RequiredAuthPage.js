import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequiredAuthPage = ({ allowPermissions = [] }) => {
  const { user } = useSelector((state) => state.auth);
  const userPermissions = user?.role || [];
  const location = useLocation();
  return userPermissions.find((p) => allowPermissions?.includes(p)) ||
    allowPermissions.length <= 0 ? (
    <Outlet></Outlet>
  ) : user && user._id ? (
    <Navigate to="/unauthorize" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiredAuthPage;
