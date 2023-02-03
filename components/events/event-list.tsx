import {EventType} from "@/data/dummy-data";
import EventItem from "./event-item";
import React from "react";
import styles from "./event-list.module.css";

type Props = {
  list: EventType[];
};

const EventList = ({list}: Props) => {
  return (
    <ul className={styles.list}>
      {list.map((event) => (
        <EventItem key={event.id} event={event}></EventItem>
      ))}
    </ul>
  );
};

export default EventList;
