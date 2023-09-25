import {useSyncExternalStore} from "react";

const subscribe = (callback: any) => {
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("resize", callback);
  };
};

export const useWindowWidth = () => {
  return useSyncExternalStore(
    subscribe,
    () => window.screen.width,
    () => 0
  );
};
