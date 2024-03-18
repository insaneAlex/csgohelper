export const getSteamid = (str: string) => {
  const steamId = str.match(
    // eslint-disable-next-line no-useless-escape
    /(?<STEAMID64>[^\/][0-9]{8,})|(?:https?:\/\/steamcommunity\.com\/profiles\/(?<PROFILE>[0-9]+))|(?:(?:https?:\/\/steamcommunity\.com\/id\/(?<CUSTOMPROFILE>[A-Za-z_0-9-]+))|(?<CUSTOMURL>[^\/]+))/
  )?.groups;

  const isSteamId64 = steamId?.STEAMID64 || steamId?.PROFILE;
  const customUrl = steamId?.CUSTOMPROFILE || steamId?.CUSTOMURL;

  if (isSteamId64) {
    return {isSteamId64: true, value: isSteamId64};
  }
  if (customUrl) {
    return {isSteamId64: false, value: customUrl};
  }
  return {isSteamId64: false, value: str};
};
