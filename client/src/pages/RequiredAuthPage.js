import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RequiredAuthPage = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !user.email) {
      navigate('/login');
    }
  }, [navigate, user]);
  if (!user || !user.email) return null;
  return <>{children}</>;
};

export default RequiredAuthPage;
