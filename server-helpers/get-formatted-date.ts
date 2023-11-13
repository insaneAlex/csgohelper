export const getFormattedDate = (date: Date) =>
  new Intl.DateTimeFormat('en-GB', {dateStyle: 'long', timeStyle: 'medium'}).format(date);
