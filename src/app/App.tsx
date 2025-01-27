import { useCheckUserQuery } from '@/entities/auth/api';
import { AuthPage, AdminHomePage } from '@/pages';
import { AdminCount } from '@/pages/admin/count/ui';
import { TOKEN, TOKEN_KEY, useAppActions, useAppSelector } from '@/shared';
import { AdminLayout } from '@/widgets';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

const App = () => {
    const { isAuth } = useAppSelector();
    const { setIsAuth } = useAppActions();
    const [isEntered, setIsEntered] = useState(false);
    const [currentPathname, setCurrentPathname] = useState('');
    const { pathname } = useLocation();
    const token = TOKEN.get();
    const { data, isLoading, isError, isSuccess } = useCheckUserQuery(
        token as string,
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (pathname && !isEntered) {
            setCurrentPathname(pathname);
            setIsEntered(true);
        }
    }, []);

    useEffect(() => {
        if (isError) {
            TOKEN.remove(TOKEN_KEY);
            navigate('/login');
        } else if (isSuccess) {
            setIsAuth(true);
            navigate(currentPathname);
        }
    }, [data, isLoading]);

    useEffect(() => {
        // @ts-ignore
        if (window.TelegramWebApp) {
            // @ts-ignore
            const tg = window.TelegramWebApp;
            tg.expand();
            tg.ready();
        }
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Spin />
            </div>
        );
    } else {
        return (
            <Routes>
                {isAuth && (
                    <Route path="/" element={<AdminLayout />}>
                        <Route path="/" element={<AdminHomePage />} />
                        <Route path="/count" element={<AdminCount />} />
                    </Route>
                )}
                <Route path="/login" element={<AuthPage />} />
            </Routes>
        );
    }
};

export { App };
