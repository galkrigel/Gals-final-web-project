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

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching data' });
    }
}


export default {
    get
}