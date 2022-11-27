import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Swal from 'sweetalert2';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

    const {status, checkAuthToken} = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);
    

    if (status === 'checking') {
        Swal.fire({
            title: 'Getting calendar events...',
            timer: 2000,
            didOpen: () => {
                Swal.showLoading()
            },
            willClose: () => {
                clearInterval(1000)
            }
        });
        return <></>
    }

    return (
        <Routes>
            {
                ( status === 'not-authenticated' )
                ? (
                    <>
                        <Route path='/auth/*' element={ <LoginPage /> }/>
                        <Route path='/*' element={ <Navigate to="/auth/login" /> }/> 
                    </>
                )
                : (
                    <>
                        <Route path='/' element={ <CalendarPage /> }/>
                        <Route path='/*' element={ <Navigate to="/" /> }/> 
                    </>
                )
            }
        </Routes>
    )
}
