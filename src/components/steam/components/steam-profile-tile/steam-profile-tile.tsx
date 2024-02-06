import {profileSelector} from '@/src/redux/features/inventory';
import {AVATAR_SIZE} from './constants';
import {useSelector} from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import {FC} from 'react';

import styles from './steam-profile-tile.module.scss';

type Props = {itemsAmount: number; totalPrice: string};

export const SteamProfileTile: FC<Props> = ({itemsAmount, totalPrice}) => {
  const profile = useSelector(profileSelector);

  if (!profile) {
    return null;
  }

  const {avatarfull, personaname, profileurl} = profile;

  return (
    <section className={styles.profile}>
      <Link href={profileurl} target="_blank">
        <Image src={avatarfull} width={AVATAR_SIZE} height={AVATAR_SIZE} quality={50} priority alt="avatar" />
      </Link>

      <div className={styles.profileDescribe}>
        <p className={styles.ownerName}>{personaname}</p>
        <p>Items: {itemsAmount}</p>
        {totalPrice && <p>Value: {totalPrice}$</p>}
      </div>
    </section>
  );
};
