export const getReadableDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
