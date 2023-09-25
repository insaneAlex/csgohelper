import React, {FC} from "react";
import backIcon from "./back-svgrepo-com.svg";
import Image from "next/image";

export const BackIcon: FC = () => {
  return <Image priority src={backIcon} height={32} width={32} alt="Back" />;
};
