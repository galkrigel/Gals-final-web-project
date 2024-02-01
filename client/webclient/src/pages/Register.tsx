
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Routers } from '../enums/routers';
import styles from '../css/Register.module.css';



const Register = () => {
    // const { watch } = useForm();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data: any) => {
        try {
            fetch(`http://localhost:3001/auth/register`, {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('register successful', body);
                navigate(Routers.Login);
            });
        } catch (err: unknown) {
            console.log("error in register: " + err?.toString())
        }
    };

    const moveToLoginPage = () => {
        navigate(Routers.Login);
    }

    return (
        <div className={styles.register}>
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
                    Registeration Form
                </Typography>
                <TextField
                    fullWidth
                    label="email"
                    {...register('email', {
                        required: 'email is required',
                        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    })}
                    error={Boolean(errors.email)}
                    // helperText={errors.username?.message}
                    margin="normal"
                />
                {/* <TextField
                    fullWidth
                    label="username"
                    {...register('username', {
                        required: 'username is required',
                        minLength: 3
                    })}
                    error={Boolean(errors.username)}
                    // helperText={errors.username?.message}
                    margin="normal"
                /> */}
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
                {/* <TextField
                    fullWidth
                    type="password"
                    label="confirm password"
                    {...register('confirm_password', {
                        required: 'true',
                        validate: (val: string) => {
                            if (watch('password') != val) {
                                return "Your passwords do no match";
                            }
                        },
                    })}
                    error={Boolean(errors.confirm_password)}
                    //helperText={errors.password?.message}
                    margin="normal"
                    sx={{ mt: 2 }}
                /> */}
                <FormControlLabel
                    control={<Checkbox {...register} color="primary" />}
                    label="Remember Me"
                    sx={{ mt: 1, textAlign: 'left' }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Register
                </Button>
                <Box mt={1} sx={{ mt: 2, textAlign: 'center' }}>

                    <Link href="#" variant="body2" onClick={moveToLoginPage}>
                        Already have an account? Sign in
                    </Link>
                </Box>
            </Box>
        </div>
    );
};

export default Register;