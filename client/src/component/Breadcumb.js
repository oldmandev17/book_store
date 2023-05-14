import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Breadcrumbs, Link } from '@mui/material';

const BreadCrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((path) => path !== '');

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} to="/home" color="inherit" className='!no-underline'>
                Home
            </Link>
            {pathnames.map((path, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                return isLast ? (
                    <Link key={path} color="text.primary" aria-current="page" className='!no-underline'>
                        {path}
                    </Link>
                ) : (
                    <Link key={path} component={RouterLink} to={routeTo} color="inherit" className='!no-underline'>
                        {path}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default BreadCrumb;
