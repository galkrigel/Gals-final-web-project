
import { TProperty } from '../../types/TProperty';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import styles from './PropertyCard.module.css';
import { useNavigate } from 'react-router-dom';



interface Props {
    property: TProperty;
}

const PropertyCard = (props: Props) => {
    const navigate = useNavigate();

    const handlePropertyClick = () => {
    }
    // return (
    //     <Card  className={styles.card}>
    //         <CardActionArea onClick={() => { }}>
    //             <CardMedia
    //                 component="img"
    //                 height="140"
    //                 width="40"
    //                 image={props.property.coverPhoto.url}
    //                 alt=""
    //             />
    //             <CardContent>
    //                 <Typography gutterBottom variant="h5" component="div">
    //                     {props.property.title}
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                     contact: {props.property.contactName}, {props.property.phoneNumber.mobile}
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                     rooms: {props.property.rooms}, size: {props.property.area}
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                     price: {props.property.price}$
    //                 </Typography>
    //             </CardContent>
    //         </CardActionArea>
    //     </Card>
    // );

    return (
        <Card sx={{ display: 'flex' }} className={styles.card}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={props.property.coverPhoto.url}
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
                        contact: {props.property.contactName}, {props.property.phoneNumber.mobile}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        rooms: {props.property.rooms}, size: {props.property.area}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        price: {props.property.price}$
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    {/* <IconButton aria-label="previous">
                {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />} */}
                    {/* </IconButton>
              <IconButton aria-label="play/pause">
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
              <IconButton aria-label="next">
                {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
              </IconButton> */}
                </Box>
            </Box>
        </Card>
    );

}

export default PropertyCard;