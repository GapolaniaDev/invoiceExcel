export function getWeekdaysMondayToThursday(startDate, endDate) {
  const weekdays = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek >= 1 && dayOfWeek <= 4) {
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      let room = "";

      // Determinar el valor para el campo room según el día de la semana
      switch (dayOfWeek) {
        case 1: // Lunes
          room = "floor 1, 2, 3, 4";
          break;
        case 2: // Martes
          room = "floor 5, 6, 7, 8";
          break;
        case 3: // Miércoles
          room = "floor 9, 10, 11, 12";
          break;
        case 4: // Jueves
          room = "floor 13, 14, 15, 16";
          break;
        default:
          room = "Unknown";
      }

      const formattedDate = `${day}/${month}/${year}`;
      weekdays.push({
        date: formattedDate,
        room,
        description: "Kitchen cleaning",
        amount: 120,
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekdays;
}
