import {FC} from 'react';
import {Portal} from '../../../../ui';
import styles from './mobile-menu.module.scss';
import {useSwipeable} from 'react-swipeable';
import Link from 'next/link';
import {NavLinksType} from '../..';

type Props = {navLinks: NavLinksType; setIsVisible: (a: boolean) => void};

export const MobileMenu: FC<Props> = ({setIsVisible, navLinks}) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => setIsVisible(false),
    swipeDuration: 300
  });

  return (
    <div {...handlers} className={styles.menu}>
      <Portal.CloseButton onClick={() => setIsVisible(false)} />
      <ul className={styles.links}>
        {navLinks.map(({name, href, renderIcon}, i) => (
          <li key={i}>
            <Link href={href} onClick={() => setIsVisible(false)}>
              {renderIcon()}
              <span className={styles.linkText}>{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
