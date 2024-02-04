import { TUser } from "../types/TUser";
import { headersWithoutAuth } from "../utils/consts";
import {apiPost} from "./api";

// user: email, password, imgUrl?
export const Register = async (user: TUser) => {
    try {
        return apiPost('auth/register', headersWithoutAuth, JSON.stringify(user))
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('register successful', body);
            });
    } catch (err: unknown) {
        console.log("error in register: " + err?.toString())
    }
}
// user: email, password
export const Login = async (user: TUser) => {
    try {
        return apiPost('auth/login', headersWithoutAuth, JSON.stringify(user))
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('login successful', body);
                const access = body.accessToken;
                const refresh = body.refreshToken;
                const _id = body._id;

                localStorage.setItem("accessToken", access);
                localStorage.setItem("refreshToken", refresh);
                localStorage.setItem("_id", _id);
            });
    } catch (err: unknown) {
        console.log("error in login: " + err?.toString())
    }
}
