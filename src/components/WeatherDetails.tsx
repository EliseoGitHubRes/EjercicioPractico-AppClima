import { PiDropSimpleFill } from "react-icons/pi";
import { BsWind } from "react-icons/bs";


// Define la interfaz para las propiedades del componente WeatherDetails.
export interface WeatherDetailProps {
  humidity: string;
  windSpeed: string;
}

// Componente  que muestra detalles del clima.
export default function WeatherDetails(props: WeatherDetailProps) {
  // Desestructura las propiedades recibidas con valores predeterminados de prueba.
  const {
    humidity = "61%",
    windSpeed = "7 km/h",
  } = props;

  return (
    <>
      {/* Renderiza el detalle de la humedad */}
      <SingleWeatherDetail
        icon={<PiDropSimpleFill />}
        information="Humedad"
        value={humidity}
      />
       {/* Renderiza el detalle de la velocidad del viento */}
      <SingleWeatherDetail
        icon={<BsWind />}
        information="Velocidad del viento"
        value={windSpeed}
      />
    </>
  );
}

// Define la interfaz para las propiedades del componente SingleWeatherDetail.
export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

// Componente funcional que muestra un detalle específico del clima.
function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className="w-full flex flex-col justify-center gap-2 items-center text-xs font-semibold  text-black/80">
      <p className="whitespace-nowrap">{props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}