import {getItemPriceEndpoint} from './constants';

export const getItemPrice = async ({hashName}: {hashName?: string}) => {
  const getPriceUrl = `${getItemPriceEndpoint}?hashName=${hashName}`;

  try {
    const response = await fetch(getPriceUrl);
    return response.json();
  } catch (e) {
    console.log('Something horrible happened');
  }
};
