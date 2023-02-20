import {FC} from "react";
import {EventList, EventType} from "@/components/events";
import {getFeaturedEvents} from "../api";
import Head from "next/head";

type Props = {featuredEvents?: EventType[]};

const Home: FC<Props> = ({featuredEvents}) => (
  <>
    <Head>
      <title>Networking Events</title>
      <meta
        name="description"
        content="Find a lot of events to start networking"
      />
    </Head>
    <h1 style={{textAlign: "center", color: "$base-dark"}}>Stay Reactive!</h1>
    {featuredEvents && <EventList list={featuredEvents} />}
  </>
);

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {props: {featuredEvents}, revalidate: 1800};
};

export default Home;
