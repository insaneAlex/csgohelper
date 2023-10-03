import {TagsType, TagsTypeIndex} from '@/types';

type Props = {tags: TagsTypeIndex[]};

export const getItemRarityColor = ({tags}: Props): string | undefined =>
  tags?.find((el) => el?.[TagsType.CATEGORY] === 'Rarity')?.[TagsType.COLOR];
