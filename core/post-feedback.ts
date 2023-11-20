import {fetch} from '@/src/services/network';
import {FeedbackType} from './types';
import {postFeedbackUrl} from './constants';

export const postFeedback = ({body, signal}: {body: FeedbackType; signal: AbortSignal}) =>
  fetch.post(postFeedbackUrl, body, {signal});
