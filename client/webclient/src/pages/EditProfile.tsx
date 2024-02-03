import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TUser } from '../types/TUser';
import ProfilePicture from '../components/ProfilePicture';
import { SUCCESS_COLOR, ERROR_COLOR } from '../utils/consts';


const SUCCESS_MESSAGE = "User profile edited succesfully!";
const ERROR_MESSAGE = "There was a problem with edit user profile. ";
const NO_CHANGES_MESSAGE = "You did not do any changes, so can not edit."


export default function EditProfile() {
    const token = localStorage.getItem("refreshToken") ?? '';
    const _id = localStorage.getItem("_id") ?? '';

    const [userProfile, setUserProfile] = useState<TUser>({ _id: '' , email: '', firstName: '', secondName: ''});
    const [editedProfile, setEditedProfile] = useState<TUser>({ _id: '', email: '', firstName: '', secondName: ''});
    const [message, setMessage] = useState<{ message: string, color: any }>({ message: '', color: '' });


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
                setEditedProfile(body);
            });
        } catch (err: unknown) {
            console.log("error in action get user profile: " + err?.toString())
        }
    };

    const onSave = () => {
        try {
            fetch(`http://localhost:3001/user/${_id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    email: editedProfile.email ?? userProfile ?? '',
                    firstName: editedProfile.firstName ?? userProfile.firstName ?? '',
                    secondName: editedProfile.secondName ?? userProfile.secondName ?? '',
                }),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            }).then(function (response) {
                return response.json();
            }).then(function (body) {
                setMessage({ message: SUCCESS_MESSAGE, color: SUCCESS_COLOR });
                console.log('edit user profile successful', body);
            });
        } catch (err: unknown) {
            setMessage({ message: ERROR_MESSAGE, color: ERROR_COLOR });
            console.log("error in action edit: " + err?.toString())
        }
    };

    const onButtonClick = () => {
        if (editedProfile.email != userProfile.email ||
            editedProfile.firstName != userProfile.firstName ||
            editedProfile.secondName != userProfile.secondName)
            onSave();
        else
            setMessage({ message: NO_CHANGES_MESSAGE, color: ERROR_COLOR });
    }

    return (
        <div >
            <React.Fragment>
                <CssBaseline />
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            User's details
                        </Typography>
                        <p></p>
                        <ProfilePicture  />

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
                                    value={editedProfile?.email ?? ''}
                                    fullWidth
                                    variant="standard"
                                    onChange={(val) => { setEditedProfile({ ...userProfile, email: val.target.value }) }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    onChange={(val) => { setEditedProfile({ ...userProfile, firstName: val.target.value }) }}
                                    id="first name"
                                    name="first name"
                                    label="first name"
                                    fullWidth
                                    value={editedProfile?.firstName ?? ''}
                                    variant="standard"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    onChange={(val) => { setEditedProfile({ ...userProfile, secondName: val.target.value }) }}
                                    id="second name"
                                    name="second name"
                                    label="second name"
                                    fullWidth
                                    value={editedProfile?.secondName ?? ''}
                                    variant="standard"
                                />
                            </Grid>

                        </Grid>
                        <React.Fragment>


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
                        </React.Fragment>
                    </Paper>
                </Container>
            </React.Fragment>
        </div>
    );
}