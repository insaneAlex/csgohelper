export const getFormattedDate = () =>
  new Intl.DateTimeFormat('en-GB', {dateStyle: 'long', timeStyle: 'medium'}).format(new Date());
