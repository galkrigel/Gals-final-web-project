
import { TProperty } from "../types/TProperty";
import { TComment } from "../types/TComment";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import Comment from "../components/Comment";
import Grid from '@mui/material/Grid';
import { GetPropertyById, PutPropertyById } from "../services/property-service";

export const Property = () => {
    const { propertyId } = useParams();
    const _id = localStorage.getItem("_id") ?? '';
    const [property, setProperty] = useState<TProperty>({} as TProperty);
    const [comment, setComment] = useState<TComment>({ ownerId: _id, text: '' });

    const onLoad = async () => {
        const res = await GetPropertyById(propertyId ?? '');
        setProperty(res);
    };
    useEffect(() => {
        onLoad();
    }, []);

    const onAddComment = async () => {
        if (property.comments == null || property.comments == undefined) {
            property.comments = [];
        }
        property.comments.push(comment);
        await PutPropertyById(propertyId ?? '', property);
        setProperty({ ...property, comments: property.comments })
    }

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
            {property?.comments == null || property?.comments == undefined || property?.comments.length == 0 ?
                <Typography gutterBottom variant="h5" component="div">No comments yet</Typography> :
                <div>
                    <Typography gutterBottom variant="h5" component="div">Comments:</Typography>
                    {property?.comments?.map((item: TComment, i: number) => (
                        <Comment key={i} comment={item} />
                    ))}
                </div>
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