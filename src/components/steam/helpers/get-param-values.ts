import {ReadonlyURLSearchParams} from 'next/navigation';

export const getParamValues = (params: ReadonlyURLSearchParams, param: string): string[] => {
  return params.get(param)?.split('_') || [];
};
