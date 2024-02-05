import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { SUCCESS_COLOR, ERROR_COLOR } from '../utils/consts';
import { TProperty } from '../types/TProperty';
import { useParams } from 'react-router-dom';
import { GetPropertyById, PutPropertyById } from '../services/property-service';


const SUCCESS_MESSAGE = "Property edited succesfully!";
const ERROR_MESSAGE = "There was a problem with edit property. ";
const NO_CHANGES_MESSAGE = "You did not do any changes, so can not edit."


export default function EditProperty() {
    const { propertyId } = useParams();
    const [property, setProperty] = useState<TProperty>({} as TProperty);
    const [editedProperty, setEditedProperty] = useState<TProperty>({} as TProperty);
    const [message, setMessage] = useState<{ message: string, color: any }>({ message: '', color: '' });


    useEffect(() => {
        onLoad();
    }, [])

    const onLoad = async () => {
        const res = await GetPropertyById(propertyId ?? '');
        setProperty(res);
        setEditedProperty(res);
    };

    const onSave = () => {
        const p: TProperty =
        {
            title: editedProperty.title ?? property.title ?? '',
            area: editedProperty.area ?? property.area ?? '',
            country: editedProperty.country ?? property.country ?? '',
            city: editedProperty.city ?? property.city ?? '',
            address: editedProperty.address ?? property.address ?? '',
            price: editedProperty.price ?? property.price ?? '',
            rooms: editedProperty.rooms ?? property.rooms ?? '',
            baths: editedProperty.baths ?? property.baths ?? '',
            purpose: editedProperty.purpose ?? property.purpose ?? '',
        }
        try {
            PutPropertyById(property._id ?? '', p);
            setMessage({ message: SUCCESS_MESSAGE, color: SUCCESS_COLOR });

        } catch (err) {
            setMessage({ message: ERROR_MESSAGE, color: ERROR_COLOR });
        }
    };

    const onButtonClick = () => {
        if (
            editedProperty.title != property.title ||
            editedProperty.area != property.area ||
            editedProperty.country != property.country ||
            editedProperty.city != property.city ||
            editedProperty.address != property.address ||
            editedProperty.price != property.price ||
            editedProperty.rooms != property.rooms ||
            editedProperty.baths != property.baths ||
            editedProperty.purpose != property.purpose
        )
            onSave();
        else
            setMessage({ message: NO_CHANGES_MESSAGE, color: ERROR_COLOR });
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', m: 2 }}>
            <Typography component="h1" variant="h4" align="center">
                Property to edit
            </Typography>
            <p></p>

            <Grid container spacing={3}>

                <Grid item xs={12}></Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        disabled={true}
                        id="id"
                        name="id"
                        label="id"
                        value={property?._id ?? ''}
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="title"
                        name="title"
                        label="title"
                        value={editedProperty?.title ?? ''}
                        fullWidth
                        variant="standard"
                        onChange={(val) => { setEditedProperty({ ...editedProperty, title: val.target.value }) }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        onChange={(val) => { setEditedProperty({ ...editedProperty, address: val.target.value }) }}
                        id="address"
                        name="address"
                        label="address"
                        fullWidth
                        value={editedProperty?.address ?? ''}
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        onChange={(val) => { setEditedProperty({ ...editedProperty, city: val.target.value }) }}
                        id="city"
                        name="city"
                        label="city"
                        fullWidth
                        value={editedProperty?.city ?? ''}
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        onChange={(val) => { setEditedProperty({ ...editedProperty, rooms: parseInt(val.target.value) }) }}
                        id="rooms"
                        name="rooms"
                        type="number"
                        label="rooms"
                        fullWidth
                        value={editedProperty?.rooms ?? ''}
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        onChange={(val) => { setEditedProperty({ ...editedProperty, baths: parseInt(val.target.value) }) }}
                        id="baths"
                        name="baths"
                        label="baths"
                        type="number"
                        fullWidth
                        value={editedProperty?.baths ?? ''}
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="price"
                        name="price"
                        label="price"
                        type="number"

                        value={editedProperty?.price ?? ''}
                        fullWidth
                        variant="standard"
                        onChange={(val) => { setEditedProperty({ ...editedProperty, price: parseInt(val.target.value) }) }}
                    />
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <Typography component="h6" color={message.color} sx={{ mt: 5, ml: 1 }}>
                    {message.message}
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => { onButtonClick() }}
                    sx={{ mt: 3, ml: 1 }}
                >
                    Save
                </Button>
            </Box>

        </Box>

    );
}