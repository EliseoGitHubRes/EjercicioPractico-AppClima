//Convierte una velocidad de metros por segundo a kilómetros por hora.
export function convertWindSpeed(speedInMetersPerSecond: number): string {
    const speedInKilometersPerHour = speedInMetersPerSecond * 3.6; // Convertir de  m/s a km/h
    //Devuelve la velocidad en km/h, redondeada a un número entero y formateada como cadena.
    return `${speedInKilometersPerHour.toFixed(0)}km/h`;
}