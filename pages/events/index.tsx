import {EventList, EventSearch} from "@/components/events";
import {DateType, getAllEvents} from "@/data/dummy-data";
import {useRouter} from "next/router";

const EventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  const findEvents = ({year, month}: DateType) => {};

  return (
    <>
      <EventSearch onSearch={findEvents} />
      <EventList list={events} />
    </>
  );
};

export default EventsPage;
