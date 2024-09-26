// Mapeo de descripciones del clima a español
const weatherTranslations: { [key: string]: string } = {
    "overcast clouds":"Nubes cubiertas",
    "clear sky": "Cielo Despejado",
    "few clouds": "Pocas Nubes",
    "scattered clouds": "Nubes Dispersas",
    "broken clouds": "Nubes Rotas",
    "shower rain": "Lluvia Ligera",
    "rain": "Lluvia",
    "thunderstorm": "Tormenta",
    "snow": "Nieve",
    "mist": "Neblina",
    "smoke": "Humo",
    "haze": "Neblina",
    "sand": "Arena",
    "dust": "Polvo",
    "fog": "Niebla",
    "sandstorm": "Tormenta De Arena",
    "ash": "Ceniza",
    "squall": "Ráfaga",
    "tornado": "Tornado",
    "drizzle": "Llovizna",
    "light rain": "Lluvia Ligera",
    "moderate rain": "Lluvia Moderada",
    "heavy intensity rain": "Lluvia Intensa",
    "very heavy rain": "Lluvia Muy Intensa",
    "extreme rain": "Lluvia Extrema",
    "freezing rain": "Lluvia Helada",
    "light snow": "Nieve Ligera",
    "moderate snow": "Nieve Moderada",
    "heavy snow": "Nieve Intensa",
    "sleet": "Aguanieve",
    "light rain and snow": "Lluvia Y Nieve Ligera",
    "rain and snow": "Lluvia Y Nieve",
    "light shower rain": "Lluvia Ligera De Chubasco",
    "heavy shower rain": "Lluvia Intensa De Chubasco",
    "light thunderstorm": "Tormenta Ligera",
    "heavy thunderstorm": "Tormenta Intensa",
    "ragged shower rain": "Chubasco Irregular",

};

// Función que traduce la descripción o devuelve el original si no está en el mapeo
//Si la descripción no está en el mapeo, devuelve la descripción original.
export function translateWeatherDescription(description: string): string {
    return weatherTranslations[description] || description;
}