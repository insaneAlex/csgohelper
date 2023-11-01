import {SendEmailCommand} from '@aws-sdk/client-ses';

type Props = {toAddress: string; fromAddress: string; data: {text: string; name: string}};

export const createSendEmailCommand = ({toAddress, fromAddress, data}: Props) => {
  return new SendEmailCommand({
    Destination: {ToAddresses: [toAddress]},
    Message: {
      Body: {Html: {Charset: 'UTF-8', Data: data.text}},
      Subject: {Charset: 'UTF-8', Data: `New Feedback from ${data.name}!`}
    },
    Source: fromAddress
  });
};
