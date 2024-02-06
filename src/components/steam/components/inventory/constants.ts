export const DUPLICATES_PARAM = 'duplicates';
export const SORT = 'sort';

export enum SortTypes {
  Relevance = 'relevance',
  HighPrice = 'highPrice',
  LowPrice = 'lowPrice'
}

export const SORT_OPTIONS = [
  {name: 'Relevance', value: SortTypes.Relevance},
  {name: 'High price', value: SortTypes.HighPrice},
  {name: 'Low price', value: SortTypes.LowPrice}
];
