import {fetch} from '@/src/services/network';
import {FeedbackType} from './types';
import {postFeedbackUrl} from './constants';

export const postFeedback = async ({body: {name, text}, signal}: {body: FeedbackType; signal: AbortSignal}) =>
  fetch.post(postFeedbackUrl, {name, text}, {signal});
