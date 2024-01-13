// import { useEffect, useState } from "react";

// // TODO define base url
// export const baseUrl = '';

// export type TApiResponse = {
//     status: Number;
//     statusText: String;
//     data: any;
//     error: any;
//     loading: Boolean;
// };

// export const useApiGet = (url: string): TApiResponse => {
//     const [status, setStatus] = useState<Number>(0);
//     const [statusText, setStatusText] = useState<String>('');
//     const [data, setData] = useState<any>();
//     const [error, setError] = useState<any>();
//     const [loading, setLoading] = useState<boolean>(false);

//     const getAPIData = async () => {
//         setLoading(true);
//         try {
//             const apiResponse = await fetch(`${url}`, {
//                 method: 'GET',
//                 headers: {
//                     'APIkey': '673ff2cfe10c50bdfb1f296a5caf83f6',
//                     'Accept': 'application/json'
//                 }
//             });
//             const json = await apiResponse.json();
//             setStatus(apiResponse.status);
//             setStatusText(json.status.msg);
//             setData(json);
//         } catch (error) {
//             setError(error);
//         }
//         setLoading(false);
//     };

//     useEffect(() => {
//         getAPIData();
//     }, []);

//     return { status, statusText, data, error, loading };
// };


// const baseUrl = "http://localhost:3001/";
// const fetchFunc = (data: any, method: any, url: string, body: any, headers: any) => {
//     try {
//         fetch(`${baseUrl}${url}`, {
//             method: method,
//             body: body,
//             headers: headers
//         }).then(function (response) {
//             return response.json()
//         }).then(function (body) {
//             console.log('fetch successful', body);

//         });
//     } catch (err: unknown) {
//         console.log("error in fetch: " + err?.toString())
//     }
// };

// export default fetchFunc;

