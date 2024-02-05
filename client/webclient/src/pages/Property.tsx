
import { TProperty } from "../types/TProperty";
import { TComment } from "../types/TComment";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import Comment from "../components/Comment";
import Grid from '@mui/material/Grid';
import { GetPropertyById, getPropertyFromExternalApi } from "../services/property-service";
import PropertyDefault from '../assets/propertyDefault.jpeg';
import { GetCommentsByPropertyId, PostComment, } from "../services/comment-service";

export const Property = () => {
    const { propertyId, isExternal } = useParams();
    const _id = localStorage.getItem("_id") ?? '';
    const [property, setProperty] = useState<TProperty>({} as TProperty);
    const [comment, setComment] = useState<TComment>({ userId: _id, propertyId: propertyId ?? '', text: '' });
    const [propertyComments, setPropertyComments] = useState<TComment[]>([]);


    const getProperty = async () => {
        let p: TProperty;
        if (isExternal == "true") {
            p = await getPropertyFromExternalApi(propertyId ?? '');
        }
        else {
            p = await GetPropertyById(propertyId ?? '');
        }
        const comments = await GetCommentsByPropertyId(propertyId ?? '');
        setProperty(p);
        setPropertyComments(comments);
    }

    useEffect(() => {
        getProperty();
    }, []);

    const onAddComment = async () => {
        await PostComment(comment);
        setPropertyComments([...propertyComments, comment]);
    }

    const imgUrl = () => {
        if (property.imgUrl && property.imgUrl != "")
            return property.imgUrl;
        else return PropertyDefault;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', m: 2 }}>
            <Box
                component="img"
                sx={{
                    height: 400,
                    width: 300,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                }}
                alt="The house from the offer."
                src={imgUrl()}
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

            {propertyComments == null || propertyComments == undefined || propertyComments.length == 0 ?
                <Typography gutterBottom variant="h5" component="div">No comments yet</Typography> :
                <div>
                    <Typography gutterBottom variant="h5" component="div">Comments:</Typography>
                    {propertyComments?.map((item: TComment, i: number) => (
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