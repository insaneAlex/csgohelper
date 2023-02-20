import {firebaseDB} from "./constants";
import {DateType} from "./types";

export const getEvents = async () => {
  const events = [];
  const response = await fetch(firebaseDB);
  const data = await response.json();
  for (const key in data) {
    events.push({id: key, ...data[key]});
  }

  return events;
};

export const getEventById = async (id: string) => {
  const events = await getEvents();
  return events.find((event) => event.id === id);
};

export const getFeaturedEvents = async () => {
  const events = await getEvents();
  return events.filter((event) => event.isFeatured);
};

export const getFilteredEvents = async ({year, month}: DateType) => {
  const events = await getEvents();

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return filteredEvents;
};
