import {EventType, getEventById} from "@/data/dummy-data";
import {useRouter} from "next/router";
import {FC} from "react";
import PageLayout from "@/components/layout/page-layout";
import EventItem from "@/components/events/event-item";
import Image from "next/image";

const EventPage: FC = () => {
  const {query} = useRouter();
  const eventId = query.eventId as string;
  const event = getEventById(eventId) as EventType;

  return (
    <PageLayout>
      <h2>{event?.title}</h2>
      <p>{event?.description}</p>
      <div className="">
        <Image href={`/${event.image}`} alt={event?.title as string} />
      </div>

      <address>{event?.location}</address>
      <time>{event?.date}</time>
    </PageLayout>
  );
};

export default EventPage;
