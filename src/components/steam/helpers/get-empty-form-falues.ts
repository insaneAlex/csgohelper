import {isEmpty} from './is-empty';

export const getEmptyFormValues = (data: Record<string, string>) => {
  const errors = {} as Partial<Record<string, string>>;

  for (const field in data) {
    if (isEmpty(data[field])) {
      errors[field] = 'Required field';
    }
  }
  return errors;
};
