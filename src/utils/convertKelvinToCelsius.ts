
// Convierte una temperatura de Kelvin a Celsius.
export function convertKelvinToCelsius(tempInKelvin: number): number {
    const tempInCelsius = tempInKelvin - 273.15;
    return Math.floor(tempInCelsius); // Elimina la parte decimal y mantiene la parte entera
  }