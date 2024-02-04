import { Method } from "../enums/methods";

const headersWithoutAuth = {
    "Content-Type": "application/json",
}

const headersWithAuth = (token: string) => {
    return {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
    }
}

const apiGet = async (url: string, headers: any) => {
    return fetch(`http://localhost:3001/${url}`, {
        method: Method.Get,
        headers: headers,
    })
}

const apiPost = async (url: string, headers: any, body: any) => {
    return fetch(`http://localhost:3001/${url}`, {
        method: Method.Post,
        body: body,
        headers: headers,
    })
}

const apiPut = async (url: string, headers: any, body: any) => {
    return fetch(`http://localhost:3001/${url}`, {
        method: Method.Put,
        body: body,
        headers: headers,
    })
}

const apiDelete = async (url: string, headers: any) => {
    return fetch(`http://localhost:3001/${url}`, {
        method: Method.Delete,
        headers: headers,
    })
}

export { apiGet, apiPost, apiPut, apiDelete, headersWithAuth, headersWithoutAuth };