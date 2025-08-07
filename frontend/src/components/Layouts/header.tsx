import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { appRoutes } from '@/pages/routes';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import { Typography } from '@mui/material';

function Header() {
    const navigate = useNavigate();
    const [dropdownState, setDropdownState] = React.useState<{ [key: string]: string }>({});

    const handleDropdownChange = (groupKey: string) => (event: SelectChangeEvent) => {
        const selectedPath = event.target.value;
        setDropdownState((prev) => ({ ...prev, [groupKey]: selectedPath }));
        navigate(`/${selectedPath}`);
    };

    return (
        <div className="bg-blue-600 text-white p-4 flex justify-between">
            <nav className="flex gap-4">
                {appRoutes
                    .filter((route) => route.showInNav)
                    .map((route) => {
                        // 📌 Wenn es ein Dropdown ist
                        if (route.children && route.children.length > 0) {
                            return (
                                <div className='flex items-center justify-center'>

                                    <FormControl
                                        key={route.label}
                                        // variant="standard"
                                        sx={{ m: 1, minWidth: 120 }}
                                    >
                                        <InputLabel id={`${route.label}-label`}>
                                            {route.label}
                                        </InputLabel>
                                        <Select
                                            labelId={`${route.label}-label`}
                                            value={dropdownState[route.label || ''] || ''}
                                            onChange={handleDropdownChange(route.label || '')}
                                            label={route.label}
                                        >
                                            {route.children.map((child) => (
                                                <MenuItem key={child.path} value={child.path}>
                                                    {child.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            );
                        }

                        // 📌 Standard NavLink
                        return (
                            <div className='flex items-center'>
                                <Typography variant="h6" >

                                    <NavLink
                                        key={route.path}
                                        to={route.path === 'home' ? '/' : `/${route.path}`}
                                        className={({ isActive }) =>
                                            isActive ? 'font-bold underline text-white' : 'text-white'
                                        }
                                    >
                                        {route.label}
                                    </NavLink>
                                </Typography>
                            </div>
                        );
                    })}
            </nav>
        </div>
    );
}

export default Header;
