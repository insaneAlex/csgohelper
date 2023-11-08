import {TagsTypeIndex} from '@/src/services/steam-inventory';

export const getByTagName = ({tags, tagName}: {tags: TagsTypeIndex[]; tagName: string}): TagsTypeIndex =>
  tags.find((el) => el.category === tagName) || ({} as TagsTypeIndex);
