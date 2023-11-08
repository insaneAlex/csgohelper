import {PriceType} from '../types';

export type AWSConfigType = {region: string; credentials: {accessKeyId: string; secretAccessKey: string}};

export type AmazonResponseType = {
  '$metadata': {
    httpStatusCode: number;
    requestId: string;
    extendedRequestId?: string;
    cfId?: string;
    attempts: number;
    totalRetryDelay: number;
  };
};

export type PricesType = Record<string, {price: PriceType}> | null;
