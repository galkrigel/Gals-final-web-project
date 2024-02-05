
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Routers } from '../enums/routers';
import styles from '../css/Register.module.css';
import avater from '../assets/avatar.jpeg';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useState, useRef } from 'react';
import { uploadPhoto } from '../services/file-service';
import { Register as RegisterFunc } from '../services/user-service';
import { TUser } from '../types/TUser';
import { ERROR_COLOR } from '../utils/consts';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { googleSignin } from '../services/user-service';

const ERROR_MESSAGE = "There was a problem to register. ";


const Register = () => {
    const [message, setMessage] = useState<{ message: string, color: any }>({ message: '', color: '' });
    const [imgSrc, setImgSrc] = useState<File>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        let url = '';
        if (imgSrc != null && imgSrc != undefined) {
            url = await uploadPhoto(imgSrc!);
            console.log("upload returned:" + url);
        }
        const user: TUser =
        {
            email: data.email,
            password: data.password,
            imgUrl: url
        };

        try {
            await RegisterFunc(user);
            navigate(Routers.Login);
        } catch (err: unknown) {
            setMessage({ message: ERROR_MESSAGE, color: ERROR_COLOR });
        }
    };

    const moveToLoginPage = () => {
        navigate(Routers.Login);
    }
    const imageSelected = (event: any) => {
        if (event.target.files && event.target.files.length > 0) {
            setImgSrc(event.target.files[0]);
        }
    }
    const selectImg = () => {
        fileInputRef.current?.click();
    }

    const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        try {
            const res = await googleSignin(credentialResponse);
            console.log("google sign in: " + res);
        } catch (err) {
            console.log("error in sign in with google: " + err);
        }

    }

    const onGoogleLoginError = () => {

    }


    return (
        <div className={styles.register}>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    maxWidth: '500px',
                    width: '100%',
                    margin: 'auto',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                    Registeration Form
                </Typography>

                <img src={imgSrc ? URL.createObjectURL(imgSrc) : avater}
                    style={{ height: "200px", width: "200px" }}
                ></img>

                <input
                    style={{ display: "none" }}
                    ref={fileInputRef}

                    onChange={(event) => { imageSelected(event) }}
                    id="image"
                    type="file"
                />
                <Button
                    onClick={selectImg}>
                    <AddAPhotoIcon
                    />
                </Button>


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
                {message.message != '' ?
                    <Typography component="h6" color={message.color} sx={{ mt: 5, ml: 1 }}>
                        {message.message}
                    </Typography>
                    : null}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} >
                    Register
                </Button>
                <Box mt={1} sx={{ mt: 2, textAlign: 'center' }}>

                    <Link href="#" variant="body2" onClick={moveToLoginPage}>
                        Already have an account? Sign in
                    </Link>
                </Box>

                <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginError} />

            </Box>

            {/* <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginError} /> */}
        </div>
    );
};

export default Register;