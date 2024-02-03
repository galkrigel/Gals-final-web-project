

import { Avatar } from '@mui/material';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { TUser } from '../types/TUser';


const ProfilePicture = () => {
    const [user, setUser] = useState<TUser>({ _id: '', email: 'a', firstName: '', secondName: '', image: '' });

    const token = localStorage.getItem("refreshToken") ?? '';
    const _id = localStorage.getItem("_id") ?? '';


    useEffect(() => {
        onLoad();
    }, [])

    const onLoad = () => {
        try {
            fetch(`http://localhost:3001/user/${_id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            }).then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('getting user profile successful', body);
                setUser(body);
            });
        } catch (err: unknown) {
            console.log("error in action get user profile: " + err?.toString())
        }
    };
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
            {user.image == null || user.image == '' ?
                <Avatar sx={{ bgcolor: grey[500] }}>{user.email[0].toUpperCase()}</Avatar> :
                <Avatar alt="profile picture" src={user.image} />}
        </Box>
    )
}

export default ProfilePicture;

