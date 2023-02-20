import {DateType} from "@/api";
import {firebaseDB} from "@/api/constants";
import {EventList, EventType} from "@/components/events";
import {ResultsTitle} from "@/components/events/event-search";
import {Button, ErrorAlert, Loader} from "@/components/ui";
import {NextPage} from "next";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import useSWR from "swr";

type Props = {hasError: boolean; events: EventType[]; date: DateType};

const FilteredEventsPage: NextPage<Props> = () => {
  const router = useRouter();
  const filterData = router.query.date;

  const {data, error} = useSWR(firebaseDB, (url) =>
    fetch(url).then((res) => res.json())
  );

  const [loadedEvents, setLoadedEvents] = useState<EventType[]>();

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({id: key, ...data[key]});
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <Loader />;
  }

  const year = Number(filterData?.[0]);
  const month = Number(filterData?.[1]);

  if (isNaN(year) || isNaN(month) || month > 12 || month < 1 || error) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter parameters, try again to adjust date</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/">ALL EVENTS</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No any events found for such date</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">ALL EVENTS</Button>
        </div>
      </>
    );
  }

  const resultDate = new Date(year, month - 1);
  return (
    <>
      <ResultsTitle date={resultDate} />
      <EventList list={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;
