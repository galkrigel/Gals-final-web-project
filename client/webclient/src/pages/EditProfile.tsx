import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';


export default function EditProfile() {
    const token = localStorage.getItem("refreshToken") ?? '';
    const _id = localStorage.getItem("_id") ?? '';

    const [userProfile, setUserProfile] = useState<any>(null);


    useEffect(() => {
        onLoad();
    }, [])

    const onLoad = () => {
        try {
            fetch(`http://localhost:3001/user/${_id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            }).then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('getting user profile successful', body);
                setUserProfile(body);

            });
        } catch (err: unknown) {
            console.log("error in action get user profile: " + err?.toString())
        }
    };

    const onSave = () => {
        try {
            fetch(`http://localhost:3001/student/${_id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            }).then(function (response) {
                return response.text()
            }).then(function (body) {
                console.log('edit user profile successful', body);
            });
        } catch (err: unknown) {
            console.log("error in action edit: " + err?.toString())
        }
    };
    return (
        <div >
            <React.Fragment>
                <CssBaseline />
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            User's details
                        </Typography>
                        <Grid container spacing={3}>

                            <Grid item xs={12}></Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    disabled={true}
                                    id="id"
                                    name="id"
                                    label="id"
                                    value={userProfile?._id ?? ''}
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="email"
                                    name="email"
                                    label="email"
                                    value={userProfile?.email ?? ''}
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    // onChange={(event) => props.changeCountry(event.target.value)}
                                    id="first name"
                                    name="first name"
                                    label="first name"
                                    fullWidth
                                    value={userProfile?.firstName ?? ''}
                                    variant="standard"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    //onChange={(event) => props.changeCity(event.target.value)}
                                    id="second name"
                                    name="second name"
                                    label="second name"
                                    fullWidth

                                    value={userProfile?.secondName ?? ''}

                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </React.Fragment>
        </div>
    );
}