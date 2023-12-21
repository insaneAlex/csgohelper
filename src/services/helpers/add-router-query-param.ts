import {NextRouter} from 'next/router';

type ParamsType = (a: {router: NextRouter; param: Record<string, boolean | string>; scroll?: boolean}) => void;

export const addRouterQueryParam: ParamsType = ({router, param, scroll = false}) =>
  router.push({query: {...router.query, ...param}}, '', {scroll});
