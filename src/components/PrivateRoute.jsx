import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import {useAuthStatus} from '../hooks/useAuthStatus';
import Spinner from './Spinner';

export default function PrivateRoute() {
    //creating a hook
    const {loggedIn, loadingStatus} = useAuthStatus();
    if(loadingStatus) {
        return <Spinner />
    }
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
}
