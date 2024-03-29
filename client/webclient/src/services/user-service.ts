import { CredentialResponse } from "@react-oauth/google";
import { TUser } from "../types/TUser";
import { apiGet, apiPost, apiPut, headersWithAuth, headersWithoutAuth } from "./api";
import { Routers } from "../enums/routers";

// user: email, password, imgUrl?
export const Register = async (user: TUser) => {
    try {
        return apiPost('auth/register', headersWithoutAuth, JSON.stringify(user))
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('register successful', body);
                const access = body.accessToken;
                const refresh = body.refreshToken;
                const _id = body._id;

                localStorage.setItem("accessToken", access);
                localStorage.setItem("refreshToken", refresh);
                localStorage.setItem("_id", _id);
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

export const Logout = async () => {
    try {
        const token = localStorage.getItem("refreshToken") ?? '';
        return apiGet('auth/logout', headersWithAuth(token))
            .then(function (response) {
                return response.text()
            }).then(function (body) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("_id");
                console.log('logout successful', body);
            });
    } catch (err: unknown) {
        console.log("error in logout: " + err?.toString())
    }
}

export const GetUserById = async (_id: string) => {
    try {
        const token = localStorage.getItem("refreshToken") ?? '';
        return apiGet(`user/${_id}`, headersWithAuth(token))
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('getting user profile successful', body);
                return body;

            });
    } catch (err: unknown) {
        console.log("error in action get user profile: " + err?.toString())
    }
}

export const googleSignin = (credentialResponse: CredentialResponse) => {
 try {
    console.log("cre: " +JSON.stringify(credentialResponse));
        return apiPost(`auth/google`, headersWithoutAuth, JSON.stringify(credentialResponse))
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log("body: " +body);
                console.log('register with google profile successful', body);

                const access = body.accessToken;
                const refresh = body.refreshToken;
                const _id = body._id;

                localStorage.setItem("accessToken", access);
                localStorage.setItem("refreshToken", refresh);
                localStorage.setItem("_id", _id);

                return body;

            });
    } catch (err: unknown) {
        console.log("error in action get user profile: " + err?.toString())
    }
}

export const PutUserById = async (_id: string, user:TUser) => {
    try {
        const token = localStorage.getItem("refreshToken") ?? '';
        return apiPut(`user/${_id}`, headersWithAuth(token), JSON.stringify(user))
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('Edit user successful', body);
                return body;

            });
    } catch (err: unknown) {
        console.log("error in edit user profile: " + err?.toString())
    }
}


