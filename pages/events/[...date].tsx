import {EventList} from "@/components/events";
import {ResultsTitle} from "@/components/events/event-search";
import {Button, ErrorAlert, Loader} from "@/components/ui";
import {getFilteredEvents} from "@/data/dummy-data";
import {useRouter} from "next/router";

const FilteredEventsPage = () => {
  const router = useRouter();

  const filterProps = router.query.date;

  if (!filterProps) {
    return (
      <div className="center">
        <Loader />
      </div>
    );
  }

  const filterYear = filterProps[0];
  const filterMonth = filterProps[1];

  const numYear = +filterYear;
  const numMonth = +filterMonth;

  if (isNaN(numYear) || isNaN(numMonth) || numMonth > 12 || numMonth < 1) {
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

  const events = getFilteredEvents({year: numYear, month: numMonth});

  if (!events || events.length === 0) {
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

  const date = new Date(numYear, numMonth - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventList list={events} />
    </>
  );
};

export default FilteredEventsPage;
