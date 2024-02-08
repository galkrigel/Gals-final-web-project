import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { Routers } from '../enums/routers';
import ProfilePicture from './ProfilePicture';
import { useEffect, useState } from 'react';
import { Logout } from '../services/user-service';


export default function Navbar() {
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [isUserConnected, setIsUserConnected] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("refreshToken") ?? '';
        if (token == null || token == '')
            setIsUserConnected(false);
        else
            setIsUserConnected(true);
    }, [localStorage.getItem("refreshToken")])

    const onLogout = async () => {
        await Logout();
        handleCloseUserMenu();
        navigate(Routers.Login);
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleAddProperty = () => {
        handleCloseUserMenu();
        navigate(Routers.AddProperty);
    };

    const handleEditProfile = () => {
        handleCloseUserMenu();
        navigate(Routers.EditProfile);
    };

    const handleLogoClick = () => {
        console.log("logo click");
        const token = localStorage.getItem("refreshToken") ?? '';
        if (token == null || token == '')
            navigate(Routers.Login);
        else
            navigate(Routers.Properties);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography onClick={handleLogoClick} variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        Real estate experts
                    </Typography>
                    {isUserConnected ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <ProfilePicture isNavbar={true} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={onLogout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleAddProperty}>
                                    <Typography textAlign="center">Add property</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleEditProfile}>
                                    <Typography textAlign="center">Edit profile</Typography>
                                </MenuItem>
                            </Menu>
                        </Box> : null}
                </Toolbar>
            </AppBar>
        </Box>
    );
}