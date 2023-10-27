import {FC} from 'react';
import styles from './overlay.module.scss';
import {useSpring, animated} from 'react-spring';
import {calculateZindex} from '../helpers';
import {OVERLAY_ANIMATION_DURATION} from '../constants';

export const Overlay: FC<{onClick: () => void; visible?: boolean}> = ({onClick, visible}) => {
  const overlayConfig = useSpring({
    zIndex: calculateZindex({visible}),
    backgroundColor: '#1d1f20',
    opacity: 0.25,
    from: {
      zIndex: calculateZindex({visible: visible === undefined ? visible : !visible}),
      backgroundColor: '#1d1f20',
      opacity: 1
    },
    config: {duration: OVERLAY_ANIMATION_DURATION}
  });

  return <animated.div style={overlayConfig} className={styles.overlay} onClick={onClick} />;
};
