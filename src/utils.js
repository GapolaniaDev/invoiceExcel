export function getKitchenCleaningDays(startDate, endDate) {
  const weekdays = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek >= 1 && dayOfWeek <= 4) {
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
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

      const formattedDate = `${year}/${month}/${day}`;
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

export function getNightCleaningDays(startDate, endDate) {
  const weekdays = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek >= 1 && dayOfWeek <= 4) {
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      let room = "";

      // Determinar el valor para el campo room según el día de la semana
      switch (dayOfWeek) {
        case 1: // Lunes
          room = "Night Clean (Y-Suite Waymouth)";
          break;
        case 2: // Martes
          room = "Night Clean (Y-Suite Waymouth)";
          break;
        case 3: // Miércoles
          room = "Night Clean (Y-Suite Waymouth)";
          break;
        case 4: // Jueves
          room = "Night Clean (Y-Suite Waymouth)";
          break;
        default:
          room = "Unknown";
      }

      const formattedDate = `${year}/${month}/${day}`;
      weekdays.push({
        date: formattedDate,
        room,
        description: "Night cleaning",
        amount: 90,
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekdays;
}

export function getInvoiceNumber(date) {
  // Obtener el primer lunes de enero
  const year = date.getFullYear();
  const firstMonday = new Date(year, 0, 1);

  while (firstMonday.getDay() !== 1) {
    firstMonday.setDate(firstMonday.getDate() + 1);
  }

  // Calcular la diferencia en días entre la fecha actual y el primer lunes
  const diffDays = Math.floor((date.getTime() - firstMonday.getTime()) / (1000 * 60 * 60 * 24));

  // Convertir los días en número de factura (cada 14 días aumenta en 1)
  return Math.floor(diffDays / 14) + 1;
}
