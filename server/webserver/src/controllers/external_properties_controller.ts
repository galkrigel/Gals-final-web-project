import axios from 'axios';
import { Request, Response } from 'express';

const EXTERNAL_API_URL = 'https://re.ofir.dev/data';

   const get =  async (req: Request, res: Response) => {
        try {
            const response = await axios.get(EXTERNAL_API_URL, {
                params: {
                    limit: req.query.limit ?? 100,
                    offset: req.query.offset ?? 0,
                },
            });
            console.log('external properties: ', response.data);
            res.send(response.data);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching data' });
        }
    }


export default {
    get
}