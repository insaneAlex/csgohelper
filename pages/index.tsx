import {EventList, EventType} from "@/components/events";
import {FC} from "react";
import {getFeaturedEvents} from "../api";

type Props = {featuredEvents?: EventType[]};

const Home: FC<Props> = ({featuredEvents}) => (
  <>
    <h1 style={{textAlign: "center", color: "$base-dark"}}>Stay Reactive!</h1>
    {featuredEvents && <EventList list={featuredEvents} />}
  </>
);

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {props: {featuredEvents}, revalidate: 1800};
};

export default Home;
