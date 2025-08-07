import Header from './header';
import Footer from './footer';
import { ThemeProvider } from '../theme-provider';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </ThemeProvider>
    );
};

export default Layout;
