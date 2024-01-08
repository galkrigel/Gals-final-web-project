import { Box, Flex, Image, Text, Avatar, Link } from '@chakra-ui/react';
import { TProperty } from '../../types/TProperty';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styles from './PropertyCard.module.css';

interface Props {
    property: TProperty;
}

const PropertyCard = (props: Props) => {

    return (
        <Card sx={{ maxWidth: 345 }} className={styles.card}>
            <CardActionArea onClick={() => { }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.property.coverPhoto.url}
                    alt=""
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.property.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        contact: {props.property.contactName}, {props.property.phoneNumber.mobile}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        rooms: {props.property.rooms}, size: {props.property.area}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        price: {props.property.price}$
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );

}

export default PropertyCard;