import Header from './header';
import Footer from './footer';
import { ThemeProvider } from '../theme-provider';
import { Outlet } from 'react-router-dom';
import { TooltipProvider } from "@/components/ui/tooltip"

const Layout = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <TooltipProvider>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </TooltipProvider>
        </ThemeProvider>
    );
};

export default Layout;
