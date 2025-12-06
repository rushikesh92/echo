import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import {PageLoader} from './index';

function AuthLayout({requiresAuth}) {
    const {user,isCheckingAuth} = useAuthStore();
    if(isCheckingAuth) return <PageLoader/>
    if(!user && requiresAuth){//if on chatpage but not logged in
        return <Navigate to='/login' replace />
    }
    if(user && !requiresAuth){//if on login/signup page but logged in
        return <Navigate to='/' replace />
    }

  return <Outlet/>
}

export default AuthLayout