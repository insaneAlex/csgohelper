import axios from 'axios';
import {NextApiRequest, NextApiResponse} from 'next';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {data} = await axios.get('https://example.com/');
    console.log(data);

    res.status(200).json({data});
  } catch (error) {
    res.status(200).json({error});
    console.log(`error on fetching https://example.com/ : ${error}`);
  }
};

export default handler;
