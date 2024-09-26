//Obtiene el nombre del ícono de día o noche basado en la hora del día.
export function getDayOrNightIcon(
    iconName: string,
    dateTimeString: string
): string {
    const hours = new Date(dateTimeString).getHours(); // Obtener horas de la cadena de fecha y hora proporcionada

    const isDayTime = hours >= 6 && hours < 18; // Considere el horario diurno de 6 a. m. a 6 p. m.

    // Modificar el nombre del ícono según si es de día o de noche.
    // Reemplaza el último carácter del nombre del ícono con "d" para día o "n" para noche.
    return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");
}