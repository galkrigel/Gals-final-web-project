import { colors } from '@mui/material';

const token = localStorage.getItem("refreshToken") ?? '';


const CLIENT_ID: string = '690078499532-dknbcb8qpo9a04rq7mn12otmiqsqnqqp.apps.googleusercontent.com';

const SUCCESS_COLOR = colors.green[400];
const ERROR_COLOR = colors.red[400];

const headersWithAuth = {
    "Content-Type": "application/json",
    "authorization": `Bearer ${token}`
}
const headersWithoutAuth = {
    "Content-Type": "application/json",
}

const noHeaders={}

export { CLIENT_ID, SUCCESS_COLOR, ERROR_COLOR, headersWithAuth, headersWithoutAuth, noHeaders};