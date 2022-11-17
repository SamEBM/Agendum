import React from 'react'

export const Navbar = ({ language, onChangeLanguage }) => {
    return (
        <div className='navbar navbar-dark bg-dark mb-4 px-4'>
            <span className='navbar-brand'>
                <i className='fas fa-calendar-alt'></i>
                &nbsp;
                SamuelEBM
            </span>

            <div>
                <button className="btn btn-outline-light" onClick={ onChangeLanguage }>
                    <i className="fas fa-language"></i>
                    <span>&nbsp; { language ? 'English' : 'Español' }</span>
                </button>

                <button className='btn btn-light' style={{ marginLeft: '15px'}}>
                    <i className='fas fa-sign-out-alt'></i>
                    <span>&nbsp; Logout</span>
                </button>
            </div>
        </div>
    )
}
