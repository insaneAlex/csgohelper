import {ImgSize} from "@/types";

export const getImgSizes = ({width}: {width: number}): ImgSize => {
  if (width < 768) {
    return {width: 64, height: 45};
  } else {
    return {width: 128, height: 99};
  }
};
