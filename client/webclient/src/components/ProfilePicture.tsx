

import { Avatar } from '@mui/material';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { TUser } from '../types/TUser';
import { GetUserById } from '../services/user-service';

interface Props {
    isNavbar: boolean;
}

const ProfilePicture = (props: Props) => {
    const [user, setUser] = useState<TUser>({ _id: '', email: 'a', firstName: '', secondName: '', imgUrl: '' });
    const _id = localStorage.getItem("_id") ?? '';
    let imgStyle = { height: "50px", width: "50px", borderRadius: "25px" };
    if (!props.isNavbar) {
        imgStyle = { height: "100px", width: "100px", borderRadius: "50px" };
    }

    useEffect(() => {
        onLoad();
    }, [])

    const onLoad = async () => {
        const res = await GetUserById(_id);
        setUser(res);
    };
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
            {user.imgUrl == null || user.imgUrl == undefined || user.imgUrl == '' ?
                <Avatar sx={{ bgcolor: grey[500] }}>{user.email[0].toUpperCase()}</Avatar> :
                <img src={user.imgUrl} style={imgStyle}></img>}
        </Box>
    )
}

export default ProfilePicture;

