import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { TLoginData } from '../types/TLoginData';
import { useNavigate } from 'react-router-dom';
import { Routers } from '../enums/routers';
import { useState } from 'react';
import { ERROR_COLOR } from '../utils/consts';
import styles from '../css/Login.module.css';
import { Login as LoginFunc } from '../services/user-service';
import { TUser } from '../types/TUser';

const ERROR_MESSAGE = "There was a problem to login. ";

const Login = () => {
    const [message, setMessage] = useState<{ message: string, color: any }>({ message: '', color: '' });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TLoginData>();

    const navigate = useNavigate();

    const moveToRegisterPage = () => {
        navigate(Routers.Register);
    }

    const onSubmit = async (data: any) => {
        const user: TUser = { email: data.email, password: data.password, };
        try {
            await LoginFunc(user);
            navigate(Routers.Properties);
        } catch (err: unknown) {
            console.log("err in login " + err);
            setMessage({ message: ERROR_MESSAGE, color: ERROR_COLOR });
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
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%'
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
                {/* <FormControlLabel
                    control={<Checkbox {...register} color="primary" />}
                    label="Remember Me"
                    sx={{ mt: 1, textAlign: 'left' }}
                /> */}
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
            </Box>
        </div>
    );
};

export default Login;