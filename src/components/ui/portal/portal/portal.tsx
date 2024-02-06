import {FC, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {Variants, motion} from 'framer-motion';
import modalStyles from 'styles/export.module.scss';

import styles from './portal.module.scss';

type Props = {visible?: boolean; children: React.ReactNode};
export const Portal: FC<Props> = ({children, visible}) => {
  const [portalNode, setPortalNode] = useState<HTMLDivElement | null>(null);
  const {zIndexModal, zIndexHidden} = modalStyles;
  useEffect(() => {
    const node = document.createElement('div');
    document.body.appendChild(node);
    setPortalNode(node);

    return () => {
      document.body.removeChild(node);
    };
  }, []);

  const itemVariants: Variants = {
    open: {opacity: 1, zIndex: zIndexModal, transition: {type: 'spring', stiffness: 300, damping: 24}},
    closed: {opacity: 0, zIndex: zIndexHidden, transition: {duration: 0.1}}
  };

  const content = (
    <motion.div
      animate={visible ? 'open' : 'closed'}
      variants={itemVariants}
      className={styles.portal}
      aria-hidden={!visible}
      role="dialog"
      data-testid="portal"
    >
      {children}
    </motion.div>
  );

  // TODO: Add scroll lock etc
  if (portalNode) return createPortal(content, portalNode);
};
