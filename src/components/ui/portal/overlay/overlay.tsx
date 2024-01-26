import {FC} from 'react';
import {Variants, motion} from 'framer-motion';
import modalStyles from 'styles/export.module.scss';

import styles from './overlay.module.scss';

export const Overlay: FC<{onClick: () => void; visible?: boolean}> = ({onClick, visible}) => {
  const {zIndexModal, zIndexHidden} = modalStyles;
  const itemVariants: Variants = {
    open: {opacity: 0.8, zIndex: zIndexModal, transition: {type: 'spring', bounce: false}},
    closed: {zIndex: zIndexHidden, transition: {duration: 0.1}}
  };

  return (
    <motion.div
      animate={visible ? 'open' : 'closed'}
      variants={itemVariants}
      className={styles.overlay}
      onClick={onClick}
    />
  );
};
