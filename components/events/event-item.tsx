import {EventType} from "@/data/dummy-data";
type Props = {event: EventType};

const EventItem = ({event}: Props) => {
  const {description} = event;

  return <li>{description}</li>;
};

export default EventItem;
