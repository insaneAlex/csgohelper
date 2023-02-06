import Link from "next/link";
import {FC, FormEvent} from "react";
import styles from "./button.module.scss";

type Props = {
  link?: string;
  children: React.ReactNode;
  onClick?: (e: FormEvent) => void;
};

export const Button: FC<Props> = (props) => {
  if (props.link) {
    return (
      <Link className={styles.btn} href={props.link}>
        {props.children}
      </Link>
    );
  }
  return (
    <button className={styles.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
