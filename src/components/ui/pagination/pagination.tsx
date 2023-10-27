import {FC} from 'react';
import classNames from 'classnames';

import styles from './pagination.module.scss';

type Props = {pagesCount: number; currentPage: number; onPageChange: (page: number) => void};

export const Pagination: FC<Props> = ({pagesCount, currentPage, onPageChange}) => {
  if (pagesCount === 1) {
    return null;
  }

  const pages = Array.from({length: pagesCount}, (_, i) => i + 1);

  return (
    <ul className={styles.list}>
      {pages.map((page) => (
        <li key={page} className={styles.item}>
          <button
            className={classNames(styles.link, {[styles.linkActive]: page === currentPage})}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
};
