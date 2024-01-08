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
import { login } from '../../store/UserIdSlice';
import { TLoginData } from '../../types/TLoginData';
import { useState } from 'react';
import { TRegisterData } from '../../types/TRegisterData';
import { useNavigate } from 'react-router-dom';
import { Routers } from '../../enums/routers';

enum Action {
    Login,
    Register
}

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TLoginData>();

    const [action, setAction] = useState<Action>(Action.Login)
    const navigate = useNavigate();

    const toggleAction = () => {
        if (action == Action.Login)
            setAction(Action.Register)
        else
            setAction(Action.Login)
    }
    const userId: string = useSelector(
        (state: RootState) => state.userId
    );

    const dispatch = useDispatch();

    const onSubmit = (data: TLoginData | TRegisterData) => {
        console.log("data: " + data);
        let urlRoute;
        if (action == Action.Login)
            urlRoute = 'login';
        else
            urlRoute = 'register';

        try {
            fetch(`http://localhost:3001/auth/${urlRoute}`, {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('action successful', body);
                dispatch(login(body));
                navigate(Routers.Properties);

            });
        } catch (err: unknown) {
            console.log("error in action: " + err?.toString())
        }
    };

    return (
        <div className={styles.login}>
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
                {action == Action.Login ?
                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                        Login Form
                    </Typography>
                    : <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                        Registeration Form
                    </Typography>}
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
                {action == Action.Login ?
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button> :
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Register
                    </Button>
                }

                <Box mt={1} sx={{ mt: 2, textAlign: 'center' }}>
                    {action == Action.Login
                        ?
                        <Link href="#" variant="body2" onClick={toggleAction}>
                            Don't have an account? Sign Up
                        </Link>
                        :
                        <Link href="#" variant="body2" onClick={toggleAction}>
                            Already have an account? Sign in
                        </Link>}
                </Box>
            </Box>
        </div>
    );
};

export default LoginForm;