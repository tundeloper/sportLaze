function formatDateTime(input: string): string {
  const inputDate = new Date(input);
  const now = new Date();

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(inputDate, now)) {
    // Format time as hh:mm AM/PM
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  } else if (isSameDay(inputDate, yesterday)) {
    return "Yesterday";
  } else {
    // Format date as dd/mm/yyyy
    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const year = inputDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

export default formatDateTime;
