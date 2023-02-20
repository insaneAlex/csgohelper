import {DateType, getFilteredEvents} from "@/api";
import {EventList, EventType} from "@/components/events";
import {ResultsTitle} from "@/components/events/event-search";
import {Button, ErrorAlert} from "@/components/ui";

import {GetServerSideProps, NextPage} from "next";

type Props = {hasError: boolean; events: EventType[]; date: DateType};

const FilteredEventsPage: NextPage<Props> = ({hasError, events, date}) => {
  if (hasError) {
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

  const resultDate = new Date(date.year, date.month - 1);

  return (
    <>
      <ResultsTitle date={resultDate} />
      <EventList list={events} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const filterData = params?.date;
  const year = Number(filterData?.[0]);
  const month = Number(filterData?.[1]);

  if (isNaN(year) || isNaN(month) || month > 12 || month < 1) {
    return {props: {hasError: true}};
  }
  const events = await getFilteredEvents({year, month});

  return {props: {events, date: {month, year}}};
};

export default FilteredEventsPage;
