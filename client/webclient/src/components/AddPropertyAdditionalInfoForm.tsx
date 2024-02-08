import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useRef } from 'react';
import Button from '@mui/material/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Box } from '@mui/material';

interface Props {
    changeAddress: (initialState: string) => void;
    changeRooms: (initialState: string) => void;
    changeBaths: (initialState: string) => void;
    changeArea: (initialState: string) => void;
    changeImgUrl: (initialState: File) => void;
    imgUrl: File | undefined;

}

export default function AddPropertyAdditionalInfoForm(props: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const imageSelected = (event: any) => {
        if (event.target.files && event.target.files.length > 0) {
            props.changeImgUrl(event.target.files[0]);
        }
    }
    const selectImg = () => {
        fileInputRef.current?.click();
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Add more info
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <TextField
                        required
                        onChange={(event) => props.changeAddress(event.target.value)}
                        id="address"
                        label="address"
                        fullWidth
                        autoComplete="address"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        onChange={(event) => props.changeRooms(event.target.value)}
                        id="rooms"
                        label="rooms"
                        type="number"
                        fullWidth
                        autoComplete="5"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        onChange={(event) => props.changeBaths(event.target.value)}
                        id="baths"
                        label="baths"
                        type="number"
                        fullWidth
                        autoComplete="2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        onChange={(event) => props.changeArea(event.target.value)}
                        id="area"
                        label="area"
                        type="number"
                        fullWidth
                        autoComplete="2222"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}></Grid>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
                    <center>
                        {props.imgUrl ? <img src={URL.createObjectURL(props.imgUrl)}
                            style={{ height: "200px", width: "200px" }}
                        ></img> : null}
                    </center>
                    <input
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        onChange={(event) => { imageSelected(event) }}
                        id="image"
                        type="file"
                    />
                    <Button
                        onClick={selectImg}>
                        <AddAPhotoIcon />
                    </Button>

                </Box>
            </Grid>

        </React.Fragment>
    );
}