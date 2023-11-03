import {createSendEmailCommand} from '@/server-helpers';
import {NextApiRequest, NextApiResponse} from 'next';
import {SESClient} from '@aws-sdk/client-ses';
import {AWS_REGION} from '@/src/services';
import {ENV} from '@/src/services/environment';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {AWS_ACCESS_KEY_ID: accessKeyId, AWS_SECRET_ACCESS_KEY: secretAccessKey, AWS_SES_EMAIL: email} = ENV;

    const sesClient = new SESClient({region: AWS_REGION, credentials: {accessKeyId, secretAccessKey}});
    const sendEmailCommand = createSendEmailCommand({data: req.body, fromAddress: email, toAddress: email});

    try {
      await sesClient.send(sendEmailCommand);
      res.status(200).json({});
    } catch (e) {
      res.status(401).json({});
    }
  } else {
    res.status(400).json({});
  }
};

export default handler;
