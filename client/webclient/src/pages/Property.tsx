
import { TProperty } from "../types/TProperty";
import { TComment } from "../types/TComment";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import Comment from "../components/Comment";
import Grid from '@mui/material/Grid';



// interface Props {
//     property: TProperty;
// }

export const Property = () => {
    const { propertyId } = useParams();
    const token = localStorage.getItem("refreshToken") ?? '';
    const _id = localStorage.getItem("_id") ?? '';
    const [property, setProperty] = useState<TProperty>({} as TProperty);
    const [comment, setComment] = useState<TComment>({ ownerId: _id, text: '' });

    useEffect(() => {
        try {
            fetch(`http://localhost:3001/property/${propertyId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            }).then(function (response) {
                return response.json()
            }).then(function (body) {
                setProperty(body);
                console.log('get property successful', body);
            });
        } catch (err: unknown) {
            console.log("error in get property: " + err?.toString())
        }
    }, []);

    const onAddComment = () => {
        if (property.comments == null || property.comments == undefined) {
            property.comments = [];
        }
        property.comments.push(comment);

        try {
            fetch(`http://localhost:3001/property/${propertyId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: property.title,
                    purpose: property.purpose,
                    price: property.price,
                    country: property.country,
                    city: property.city,
                    address: property.address,
                    rooms: property.rooms,
                    baths: property.baths,
                    area: property.area,
                    comments: property.comments,

                }),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            }).then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('comment added', body);
                setProperty({ ...property, comments: property.comments })
            });
        } catch (err: unknown) {
            console.log("error in add comment: " + err?.toString())
        }
    };


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', m: 2 }}>
            <Box
                component="img"
                sx={{
                    height: 100,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                }}
                alt="The house from the offer."
                src={property?.coverPhoto?.url ?? ''}
            />

            <Grid container spacing={1}>

                <Grid item xs={12}></Grid>

                <Grid item xs={12}>
                    <Typography gutterBottom variant="h5" component="div">
                        Title: {property?.title}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography gutterBottom variant="h5" component="div">
                        Address: {property?.address}
                    </Typography>
                </Grid>

                <Grid item xs={12} >
                    <Typography gutterBottom variant="h5" component="div">
                        City: {property?.city}
                    </Typography>
                </Grid>

                <Grid item xs={12} >
                    <Typography gutterBottom variant="h5" component="div">
                        Rooms: {property?.rooms}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography gutterBottom variant="h5" component="div">
                        Bath: {property?.baths}
                    </Typography>
                </Grid>

                <Grid item xs={12} >
                    <Typography gutterBottom variant="h5" component="div">
                        Price: {property?.price}
                    </Typography>
                </Grid>

                {/* <Grid item xs={12} >
                    <Typography gutterBottom variant="h5" component="div">
                        Contect name: {property?.contactName}, Phone number: {property?.phoneNumber?.mobile}
                    </Typography>
                </Grid> */}

                <Grid item xs={12} >
                    <Typography gutterBottom variant="h5" component="div">
                        Purpose: {property?.purpose}
                    </Typography>
                </Grid>

                <Grid item xs={12} >
                    <Typography gutterBottom variant="h5" component="div">
                        Area: {property?.area} meters
                    </Typography>
                </Grid>

            </Grid>
            
            <p></p>
            <p></p>
            {property?.comments ?
                <div>
                    <Typography gutterBottom variant="h5" component="div">Comments:</Typography>
                    {property?.comments?.map((item: TComment, i: number) => (
                        <Comment key={i} comment={item} />
                    ))}
                </div>
                : <Typography gutterBottom variant="h5" component="div">No comments yet</Typography>
            }
            <TextField
                id="outlined-basic"
                label="Add a comment"
                variant="outlined"
                onChange={(val) => { setComment({ ...comment, text: val.target.value }) }}
            />
            <Button variant="contained" onClick={() => { onAddComment() }}>
                Add comment
            </Button>
        </Box>
    )
}