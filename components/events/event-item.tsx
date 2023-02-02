import {EventType} from "@/data/dummy-data";
import Image from "next/image";
import Link from "next/link";

type Props = {event: EventType};

const EventItem = ({event}: Props) => {
  const {id, title, location, image, date} = event;

  const exploreLink = `/events/${id}`;
  const address = location.replace(", ", "\n");
  const formattedDate = new Date(date).toLocaleDateString("uk-ua", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <li>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/${image}`} alt={title} />
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{formattedDate}</time>
          </div>
          <div>
            <address>{address}</address>
          </div>
        </div>
        <div>
          <Link href={exploreLink}>Explore event</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
