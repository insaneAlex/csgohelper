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
      <Link href={profileurl} target="_blank">
        <Image src={avatarfull} width={75} height={75} alt="Steam avatar" />
      </Link>

      <div className={styles.name}>
        <span>{personaname}&#39;s inventory:</span>
        <span>Items: {itemsAmount}</span>
        {totalPrice && <span>Value: {totalPrice}$</span>}
      </div>
    </section>
  );
};
