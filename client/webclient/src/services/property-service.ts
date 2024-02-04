import { TProperty } from "../types/TProperty";
import { apiDelete, apiGet, apiPost, headersWithAuth } from "./api";


export const getProperties = async () => {
    try {
        const token = localStorage.getItem("refreshToken") ?? '';
        return apiGet('property', headersWithAuth(token))
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('get properties successful', body);
                return body;
            });
    } catch (err: unknown) {
        console.log("error in get properties: " + err?.toString())
    }
}

export const DeletePropertyById = async (_id: string) => {
    try {
        const token = localStorage.getItem("refreshToken") ?? '';

        return apiDelete(`property/${_id}`, headersWithAuth(token))
            .then(function (response) {
                return response.text()
            }).then(function (body) {
                console.log('delete successful', body);
                return body;
            });
    } catch (err: unknown) {
        console.log("error in delete: " + err?.toString())
    }
}

export const PostProperty = async (property: TProperty) => {
    try {
        const token = localStorage.getItem("refreshToken") ?? '';
        return apiPost(`property/`, headersWithAuth(token), JSON.stringify(property))
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('add property successful', body);
                return body;
            });
    } catch (err: unknown) {
        console.log("error in add property: " + err?.toString())
    }
}
