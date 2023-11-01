type Props = {body: {text: string; name: string}; signal: AbortSignal};

export const postFeedback = async ({body, signal}: Props) => {
  const url = '/api/feedback';

  const response = await fetch(url, {
    signal,
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });
  return response.json();
};
