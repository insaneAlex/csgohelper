import {EventList} from "@/components/events";
import {getFeaturedEvents} from "@/data/dummy-data";

const Home = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <>
      <h1 style={{textAlign: "center", color: "$base-dark"}}>
        Hello, it&apos;s homepage here!
      </h1>
      <EventList list={featuredEvents} />
    </>
  );
};

export default Home;
