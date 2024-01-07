import { Box, Flex, Image, Text, Avatar, Link } from '@chakra-ui/react';
import { TProperty } from '../../types/TProperty';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface Props {
    property: TProperty;
}

const PropertyCard = (props: Props) => {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={()=>{}}>
                <CardMedia
                    component="img"
                    height="140"
                    image=''
                    alt=""
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {props.property.summary.propclass}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        country: {props.property.address.country}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    rooms: {props.property.building.rooms.beds}, size: {props.property.building.size.universalsize}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    built at: {props.property.summary.yearbuilt}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );

}

export default PropertyCard;