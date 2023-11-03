export const areEqualArrays = (arr1: string[], arr2: string[]) =>
  arr1?.length !== arr2?.length ? false : arr1?.sort().every((value, index) => value === arr2.sort()?.[index]);
