import {NextApiRequest, NextApiResponse} from 'next';
import {awsServices} from '@/src/services';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await awsServices.sendFeedback(req.body);
      res.status(200).json({status: 'ok'});
    } catch (e) {
      res.status(401).json({status: 'fail'});
    }
  } else {
    res.status(400).json({});
  }
};

export default handler;
