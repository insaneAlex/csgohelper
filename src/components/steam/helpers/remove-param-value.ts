export const removeParamValue = (values: string[], param: string) =>
  values.filter((paramValue) => paramValue !== param);
