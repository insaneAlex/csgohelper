import {TagsTypeIndex} from "@/types";

type Props = {tags: TagsTypeIndex[]; tag: string};

export const getTagValue = ({tag, tags}: Props): string | undefined =>
  tags.find((el) => el.category === tag)?.localized_tag_name;
