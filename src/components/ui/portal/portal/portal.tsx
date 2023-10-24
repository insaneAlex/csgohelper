import {FC, useCallback, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import styles from './portal.module.scss';
import classNames from 'classnames';
import {useEventListener} from '@/src/hooks/use-event-listener';
import {KEY_CODES} from './constants';

type Props = {
  children: React.ReactNode;
  centered?: boolean;
  shouldDisableScroll?: boolean;
  scrollableContentRef?: React.RefObject<HTMLElement>;
  isAbovePortals?: boolean;
  shouldFitContent?: boolean;
  isUnderPortals?: boolean;
  onEscapePressed?: (e: React.MouseEvent) => void;
  onTouchMoveWithDisabledScroll?: (node: Element) => boolean | void;
  isHidden?: boolean;
};

export const Portal: FC<Props> = ({
  children,
  centered,
  isAbovePortals,
  isUnderPortals,
  shouldFitContent,
  isHidden,
  onEscapePressed = () => {}
}) => {
  const [portalNode, setPortalNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = document.createElement('div');
    document.body.appendChild(node);
    setPortalNode(node);

    return () => {
      document.body.removeChild(node);
    };
  }, []);

  const onKeyupHandler = useCallback(
    (event: any) => {
      event.keyCode === KEY_CODES.escape && onEscapePressed(event);
    },
    [onEscapePressed]
  );

  const keyUpHandler = isHidden ? () => {} : onKeyupHandler;
  useEventListener('keyup', keyUpHandler);

  const content = (
    <div
      className={classNames(styles.portal, {
        [styles.centered]: centered,
        [styles.hidden]: isHidden,
        [styles.abovePortals]: isAbovePortals,
        [styles.underPortals]: isUnderPortals,
        [styles.fitContent]: shouldFitContent
      })}
      aria-hidden={isHidden}
      role="dialog"
    >
      {children}
    </div>
  );
  if (portalNode) return createPortal(content, portalNode);
};
