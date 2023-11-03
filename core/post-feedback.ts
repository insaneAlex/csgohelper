import {FeedbackType} from './types';

export const postFeedback = async ({body, signal}: {body: FeedbackType; signal: AbortSignal}) => {
  const url = '/api/feedback';

  const response = await fetch(url, {
    signal,
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });
  return response.json();
};
