import {PORTAL_ANIMATION_DURATION} from '../constants';
import {useSpring, animated} from 'react-spring';
import {FC, useEffect, useState} from 'react';
import {calculateZindex} from '../helpers';
import styles from './portal.module.scss';
import {createPortal} from 'react-dom';

type Props = {visible?: boolean; children: React.ReactNode; onEscapePressed?: (e: KeyboardEvent) => void};

export const Portal: FC<Props> = ({children, visible}) => {
  const [portalNode, setPortalNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = document.createElement('div');
    document.body.appendChild(node);
    setPortalNode(node);

    return () => {
      document.body.removeChild(node);
    };
  }, []);

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
