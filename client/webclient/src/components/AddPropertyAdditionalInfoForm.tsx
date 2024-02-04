import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

interface Props {
    changeAddress: (initialState: string) => void;
    changeRooms: (initialState: string) => void;
    changeBaths: (initialState: string) => void;
    changeArea: (initialState: string) => void;
}

export default function AddPropertyAdditionalInfoForm(props: Props) {
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
                        fullWidth
                        autoComplete="2222"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* <input
                        required
                        onChange={(event) => {}}
                        id="image"
                        type="file"
                
                    /> */}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}