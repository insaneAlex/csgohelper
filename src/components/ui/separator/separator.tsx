import classNames from 'classnames';
import {FC} from 'react';

import styles from './separator.module.scss';

export const Separator: FC<{noMargin?: boolean; smallMargin?: boolean}> = ({noMargin = false, smallMargin = false}) => (
  <hr className={classNames(styles.separator, {[styles.smallMargin]: smallMargin, [styles.noMargin]: noMargin})} />
);
