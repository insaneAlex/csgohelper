import {DateType, getEvents} from "@/api";
import {EventList, EventSearch, EventType} from "@/components/events";
import Head from "next/head";

import {useRouter} from "next/router";
import {FC} from "react";

type Props = {events: EventType[]};

const EventsPage: FC<Props> = ({events}) => {
  const router = useRouter();

  const findEvents = ({year, month}: DateType) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>List of Events</title>
        <meta name="description" content="Find networking events here" />
      </Head>
      <EventSearch onSearch={findEvents} />
      <EventList list={events} />
    </>
  );
};

export const getStaticProps = async () => {
  const events = await getEvents();

  return {props: {events}, revalidate: 60};
};

export default EventsPage;
