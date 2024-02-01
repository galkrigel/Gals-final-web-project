import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/UserIdSlice';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { Routers } from '../../enums/routers';



export default function Navbar() {
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const onLogout = () => {
        const token = localStorage.getItem("refreshToken") ?? '';
        console.log("logout token client:" + token);
        try {
            fetch(`http://localhost:3001/auth/logout`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            }).then(function (response) {
                return response.text()
            }).then(function (body) {
                console.log('logout successful', body);

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("_id");
                dispatch(logout());

                navigate(Routers.Login);
            });
        } catch (err: unknown) {
            console.log("error in action: " + err?.toString())
        }
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const dispatch = useDispatch();

    const handleLogout = () => {
        handleCloseUserMenu();
        // dispatch(logout());
        // navigate(Routers.Login);
        onLogout();
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

    const userId: string = useSelector(
        (state: RootState) => state.userId
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography onClick={handleLogoClick} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Real estate site
                        <p>user id: {userId}</p>
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                            <MenuItem onClick={handleLogout}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleAddProperty}>
                                <Typography textAlign="center">Add property</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleEditProfile}>
                                <Typography textAlign="center">Edit profile</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}