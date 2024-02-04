import { headersWithAuth } from "../utils/consts";
import {apiGet} from "./api";


export const getProperties = async () => {
    try {
        return apiGet('property', headersWithAuth)
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
