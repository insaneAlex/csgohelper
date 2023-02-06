import {LogisticsItem} from "./logistics-item";
import styles from "./event-logistics.module.scss";
import {FC} from "react";
import {EventType} from "@/data/dummy-data";
import Image from "next/image";
import {DateIcon, AddressIcon} from "@/components/icons";

type Props = {event: EventType};

export const EventLogistics: FC<Props> = ({event}) => {
  const {date, location, image, title} = event;
  const addressText = location.replace(", ", "\n");
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className={styles.logistics}>
      <div className={styles.image}>
        <Image src={`/${image}`} alt={title} width={750} height={500} />
      </div>
      <ul className={styles.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
};
