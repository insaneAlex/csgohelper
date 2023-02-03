import Link from "next/link";
import {FC} from "react";

import styles from "./button.module.css";

type Props = {link: string; children: React.ReactNode};

const Button: FC<Props> = (props) => {
  return (
    <Link className={styles.btn} href={props.link}>
      {props.children}
    </Link>
  );
};

export default Button;
