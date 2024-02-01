import { GoogleLogin } from 'react-google-login';
import { CLIENT_ID } from '../utils/consts';

const LoginWithGoogle = () => {

    const onSuccess = (res: any) => {
        console.log("login success " + res.profileObj);
    }

    const onFailure = (res: any) => {
        console.log("login failed " + res);
    }

    return (
        <div >
            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText='Login with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )

}

export default LoginWithGoogle;