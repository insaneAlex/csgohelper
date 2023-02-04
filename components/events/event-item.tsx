import {EventType} from "@/data/dummy-data";
import Image from "next/image";
import {FC} from "react";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";
import Button from "../ui/button";
import styles from "./event-item.module.css";

type Props = {event: EventType};

const EventItem: FC<Props> = ({event}) => {
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
      <Image src={`/${image}`} alt={title} width={750} height={500} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{address}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>
            <span>Explore event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
