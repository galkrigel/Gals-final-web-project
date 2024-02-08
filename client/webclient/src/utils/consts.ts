import { colors } from '@mui/material';

// const token = localStorage.getItem("refreshToken") ?? '';


const CLIENT_ID: string = '690078499532-dknbcb8qpo9a04rq7mn12otmiqsqnqqp.apps.googleusercontent.com';

const SUCCESS_COLOR = colors.green[400];
const ERROR_COLOR = colors.red[400];


const EXTERNAL_API_LIMIT=10;
// const headersWithAuth = {
//     "Content-Type": "application/json",
//     "authorization": `Bearer ${token}`
// }
// const headersWithoutAuth = {
//     "Content-Type": "application/json",
// }


export { CLIENT_ID, SUCCESS_COLOR, ERROR_COLOR, EXTERNAL_API_LIMIT};