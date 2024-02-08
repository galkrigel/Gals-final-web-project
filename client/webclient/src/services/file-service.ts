import { apiPost } from "./api";

export const uploadPhoto = async (photo: File) => {
    const formData = new FormData();
    if (photo) {
        formData.append("file", photo);
    }
    try {
        return apiPost("file?file=123.jpeg", {}, formData)
            .then(function (response) {
                console.log("uploaded photo: " + response);
                return response.json()
            }).then(function (body) {
                console.log('upload  photo successful', body.url);
                return body.url;
            });
    } catch (err) {
        console.log("error while uploading photo");
    }
}



