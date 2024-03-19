export type SteamProfileType = {avatarfull: string; personaname: string; profileurl: string};

export type InventoryResponseType = {
  shouldSaveSteamId: boolean;
  update_time?: string;
  status: number;
  inventory: string;
};

export type FeedbackType = {text: string; name: string};
