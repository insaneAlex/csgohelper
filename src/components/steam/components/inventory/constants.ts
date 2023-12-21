export const DUPLICATES_PARAM = 'duplicates';
export const SORT = 'sort';
export const MAX_ITEMS = 40;

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

export const GRID_CONFIG = {
  cols: {lg: 16, md: 12, sm: 20, xs: 12, xxs: 6},
  width: {lg: 2, md: 2, sm: 4, xs: 3, xxs: 3},
  height: {lg: 1.5, md: 1.5, sm: 1.5, xs: 1.5, xxs: 2}
};
