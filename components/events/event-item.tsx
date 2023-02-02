import {EventType} from "@/data/dummy-data";
import Link from "next/link";
import styles from "./event-item.module.css";

type Props = {event: EventType};

const EventItem = ({event}: Props) => {
  const {id, title, location, image, date} = event;

  const exploreLink = `/events/${id}`;
  const address = location.replace(", ", "\n");
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <li className={styles.item}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/${image}`} alt={title} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <time>{formattedDate}</time>
          </div>
          <div className={styles.address}>
            <address>{address}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Link href={exploreLink}>Explore event</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
