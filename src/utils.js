export function getWeekdaysMondayToThursday(startDate, endDate) {
  const weekdays = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek >= 1 && dayOfWeek <= 4) {
      // De lunes a jueves
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      weekdays.push(`${day}/${month}/${year}`);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekdays;
}
