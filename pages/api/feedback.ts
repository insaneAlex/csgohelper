import {createSendEmailCommand} from '@/server-helpers';
import {NextApiRequest, NextApiResponse} from 'next';
import {SESClient} from '@aws-sdk/client-ses';
import {AWS_REGION} from '@/src/services';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;
    const email = process.env.AWS_SES_EMAIL as string;

    const sesClient = new SESClient({region: AWS_REGION, credentials: {accessKeyId, secretAccessKey}});
    const sendEmailCommand = createSendEmailCommand({data: req.body, fromAddress: email, toAddress: email});

    try {
      await sesClient.send(sendEmailCommand);
      res.status(200).json({});
    } catch (e) {
      console.error('Failed to send email.');
      return e;
    }
  } else {
    res.status(400).json({});
  }
};

export default handler;
