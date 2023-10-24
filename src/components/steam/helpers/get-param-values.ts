export const getParamValues = (params: any, param: string): any[] => {
  return params.get(param)?.split('_') || [];
};
