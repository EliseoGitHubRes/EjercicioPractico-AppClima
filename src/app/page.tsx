'use client' // Indica que este componente se ejecuta del lado del cliente (en el navegador).
//importaciones
import Navbar from "@/components/NavBar";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { es } from 'date-fns/locale';
import { useQuery } from "react-query";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { translateWeatherDescription } from "@/utils/translateWeatherDescription";
import WeatherDetails from "@/components/WeatherDetails";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import "./globals.css";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import Container from "@/components/Container";
import WeatherIcon from "@/components/WeatherIcon";
import { loadingCityAtom, placeAtom } from "./atom";
import { useEffect } from "react";
import { useAtom } from "jotai";


// Definición de los tipos de datos para la respuesta de la API
type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export default function Home() {
  // Usa el átomo llamado placeAtom para obtener su valor actual
  // La variable 'place' contendrá ese valor
  const [place] = useAtom(placeAtom);
  // Usa el átomo llamado loadingCityAtom para obtener su valor actual
  // La variable 'loadingCity' contendrá ese valor
  const [loadingCity] = useAtom(loadingCityAtom);

  // Consulta de datos de clima usando react-query
  const { isLoading, data, refetch } = useQuery<WeatherData>('repoData', async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_CLIMA_KEY}&cnt=56`);
    return data;
  }
  );

  // Refrescar datos cuando cambie la ciudad
  useEffect(() => {
    refetch();
  }, [place, refetch])

  // Asigna el primer elemento de la lista 'list' dentro del objeto 'data' a la variable 'firstData'
  // Usa el operador de encadenamiento opcional (?.) para evitar errores si 'data' es null o undefined
  const firstData = data?.list[0];

  // Imprime el valor de 'data' en la consola para depuración
  //console.log("data", data);


  // Obtener fechas únicas de las previsiones
  const uniqueDates = [
    ...new Set(
      data?.list.map((entry) =>
        new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    )
  ].slice(0, 5); // Limitar a los primeros 5 días

  // Filtrar la primera entrada disponible para cada día
  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      return entryDate === date;
    });
  });

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">Cargando...</p>
    </div>
  )

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen ">
      <Navbar location={data?.city.name} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9  w-full  pb-10 pt-4 ">
        {/* DATOS DE HOY  */}
        {loadingCity ? (
          <WeatherSkeleton />
        ) : (
          <>
            <section className="space-y-4">
              <div className="space-y-2">
                <h2 className="flex gap-1 text-2xl  items-end">
                  <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE", { locale: es })
                    .charAt(0).toUpperCase() +
                    format(parseISO(firstData?.dt_txt ?? ""), "EEEE", { locale: es }).slice(1)}
                  </p>
                  <p className="text-lg">
                    ({format(parseISO(firstData?.dt_txt ?? ""), "dd-MM-yyyy")})
                  </p>
                </h2>
                <div className="flex gap-4">
                  {/* Contenedor para la temperatura  */}
                  <Container className=" bg-white shadow-lg px-6 py-4 gap-2 justify-center items-center w-full max-w-md mx-auto rounded-lg">
                    {/* Temperatura */}
                    <div className="w-full flex flex-col justify-center gap-2 items-center text-xs font-semibold  ">
                      <p className="whitespace-nowrap">
                        <span>Temperatura</span>
                      </p>
                      <p className="text-5xl whitespace-nowrap">
                        <span >
                          {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°C
                        </span>
                      </p>
                      <p className="whitespace-nowrap">
                        <span>
                          {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}
                          °↓{" "}
                        </span>
                        <span>
                          {" "}
                          {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
                          °↑
                        </span>
                      </p>
                    </div>
                    <div className="w-full flex flex-col justify-center gap-2 items-center text-xs font-semibold ">
                      <p className="whitespace-nowrap">
                        {translateWeatherDescription(firstData?.weather[0].description ?? "")}{" "}
                      </p>
                      <WeatherIcon
                        iconName={getDayOrNightIcon(
                          firstData?.weather[0].icon ?? "",
                          firstData?.dt_txt ?? ""
                        )}
                      />
                    </div>
                  {/* Contenedor para mostrar detalles del clima*/}
                  </Container>
                  <Container className=" bg-sky-400/80  px-6 gap-2 justify-center max-w-screen-md mx-auto">
                    <WeatherDetails
                      humidity={`${firstData?.main.humidity}%`}
                      windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)} />
                      {/* Muestra la humedad y la velocidad del viento, 
                        utilizando valores por defecto si no hay datos. */}
                  </Container>
                </div>
              </div>
            </section>

            {/* DATOS LOS SIGUENTES 5 DIAS */}
            <section className="flex w-full flex-col gap-4">
              <p className="text-2xl">Pronóstico (5 días)</p>
              {firstDataForEachDate.map((d, i) => (
                // Mapea cada elemento en el array firstDataForEachDate,
                <ForecastWeatherDetail
                  key={i} // Clave única para identificar cada componente en el array, utilizando el índice.
                  description={translateWeatherDescription(d?.weather[0].description ?? "")}
                  weatherIcon={d?.weather[0].icon ?? "01d"}
                  date={format(parseISO(d?.dt_txt ?? ""), "dd-MM")}
                  feels_like={d?.main.feels_like ?? 0}//muestra la temperatura que se siente del dia
                  temp={d?.main.temp ?? 0}//obtiente la temperatura actual
                  temp_max={d?.main.temp_max ?? 0}
                  temp_min={d?.main.temp_min ?? 0}
                  humidity={`${d?.main.humidity}% `}
                  windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
                />
              ))}
            </section>
          </>)}
      </main>
    </div>
  )
};

// Componente de Skeleton para cargar
function WeatherSkeleton() {
  return (
    <section className="space-y-8 ">
      {/*skeleton de datos de hoy  */}
      <div className="space-y-2 animate-pulse">
        {/* fecha skeleton */}
        <div className="flex gap-1 text-2xl items-end ">
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
        </div>

        {/* skeleton de datos de la temperatura */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* skeleton de pronostico de los siguientes 5 dias*/}
      <div className="flex flex-col gap-4 animate-pulse">
        <p className="text-2xl h-8 w-36 bg-gray-300 rounded"></p>

        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </section>
  );
}