import axios from 'axios';
import { Request, Response } from 'express';

const EXTERNAL_API_URL = 'https://re.ofir.dev/data';


const get = async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit ?? 10;
        const offset = req.query.offset ?? 0;
        const url = `${EXTERNAL_API_URL}?limit=${limit}&offset=${offset}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log("params:" + limit);
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching data' });
    }
}


//    const get =  async (req: Request, res: Response) => {
//         try {
//             const response = await axios.get(EXTERNAL_API_URL, {
//                 params: {
//                     limit: req.query.limit ?? 10,
//                     offset: req.query.offset ?? 0,
//                 },
//             });
//             console.log("params:" + req.query.limit);
//             //console.log('external properties: ', response.data);
//             res.send(response.data);
//         } catch (error) {
//             res.status(500).send({ message: 'Error fetching data' });
//         }
//     }


export default {
    get
}