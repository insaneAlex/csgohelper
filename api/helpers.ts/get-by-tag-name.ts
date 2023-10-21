import {TagsType, TagsTypeIndex} from '@/types';

export const getByTagName = ({tags, tagName}: {tags: TagsTypeIndex[]; tagName: string}) =>
  (tags.find((el) => el.category === tagName) as unknown as TagsType) || ({} as TagsType);
