import {fetch} from '@/src/services/network';
import {FeedbackType} from './types';

export const postFeedback = async ({body: {name, text}, signal}: {body: FeedbackType; signal: AbortSignal}) =>
  fetch.post('/api/feedback', {name, text}, {signal});
