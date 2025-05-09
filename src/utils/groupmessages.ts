import { chats } from "./interface";

function formatDateLabel(dateStr: string): string {
  const inputDate = new Date(dateStr);
  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  if (isSameDay(inputDate, now)) return "Today";
  if (isSameDay(inputDate, yesterday)) return "Yesterday";

  const day = inputDate.getDate().toString().padStart(2, "0");
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const year = inputDate.getFullYear();
  return `${day}/${month}/${year}`;
}

function groupMessagesByDate(messages: chats[]) {
  return messages.reduce((acc: Record<string, typeof messages>, msg) => {
    const label = formatDateLabel(msg.created_at);
    acc[label] = acc[label] || [];
    acc[label].push(msg);
    return acc;
  }, {});
}

export default groupMessagesByDate;