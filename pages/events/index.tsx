import {EventList, EventSearch} from "@/components/events";
import {getAllEvents} from "@/data/dummy-data";

const EventsPage = () => {
  const events = getAllEvents();

  return (
    <>
      <EventSearch />
      <EventList list={events} />
    </>
  );
};

export default EventsPage;
