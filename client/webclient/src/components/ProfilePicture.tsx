

import { Avatar, colors } from '@mui/material';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';


interface Props {
    image?: string;
    letter: string;
}

const ProfilePicture = (props: Props) => {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>

            {props.image == null || props.image == '' ?
                <Avatar sx={{ bgcolor: grey[500] }}>{props.letter}</Avatar> :
                <Avatar alt="profile picture" src={props.image} />}
        </Box>
    )
}

export default ProfilePicture;

