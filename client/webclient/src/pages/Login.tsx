//import {useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../store/UserIdSlice';
import { TLoginData } from '../types/TLoginData';
import { useNavigate } from 'react-router-dom';
import { Routers } from '../enums/routers';
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { CLIENT_ID, ERROR_COLOR } from '../utils/consts';
import styles from '../css/Login.module.css';
import LoginWithGoogle from '../components/LoginWithGoogle';

const ERROR_MESSAGE = "There was a problem to login. ";

const Login = () => {
    const [message, setMessage] = useState<{ message: string, color: any }>({ message: '', color: '' });

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: CLIENT_ID,
                scope: ""
            })
        };
        gapi.load('client:auth2', start);
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TLoginData>();

    const navigate = useNavigate();

    const moveToRegisterPage = () => {
        navigate(Routers.Register);
    }

    const dispatch = useDispatch();

    const onSubmit = (data: any) => {
        try {
            fetch(`http://localhost:3001/auth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('login successful', body);

                const access = body.accessToken;
                const refresh = body.refreshToken;
                const _id = body._id;

                localStorage.setItem("accessToken", access);
                localStorage.setItem("refreshToken", refresh);
                localStorage.setItem("_id", _id);

                dispatch(login(body));
                navigate(Routers.Properties);
            });
        } catch (err: unknown) {
            setMessage({ message: ERROR_MESSAGE, color: ERROR_COLOR });
            console.log("error in action: " + err?.toString())
        }
    };

    return (
        <div className={styles.login}>
            <Box
                className={styles.box}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    maxWidth: '500px',
                    margin: 'auto',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    backgroundColor: 'white',
                }}
            >

                <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                    Login Form
                </Typography>

                <TextField
                    fullWidth
                    label="email"
                    {...register('email', {
                        required: 'email is required',
                        minLength: {
                            value: 3,
                            message: 'email must be at least 3 characters',
                        },
                    })}
                    error={Boolean(errors.email)}
                    // helperText={errors.username?.message}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 2 characters',
                        },
                    })}
                    error={Boolean(errors.password)}
                    // helperText={errors.password?.message}
                    margin="normal"
                    sx={{ mt: 2 }}
                />
                <FormControlLabel
                    control={<Checkbox {...register} color="primary" />}
                    label="Remember Me"
                    sx={{ mt: 1, textAlign: 'left' }}
                />
                {message.message != '' ?
                    <Typography component="h6" color={message.color} sx={{ mt: 5, ml: 1 }}>
                        {message.message}
                    </Typography>
                    : null}

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>
                <Box mt={1} sx={{ mt: 2, textAlign: 'center' }}>
                    <Link href="#" variant="body2" onClick={moveToRegisterPage}>
                        Don't have an account? Sign Up
                    </Link>

                </Box>
                <p></p>
                <LoginWithGoogle />
            </Box>
        </div>
    );
};

export default Login;