import { useAppInit } from '@hooks/useAppInit';
import { Router } from '@router';
import LoadingPage from './pages/LoadingPage/LoadingPage';

import { withCookies, useCookies, Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from '../src/features/auth/authSlice';

const App = ({ cookies }: { cookies: Cookies }) => {
    const { initialized } = useAppInit();

    const [cookieData] = useCookies(['userData']);
    const dispatch = useDispatch();

    useEffect(() => {
        const userData = cookieData['userData'];
        if (userData) {
            dispatch(setUser(userData));
        }
    }, [cookieData, dispatch]);

    return initialized ? <Router /> : <LoadingPage />;
};

export default withCookies(App);
