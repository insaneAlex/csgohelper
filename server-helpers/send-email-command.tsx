import {FeedbackType} from '@/core/types';
import {SendEmailCommand} from '@aws-sdk/client-ses';

type Props = {toAddress: string; fromAddress: string; data: FeedbackType};

export const createSendEmailCommand = ({toAddress, fromAddress, data}: Props) =>
  new SendEmailCommand({
    Destination: {ToAddresses: [toAddress]},
    Message: {Body: {Text: {Data: data.text}}, Subject: {Data: `New Feedback from ${data.name}!`}},
    Source: fromAddress
  });
