export default function getCurrentTime(date: Date | string) {
  const dateTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  }).format(new Date(date));
  return dateTime;
}
