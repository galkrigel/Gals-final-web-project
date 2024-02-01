import { GoogleLogout } from 'react-google-login';
import { CLIENT_ID } from '../utils/consts';

const LogoutWithGoogle = () => {

    const onSuccess = () => {
        console.log("logout success ");
    }

    return (
        <div >
            <GoogleLogout
                clientId={CLIENT_ID}
                buttonText='Logout with Google'
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default LogoutWithGoogle;