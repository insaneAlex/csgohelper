import {FC, ReactNode} from "react";
import styles from "./event-content.module.scss";

type Props = {children: ReactNode};

const EventContent: FC<Props> = ({children}) => {
  return <section className={styles.content}>{children}</section>;
};

export default EventContent;
