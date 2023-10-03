import {TagsType, TagsTypeIndex} from '@/types';

type Props = {tags: TagsTypeIndex[]; tag: string};

export const getTagValue = ({tag, tags}: Props): string | undefined =>
  tags.find((el) => el[TagsType.CATEGORY] === tag)?.[TagsType.LOCALIZED_TAG_NAME];
