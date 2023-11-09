import {NextApiRequest, NextApiResponse} from 'next';
import {awsServices} from '@/src/services';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await awsServices.sendFeedback(JSON.parse(req.body));

      res.status(200).json({});
    } catch (e) {
      res.status(401).json({});
    }
  } else {
    res.status(400).json({});
  }
};

export default handler;
