import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';
import LoginImage from '../../assets/login.png';
import SignUpImage from '../../assets/signup.png';

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
};

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
};

export const LoginPage = () => {

    const {startLogin, startRegister, errorMessage} = useAuthStore();

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Login Failed', errorMessage, 'error');
        }
    }, [errorMessage])
    

    const {loginEmail, loginPassword, onInputChange : onLoginChange} = useForm(loginFormFields);
    const {registerName, registerEmail, registerPassword, registerPassword2, onInputChange : onRegisterChange} = useForm(registerFormFields);

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({email: loginEmail, password: loginPassword});
    }

    const registerSubmit = (event) => {
        event.preventDefault();

        if (registerPassword !== registerPassword2) {
            return Swal.fire('Sign Up Failed', "Your passwords don't match", 'error');
        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }

    return (
        <div className='app-background'>
            <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1 text-center">
                    <div className='animate__animated animate__fadeInLeft'>
                        <img src={LoginImage} className='img-fluid image-container' />
                        <h1>Login</h1>
                    </div>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2 text-center">
                    <div className='animate__animated animate__fadeInRight'>
                        <img src={SignUpImage} className='img-fluid image-container' />
                        <h1>Sign Up</h1>
                    </div>
                    <form onSubmit={registerSubmit}>
                        <div className='row'>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    name='registerName'
                                    value={registerName}
                                    onChange={onRegisterChange}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name='registerEmail'
                                    value={registerEmail}
                                    onChange={onRegisterChange}
                                />
                            </div>
                            <div className="form-group mb-2 col-6">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    name='registerPassword'
                                    value={registerPassword}
                                    onChange={onRegisterChange} 
                                />
                            </div>

                            <div className="form-group mb-2 col-6">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Re-enter your password"
                                    name='registerPassword2'
                                    value={registerPassword2}
                                    onChange={onRegisterChange} 
                                />
                            </div>

                            <div className="d-grid gap-2">
                                <input 
                                    type="submit" 
                                    className="btnSubmit" 
                                    value="Create account" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}