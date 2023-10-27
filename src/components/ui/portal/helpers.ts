import {NOT_VISIBLE_OPACITY, VISIBLE_OPACITY, Z_INDEX_HIDDEN, Z_INDEX_MODAL} from './constants';

type VisibleType = {visible: boolean | undefined};

export const calculateTransform = ({visible}: VisibleType) => (visible ? 'translateX(0px)' : 'translateX(-1000px)');
export const calculateOpacity = ({visible}: VisibleType) => (visible ? VISIBLE_OPACITY : NOT_VISIBLE_OPACITY);
export const calculateZindex = ({visible}: VisibleType) => (visible ? Z_INDEX_MODAL : Z_INDEX_HIDDEN);
