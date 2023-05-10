import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

const RequiredAuthPage = ({ allowPermissions = [] }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const userPermissions = user?.role || [];
  return userPermissions?.find((p) => allowPermissions?.includes(p)) ||
    allowPermissions.length <= 0 ? (
    <Outlet></Outlet>
  ) : user && user._id ? (
    <Navigate to="/unauthorize" state={{ from: location }} replace></Navigate>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace></Navigate>
  );
};

export default RequiredAuthPage;
