import {FC} from 'react';
import {Variants, motion} from 'framer-motion';
import modalStyles from 'styles/export.module.scss';

import styles from './overlay.module.scss';

export const Overlay: FC<{onClick: () => void; visible?: boolean}> = ({onClick, visible}) => {
  const {zIndexNormal, zIndexHidden} = modalStyles;
  const itemVariants: Variants = {
    open: {zIndex: zIndexNormal, transition: {type: 'spring', bounce: false}},
    closed: {zIndex: zIndexHidden, transition: {duration: 0.1}}
  };

  return (
    <motion.div
      data-testid="overlay"
      animate={visible ? 'open' : 'closed'}
      variants={itemVariants}
      className={styles.overlay}
      onClick={onClick}
    />
  );
};
