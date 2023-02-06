import {EventType} from "@/data/dummy-data";
import {EventItem} from "../event-item/event-item";
import React, {FC} from "react";
import styles from "./event-list.module.scss";

type Props = {
  list: EventType[];
};

export const EventList: FC<Props> = ({list}) => {
  return (
    <ul className={styles.list}>
      {list.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
};
