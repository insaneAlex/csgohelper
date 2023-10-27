import {MutableRefObject, useEffect, useRef} from 'react';
import {noop} from '../services';

type handlerType = (data: unknown) => void;

export const useEventListener = (
  eventName: string,
  handler: handlerType,
  target: Window | HTMLDivElement | null | HTMLLinkElement = typeof window !== 'undefined' ? window : null,
  options?: AddEventListenerOptions
) => {
  const savedHandler: MutableRefObject<handlerType | null> = useRef(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!savedHandler.current) {
      return noop;
    }

    const eventListener = (event: Event) => savedHandler.current && savedHandler?.current(event);
    target?.addEventListener(eventName, eventListener, options);

    return () => {
      target?.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, options]);
};
