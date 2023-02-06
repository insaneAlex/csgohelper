import {EventContent, EventLogistics, EventSummary} from "@/components/events";
import {EventType, getEventById} from "@/data/dummy-data";
import {useRouter} from "next/router";
import React, {FC} from "react";

const EventPage: FC = () => {
  const router = useRouter();
  const eventId = router.query.eventId as string;
  const event = getEventById(eventId) as EventType;

  if (!event) {
    return null;
  }
  const {title, description} = event;

  return (
    <>
      <EventSummary title={title} />
      <EventLogistics event={event} />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </>
  );
};

export default EventPage;
