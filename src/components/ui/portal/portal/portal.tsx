import {FC, useCallback, useEffect, useState} from 'react';
import {PORTAL_ANIMATION_DURATION} from '../constants';
import {useSpring, animated} from 'react-spring';
import {useEventListener} from '@/src/hooks';
import {calculateZindex} from '../helpers';
import styles from './portal.module.scss';
import {createPortal} from 'react-dom';
import {noop} from '@/src/services';
import {KEYS} from './constants';

type Props = {visible?: boolean; children: React.ReactNode; onEscapePressed?: (e: KeyboardEvent) => void};

export const Portal: FC<Props> = ({children, visible, onEscapePressed = noop}) => {
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
    (event: KeyboardEvent) => {
      event.key === KEYS.escape && onEscapePressed(event);
    },
    [onEscapePressed]
  );
  useEventListener('keyup', !visible ? noop : onKeyupHandler);

  const portalConfig = useSpring({
    zIndex: calculateZindex({visible}),
    from: {zIndex: calculateZindex({visible: visible === undefined ? visible : !visible})},
    config: {duration: PORTAL_ANIMATION_DURATION}
  });

  const content = (
    <animated.div style={portalConfig} className={styles.portal} aria-hidden={!visible} role="dialog">
      {children}
    </animated.div>
  );
  if (portalNode) return createPortal(content, portalNode);
};
