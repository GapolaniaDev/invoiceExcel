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
          room = "floor 1, 2, 3, 4 (128 Waymouth St)";
          break;
        case 2: // Martes
          room = "floor 5, 6, 7, 8 (128 Waymouth St)";
          break;
        case 3: // Miércoles
          room = "floor 9, 10, 11, 12 (128 Waymouth St)";
          break;
        case 4: // Jueves
          room = "floor 13, 14, 15, 16 (128 Waymouth St)";
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

export function getWeekdaysMondayToFriday(startDate, endDate) {
  const weekdays = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      let room = "";

      // Determinar el valor para el campo room según el día de la semana
      switch (dayOfWeek) {
        case 1: // Lunes
          room = "Night Clean (Y-Suite city Gardens)";
          break;
        case 2: // Martes
          room = "Night Clean (Y-Suite city Gardens)";
          break;
        case 3: // Miércoles
          room = "Night Clean (Y-Suite city Gardens)";
          break;
        case 4: // Jueves
          room = "Night Clean (Y-Suite city Gardens)";
          break;
        case 5: // Viernes
          room = "Night Clean (Y-Suite city Gardens)";
          break;
        default:
          room = "Unknown";
      }

      const formattedDate = `${day}/${month}/${year}`;
      weekdays.push({
        date: formattedDate,
        room,
        description: "Night Clean",
        amount: 90,
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekdays;
}