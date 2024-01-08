//import {useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import styles from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { changeUserId } from '../../store/UserIdSlice';
import { TLoginData } from '../../types/TLoginData';


const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TLoginData>();


    const userId: string = useSelector(
        (state: RootState) => state.userId
    );

    const dispatch = useDispatch();

    const onSubmit = (data: TLoginData) => {
        console.log('Login successful', data);
        dispatch(changeUserId(data.email));
    };

    return (
        <div className={styles.login}>
            <p>user id: {userId}</p>
            <Box
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
                    control={<Checkbox {...register('rememberMe')} color="primary" />}
                    label="Remember Me"
                    sx={{ mt: 1, textAlign: 'left' }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Link href="#" variant="body2">
                        Forgot Password?
                    </Link>
                    <Box mt={1}>
                        <Link href="#" variant="body2">
                            Don't have an account? Sign Up
                        </Link>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default LoginForm;