import {profileSelector} from '@/src/redux/features/inventory';
import {AVATAR_SIZE, LARGE_AVATAR_SIZE} from './constants';
import {useSelector} from 'react-redux';
import {useMedia} from '@/src/hooks';
import Image from 'next/image';
import Link from 'next/link';
import {FC} from 'react';

import styles from './steam-profile-tile.module.scss';

type Props = {itemsAmount: number; totalPrice: string};

export const SteamProfileTile: FC<Props> = ({itemsAmount, totalPrice}) => {
  const profile = useSelector(profileSelector);
  const isDesktop = useMedia({large: true});
  if (!profile) {
    return null;
  }
  const avatarSize = isDesktop ? LARGE_AVATAR_SIZE : AVATAR_SIZE;
  const {avatarfull, personaname, profileurl} = profile;

  return (
    <section className={styles.profile}>
      <div className={styles.imageWrapper}>
        <Link href={profileurl} target="_blank">
          <Image src={avatarfull} width={avatarSize} height={avatarSize} quality={50} priority alt="avatar" />
        </Link>
      </div>

      <div className={styles.name}>
        <p>{personaname}&#39;s inventory:</p>
        <div>
          <p>Items: {itemsAmount}</p>
          {totalPrice && <p>Value: {totalPrice}$</p>}
        </div>
      </div>
    </section>
  );
};
