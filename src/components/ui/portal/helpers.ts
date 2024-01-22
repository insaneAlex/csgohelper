import styles from 'styles/export.module.scss';

type VisibleType = {visible: boolean | undefined};

export const calculateTransform = ({visible}: VisibleType) => (visible ? styles.translateXShow : styles.translateXHide);
export const calculateOpacity = ({visible}: VisibleType) => (visible ? styles.fullOpacity : styles.noOpacity);
export const calculateZindex = ({visible}: VisibleType) => (visible ? styles.zIndexModal : styles.zIndexHidden);
