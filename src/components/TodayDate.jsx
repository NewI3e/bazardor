"use client";

import { useSyncExternalStore } from "react";

const dateFormatter = new Intl.DateTimeFormat("bn-BD", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

const subscribe = () => () => {};
const getClientDate = () => dateFormatter.format(new Date());
const getServerDate = () => "";

export default function TodayDate() {
  const date = useSyncExternalStore(subscribe, getClientDate, getServerDate);

  return (
    <span suppressHydrationWarning className="inline-block min-h-4.5">
      {date}
    </span>
  );
}