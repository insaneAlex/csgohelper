type Props = {items: any[]; pageNumber: number; pageSize: number};

export const paginate = ({items, pageNumber, pageSize}: Props) => {
  if (pageSize <= items.length) {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  }
  return items;
};
