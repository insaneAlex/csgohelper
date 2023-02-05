import {FC} from "react";
import styles from "./event-summary.module.scss";

const EventSummary: FC<{title: string}> = (props) => {
  const {title} = props;

  return (
    <section className={styles.summary}>
      <h1>{title}</h1>
    </section>
  );
};

export default EventSummary;
