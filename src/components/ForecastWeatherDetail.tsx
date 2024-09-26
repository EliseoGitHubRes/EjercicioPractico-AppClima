import React from "react";
import WeatherDetails, { WeatherDetailProps } from "./WeatherDetails";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import Container from "./Container";
// Importa el componente WeatherIcon que muestra un ícono del clima
import WeatherIcon from "./WeatherIcon";

// Define una interfaz para las propiedades del componente ForecastWeatherDetail
export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatherIcon: string;
  date: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

// Define una interfaz para las propiedades del componente ForecastWeatherDetail
export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps // Acepta propiedades según la interfaz definida
) {
  // Extrae las propiedades con valores predeterminados para pruebas
  const {
    weatherIcon = "02d",
    date = "19.09",
    temp,
    feels_like,
    temp_min,
    temp_max,
    description
  } = props;
  return (
    // Renderiza el contenedor principal
    <Container className="gap-4">
        {/* Sección izquierda: Muestra el ícono del clima y la fecha */}
      <section className=" flex gap-4 items-center px-4  ">
        <div className=" flex flex-col gap-1 items-center">
          <WeatherIcon iconName={weatherIcon} />
          <p>{date}</p>
          
        </div>
         {/* Sección central: Muestra la temperatura y la descripción */}
        <div className="flex flex-col px-4">
          <span className="text-5xl">{convertKelvinToCelsius(temp ?? 0)}°</span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span>Temperatura</span>
            <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
          </p>
          <p className="capitalize"> {description}</p>
        </div>
      </section>
       {/* Sección derecha: Muestra detalles adicionales del clima */}
      <section className=" overflow-x-auto flex justify-between gap-4 px-4  w-full pr-10">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}