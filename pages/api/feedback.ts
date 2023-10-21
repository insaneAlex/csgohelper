import axios from 'axios';
import {NextApiRequest, NextApiResponse} from 'next';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {data} = await axios.get('https://csgobackpack.net/');
    console.log(data);

    res.status(200).json({response: data});
  } catch (error) {
    res.status(200).json({error});
    console.log(`error on fetching https://csgobackpack.net/: ${error}`);
  }
};

export default handler;
