import {EventType} from "@/data/dummy-data";
import EventItem from "./event-item";
import React from "react";

type Props = {
  list: EventType[];
};

const EventList = ({list}: Props) => {
  return (
    <ul>
      {list.map((event) => (
        <React.Fragment key={event.id}>
          <EventItem event={event}></EventItem>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default EventList;
