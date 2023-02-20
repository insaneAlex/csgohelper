import React from "react";
import {getEventById, getFeaturedEvents} from "@/api";
import {
  EventContent,
  EventLogistics,
  EventSummary,
  EventType,
} from "@/components/events";
import {ErrorAlert, Button} from "@/components/ui";

import {GetStaticProps, GetStaticPaths, NextPage} from "next";

type Props = {event: EventType};

const EventPage: NextPage<Props> = ({event}) => {
  if (!event) {
    return (
      <>
        <ErrorAlert>
          <p>No event with such ID</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/">ALL EVENTS</Button>
        </div>
      </>
    );
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

export const getStaticProps: GetStaticProps = async ({params}) => {
  const eventId = params?.eventId;
  const event = await getEventById(eventId as string);

  return {props: {event}, revalidate: 30};
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map(({id}) => ({params: {eventId: id}}));

  return {paths, fallback: true};
};

export default EventPage;
