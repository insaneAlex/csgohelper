import {useSelector} from 'react-redux';
import styles from './steam-profile-tile.module.scss';
import {profileSelector} from '@/src/redux/features/inventory';
import Link from 'next/link';
import Image from 'next/image';
import {FC} from 'react';

type Props = {itemsAmount: number; totalPrice: string};

export const SteamProfileTile: FC<Props> = ({itemsAmount, totalPrice}) => {
  const profile = useSelector(profileSelector);

  if (!profile) {
    return null;
  }
  const {avatarfull, personaname, profileurl} = profile;

  return (
    <section className={styles.profile}>
      <div className={styles.profileImage}>
        <Link href={profileurl} target="_blank">
          <Image src={avatarfull} width={75} height={75} alt="Steam avatar" />
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
