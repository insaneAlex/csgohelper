import {FC} from 'react';
import {Variants, motion} from 'framer-motion';
import modalStyles from 'styles/export.module.scss';

import styles from './content.module.scss';

type Props = {children: React.ReactNode; visible?: boolean};

export const Content: FC<Props> = ({children, visible}) => {
  const {zIndexModal, translateXShow, translateXHide} = modalStyles;
  const itemVariants: Variants = {
    open: {opacity: 1, zIndex: zIndexModal, transform: translateXShow, transition: {type: 'spring', bounce: false}},
    closed: {opacity: 0, transform: translateXHide, transition: {duration: 0.1}}
  };

  return (
    <motion.div
      initial={false}
      variants={itemVariants}
      className={styles.content}
      exit={{transform: translateXHide}}
      animate={visible ? 'open' : 'closed'}
    >
      {children}
    </motion.div>
  );
};
