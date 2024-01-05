import { Box, Flex, Image, Text, Avatar, Link } from '@chakra-ui/react';
import { PropertyType } from '../models/Property';

interface Props {
    property: PropertyType;
}

const Property = (props: Props) => {
    return (
        <div>
            <p>id: {props.property.objectID}</p>
            <p>price: {props.property.price.toString()}</p>
            <p>contact name: {props.property.contactName}</p>
            <p>rooms: {props.property.rooms.toString()}</p>
            <p>------------------------</p>
        </div>
    );

}

export default Property;