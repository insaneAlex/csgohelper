import {FC} from 'react';
import {Variants, motion} from 'framer-motion';
import modalStyles from 'styles/export.module.scss';

import styles from './content.module.scss';

type Props = {children: React.ReactNode; visible?: boolean};

export const Content: FC<Props> = ({children, visible}) => {
  const {zIndexModal, translateXShow: show, translateXHide: hide} = modalStyles;
  const getTransform = (value: string) => `translateX(${value}px)`;

  const itemVariants: Variants = {
    open: {opacity: 1, zIndex: zIndexModal, transform: getTransform(show), transition: {type: 'spring', bounce: false}},
    closed: {opacity: 0, transform: getTransform(hide), transition: {duration: 0.1}}
  };

  return (
    <motion.div
      initial={false}
      variants={itemVariants}
      className={styles.content}
      exit={{transform: getTransform(hide)}}
      animate={visible ? 'open' : 'closed'}
    >
      {children}
    </motion.div>
  );
};
