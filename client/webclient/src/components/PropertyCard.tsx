
import { TProperty } from '../types/TProperty';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea } from '@mui/material';
import styles from '../css/PropertyCard.module.css';
import { useNavigate } from 'react-router-dom';
import { Routers } from '../enums/routers';
import { DeletePropertyById } from '../services/property-service';

interface Props {
    property: TProperty;
    onDeleteProperty: (_id: string) => void;
}

const PropertyCard = (props: Props) => {
    const connectedUserId = localStorage.getItem("_id") ?? '';
    const navigate = useNavigate();

    const onDelete = async () => {
        await DeletePropertyById(props.property._id!);
        props.onDeleteProperty(props.property._id!);

    };

    const handlePropertyClick = () => {
        if (props.property._id != null)
            navigate(Routers.Property + `/${props.property._id}`);
        else
            console.log("property _id is null, can't navigate");
    }

    const handlePropertyEditClick = () => {
        if (props.property._id != null)
            navigate(Routers.EditProperty + `/${props.property._id}`);
        else
            console.log("property _id is null, can't edit");
    }

    return (
        <Card sx={{ display: 'flex', justifyContent: 'space-between' }} className={styles.card}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={props.property.coverPhoto?.url ?? ''}
                    alt="property image"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }} className={styles.box}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <CardActionArea onClick={() => { handlePropertyClick() }}>
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

                        {props.property.comments?.length == 0 || !props.property.comments ?
                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                no comments</Typography> :
                            <Typography variant="subtitle2" color="text.secondary" component="div">{props.property.comments.length} comments</Typography>}

                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                    </Box>
                </Box>
            </Box>
            {connectedUserId == props.property.ownerID!.toString() ? <Box>
                <Button variant="contained" onClick={() => { handlePropertyEditClick() }}>
                    Edit
                </Button>
                <Button variant="contained" onClick={() => { onDelete() }}>
                    Delete
                </Button>
            </Box> : null}
        </Card>
    );

}

export default PropertyCard;