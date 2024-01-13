import {useSelector} from 'react-redux';
import styles from './profile.module.scss';
import {profileSelector} from '@/src/redux/features/inventory';
import Link from 'next/link';
import Image from 'next/image';
import {FC} from 'react';

type Props = {itemsAmount: number; totalPrice: string};

export const Profile: FC<Props> = ({itemsAmount, totalPrice}) => {
  const profile = useSelector(profileSelector);

  if (!profile) {
    return null;
  }
  const {avatarfull, personaname, profileurl} = profile;

  return (
    <div className={styles.profile}>
      <Link href={profileurl} target="_blank">
        <Image src={avatarfull} width={75} height={75} alt="Steam avatar"></Image>
      </Link>

      <span className={styles.profileName}>
        <p>{`${personaname}'s inventory:`}</p>
        <div>
          <p>Items: {itemsAmount}</p>
          <p>{totalPrice ? `Value ${totalPrice}$` : ''}</p>
        </div>
      </span>
    </div>
  );
};
