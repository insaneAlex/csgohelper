import {FC} from 'react';
import classNames from 'classnames';

import styles from './page.module.scss';

type Props = {pagesCount: number; currentPage: number; onPageChange: (page: any) => void};

export const Page: FC<Props> = ({pagesCount, currentPage, onPageChange}) => {
  if (pagesCount === 1) {
    return null;
  }

  const pages = Array.from({length: pagesCount}, (_, i) => i + 1);

  return (
    <ul className={styles.list}>
      {pages.map((page) => (
        <li key={page} className={classNames(styles.pageItem, {})}>
          <button
            className={classNames(styles.pageLink, {[styles.pageLinkActive]: page === currentPage})}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
};
