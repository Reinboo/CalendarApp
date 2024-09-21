import { FirebaseEventData } from "@/hooks/useEvents";

export function getHoursBetweenTimestamps(startISO: string, endISO: string) {
  const startDate = new Date(startISO);
  const endDate = new Date(endISO);

  const diffInMillis = endDate.getTime() - startDate.getTime();

  const diffInSeconds = Math.floor(diffInMillis / 1000);
  const seconds = diffInSeconds % 60;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const minutes = diffInMinutes % 60;
  const diffInHours = Math.floor(diffInMinutes / 60);
  const hours = diffInHours % 24;
  const days = Math.floor(diffInHours / 24);

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

export function getHoursRange(startDate: string, endDate: string) {
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const startTime = timeFormatter.format(new Date(startDate));
  const endTime = timeFormatter.format(new Date(endDate));

  return `${startTime} - ${endTime}`;
}

export function getTime(date: Date | string) {
  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formattedTime = timeFormatter.format(new Date(date));

  return formattedTime;
}
