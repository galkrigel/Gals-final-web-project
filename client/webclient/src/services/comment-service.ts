import { TComment } from "../types/TComment";
import { apiGet, apiPost, headersWithAuth } from "./api";


export const getComments = async () => {
    try {
        const token = localStorage.getItem("refreshToken") ?? '';
        return apiGet('comment', headersWithAuth(token))
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('get comments successful', body);
                return body;
            });
    } catch (err: unknown) {
        console.log("error in get comments: " + err?.toString())
    }
}


export const GetCommentsByPropertyId = async (propertyId: string) => {
    try {
        const token = localStorage.getItem("refreshToken") ?? '';
        return apiGet(`comment/${propertyId}`, headersWithAuth(token))
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('getting comments successful', body);
                return body;

            });
    } catch (err: unknown) {
        console.log("error in action get user profile: " + err?.toString())
    }
}

export const PostComment = async (comment: TComment) => {
    try {
        const token = localStorage.getItem("refreshToken") ?? '';
        return apiPost(`comment/`, headersWithAuth(token), JSON.stringify(comment))
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('add comment successful', body);
                return body;
            });
    } catch (err: unknown) {
        console.log("error in add comment: " + err?.toString())
    }
}