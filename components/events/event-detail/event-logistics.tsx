import LogisticsItem from "./logistics-item";
import classes from "./event-logistics.module.css";
import {FC} from "react";
import {EventType} from "@/data/dummy-data";
import Image from "next/image";
import DateIcon from "@/components/icons/date-icon";
import AddressIcon from "@/components/icons/address-icon";

type Props = {event: EventType};

const EventLogistics: FC<Props> = ({event}) => {
  const {date, location, image, title} = event;
  const addressText = location.replace(", ", "\n");
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={title} width={750} height={500} />
      </div>
      <ul className={classes.list}>
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

export default EventLogistics;
