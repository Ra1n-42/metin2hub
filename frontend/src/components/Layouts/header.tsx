import { NavLink } from 'react-router-dom';
import { appRoutes } from '@/pages/routes';
import { Typography } from '@mui/material';
import { ModeToggle } from '@/components/mode-toggle';

function Header() {

    return (
        <div className="p-4 flex justify-between">
            <nav className="flex gap-4">
                {appRoutes
                    .filter((route) => route.showInNav)
                    .map((route) => {

                        // 📌 Standard NavLink
                        return (
                            <div key={route.path} className='flex items-center'>
                                <Typography variant="h6" >

                                    <NavLink
                                        key={route.path}
                                        to={route.path === 'home' ? '/' : `/${route.path}`}
                                        className={({ isActive }) =>
                                            isActive ? 'font-bold underline text-foreground' : 'text-foreground'
                                        }
                                    >
                                        {route.label}
                                    </NavLink>
                                </Typography>
                            </div>
                        );
                    })}
            </nav>
            <ModeToggle />
        </div>
    );
}

export default Header;
