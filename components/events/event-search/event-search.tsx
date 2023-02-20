import {DateType} from "@/api";
import {Button} from "@/components/ui";

import {FC, FormEvent, useRef} from "react";
import styles from "./event-search.module.scss";

type Props = {onSearch: (date: DateType) => void};

export const EventSearch: FC<Props> = ({onSearch}) => {
  const yearRef = useRef<HTMLSelectElement>(null);
  const monthRef = useRef<HTMLSelectElement>(null);

  const handleFindEvents = (e: FormEvent) => {
    e.preventDefault();

    const year = Number(yearRef.current && yearRef.current.value);
    const month = Number(monthRef.current && monthRef.current.value);

    onSearch({month, year});
  };

  return (
    <>
      <form onSubmit={handleFindEvents} className={styles.form}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="year">Year</label>
            <select id="year" ref={yearRef} required>
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
              <option value={2023}>2023</option>
            </select>
          </div>
          <div className={styles.control}>
            <label htmlFor="month">Month</label>
            <select id="month" ref={monthRef} required>
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
          </div>
        </div>
        <Button onClick={handleFindEvents}>Find</Button>
      </form>
    </>
  );
};
