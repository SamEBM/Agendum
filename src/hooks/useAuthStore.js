import { useDispatch, useSelector } from "react-redux"
import calendarAPI from "../api/calendarAPI";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({email, password}) => {
        dispatch(onChecking());

        try {
            const { data } = await calendarAPI.post('/auth/login', {email, password});

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            console.log(error);
            dispatch(onLogout('Incorrect username or password'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async({name, email, password}) => {
        dispatch(onChecking());

        try {
            const { data } = await calendarAPI.post('/auth/register', {name, email, password});

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            console.log(error);
            dispatch(onLogout(error.response.data?.msg || Object.values(error.response.data.errors)[0].msg));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await calendarAPI.get('/auth/token');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        // Propiedades
        status, 
        user, 
        errorMessage,

        // Métodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}