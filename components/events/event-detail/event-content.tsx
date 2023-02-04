import {FC, ReactNode} from "react";
import classes from "./event-content.module.css";

const EventContent: FC<{children: ReactNode}> = ({children}) => {
  return <section className={classes.content}>{children}</section>;
};

export default EventContent;
