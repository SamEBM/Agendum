import React from 'react'
import { useAuthStore } from '../../hooks/useAuthStore'

export const Navbar = ({ language, onChangeLanguage }) => {

    const {user, startLogout} = useAuthStore();

    return (
        <div className='navbar navbar-dark bg-dark mb-4 px-4'>
            <span className='navbar-brand'>
                <i className='fas fa-calendar-alt'></i>
                &nbsp;
                &nbsp;
                {user.name}
            </span>

            <div>
                <button onClick={ onChangeLanguage } className="btn btn-outline-light">
                    <i className="fas fa-language"></i>
                    <span>&nbsp; { language ? 'English' : 'Español' }</span>
                </button>

                <button onClick={ startLogout } className='btn btn-light' style={{ marginLeft: '15px'}}>
                    <i className='fas fa-sign-out-alt'></i>
                    <span>&nbsp; Logout</span>
                </button>
            </div>
        </div>
    )
}
