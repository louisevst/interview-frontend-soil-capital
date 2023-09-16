import { DashboardSection } from '@features/dashboard';
import { HomePage, LoginPage, GalleryPage } from '@pages';
import { Guard } from '@utils';
import { Navigate, Route, Routes } from 'react-router-dom';

/**
 * Main Router
 */
function Router() {
    return (
        <Routes>
            <Route path="/" element={<Guard target={<HomePage />} guards={['authenticated']} />}>
                <Route index element={<DashboardSection />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="gallery" element={<GalleryPage />} />
        </Routes>
    );
}

export default Router;
