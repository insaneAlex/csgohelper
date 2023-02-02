import {getFeaturedEvents} from "@/data/dummy-data";
import Link from "next/link";

export default function Home() {
  const featuredEvents = getFeaturedEvents();

  return (
    <>
      <div>
        <h1>Hello, it&apos;s homepage here!</h1>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>
          {/* <li>
            <Link href="/clients">Clients</Link>
          </li>
          <li>
            <Link href="about">About</Link>
          </li> */}
        </ul>
      </div>
    </>
  );
}
