import {Button} from "@/components/ui";
import {FC} from "react";
import classes from "./results-title.module.scss";

export const ResultsTitle: FC<{readableDate: string}> = ({readableDate}) => (
  <section className={classes.title}>
    <h1>Events in {readableDate}</h1>
    <Button link="/events">Show all events</Button>
  </section>
);
