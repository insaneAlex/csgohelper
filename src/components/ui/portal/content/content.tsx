import {calculateOpacity, calculateTransform, calculateZindex} from '../helpers';
import {PORTAL_CONTENT_ANIMATION_DURATION} from '../constants';
import {useSpring, animated} from 'react-spring';
import {useSwipeable} from 'react-swipeable';
import {FC} from 'react';

import styles from './content.module.scss';

type Props = {children: React.ReactNode; visible?: boolean; onClose: () => void};

export const Content: FC<Props> = ({children, visible, onClose}) => {
  const calculateSpringConfig = (visible?: boolean) => ({
    transform: calculateTransform({visible}),
    opacity: calculateOpacity({visible}),
    zIndex: calculateZindex({visible})
  });

  const mobileMenuConfig = useSpring({
    ...calculateSpringConfig(visible),
    from: {...calculateSpringConfig(visible === undefined ? visible : !visible)},
    config: {duration: PORTAL_CONTENT_ANIMATION_DURATION}
  });

  const handlers = useSwipeable({onSwipedLeft: onClose, swipeDuration: PORTAL_CONTENT_ANIMATION_DURATION});

  return (
    <animated.div {...handlers} style={mobileMenuConfig} className={styles.content}>
      {children}
    </animated.div>
  );
};
