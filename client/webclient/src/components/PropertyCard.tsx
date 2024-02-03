
import { TProperty } from '../types/TProperty';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea } from '@mui/material';
import styles from '../css/PropertyCard.module.css';


interface Props {
    property: TProperty;
    onDeleteProperty: (_id: string) => void;
}

const PropertyCard = (props: Props) => {
    const connectedUserId = localStorage.getItem("_id") ?? '';

const onDelete =() => {
    const token = localStorage.getItem("refreshToken") ?? '';
    try {
        fetch(`http://localhost:3001/property/${props.property._id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
        }).then(function (response) {
            return response.text()
        }).then(function (body) {
            props.onDeleteProperty(props.property._id);
            console.log('delete successful', body);
        });
    } catch (err: unknown) {
        console.log("error in delete: " + err?.toString())
    }
};

    const handlePropertyClick = () => {
    }


    return (
        <Card sx={{ display: 'flex' }} className={styles.card}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={props.property.coverPhoto?.url ?? ''}
                alt="property image"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }} className={styles.box}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <CardActionArea onClick={() => { }}>
                        <Typography component="div" variant="h5">
                            {props.property.title}
                        </Typography>
                    </CardActionArea>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        contact: {props.property.contactName ?? ''}, {props.property.phoneNumber?.mobile ?? ''}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        rooms: {props.property.rooms ?? ''}, size: {props.property.area ?? ''}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        price: {props.property.price ?? ''}$
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
             
                </Box>
            </Box>
            {connectedUserId == props.property.ownerID.toString() ? <Box>
                <Button variant="contained" onClick={()=>{}}>
                    Edit
                </Button>
                <Button variant="contained" onClick={()=>{onDelete()}}>
                    Delete
                </Button>
            </Box> : null}
        </Card>
    );

}

export default PropertyCard;