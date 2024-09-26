import React from "react";
import Image from "next/image";// Importa el componente Image de Next.js para optimizar imágenes.
import { cn } from "@/utils/cn";

type Props = {}; // Define un tipo Props vacío, puede ser expandido en el futuro.

export default function WeatherIcon(
    props: React.HTMLProps<HTMLDivElement> & { iconName: string }// Importa el componente Image de Next.js para optimizar imágenes.
) {
    return (
        <div title={props.iconName} {...props} className={cn("relative h-20 w-20")}>
             {/* Crea un contenedor div que tiene como título el nombre del ícono y aplica clases para el tamaño y posicionamiento. */}
            <Image
                width={100}
                height={100}
                alt="weather-icon"
                className="absolute h-full w-full"// Clases para hacer que la imagen ocupe todo el contenedor.
                src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}// URL de la imagen del ícono del clima, usando el `iconName` pasado como propiedad.
            />
        </div>
    );
}