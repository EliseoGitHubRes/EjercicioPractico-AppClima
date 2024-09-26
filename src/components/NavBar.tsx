'use client' // Indica que este componente se ejecuta del lado del cliente (en el navegador).
import React from "react";
import { FaSun } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import SearchBox from "./SearchBox";
import { useState } from "react";
import axios from "axios";// Importa axios para realizar solicitudes HTTP.
import { loadingCityAtom, placeAtom } from "@/app/atom";
import { useAtom } from "jotai";// Importa useAtom para utilizar el estado de Jotai.

type Props = {location?: string}; // Define un tipo de props que puede incluir una ubicación.
const API_KEY = process.env.NEXT_PUBLIC_CLIMA_KEY;// Obtiene la clave de API desde las variables de entorno.

export default function Navbar({ location}: Props) {// Define el componente Navbar.
    const [city, setCity] = useState("");// Estado para almacenar el nombre de la ciudad ingresada.
    const [error, setError] = useState("");// Estado para manejar errores en la búsqueda.

    const [suggestions, setSuggestions] = useState<string[]>([]);// Estado para almacenar las sugerencias de ciudades.
    const [showSuggestions, setShowSuggestions] = useState(false);// Estado para controlar la visibilidad de las sugerencias.

    const [place, setPlace] = useAtom(placeAtom);// Obtiene y actualiza el estado del lugar utilizando Jotai
    const [_, setLoadingCity] = useAtom(loadingCityAtom);// Obtiene y actualiza el estado de carga de la ciudad.

      // Función para manejar los cambios en el input de búsqueda.
    async function handleInputChang(value: string) {
        setCity(value);// Actualiza el estado de la ciudad con el valor ingresado.
        if (value.length >= 3) {// Si la longitud del valor es mayor o igual a 3 caracteres,
          try {
            // Realiza una solicitud a la API de OpenWeatherMap para obtener sugerencias de ciudades.
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
            );
            // Mapea los resultados para obtener solo los nombres de las ciudades.
            const suggestions = response.data.list.map((item: any) => item.name);
            setSuggestions(suggestions);// Actualiza el estado de sugerencias.
            setError("");
            setShowSuggestions(true);// Muestra las sugerencias.
          } catch (error) {// Si ocurre un error, limpia las sugerencias y oculta la lista.
            setSuggestions([]);
            setShowSuggestions(false);
          }
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }

    // Función para manejar el clic en una sugerencia.
    function handleSuggestionClick(value: string) {
        setCity(value);// Actualiza el estado de la ciudad con la sugerencia seleccionada.
        setShowSuggestions(false);//Oculta las sugerencias
    }

     // Función para manejar la búsqueda al enviar el formulario.
    function handleSubmiSearch(e:React.FormEvent<HTMLFormElement>) {
      setLoadingCity(true);// Indica que se está cargando la ciudad.
        e.preventDefault();// Previene la acción predeterminada del formulario
        if (suggestions.length == 0) {// Si no hay sugerencias,
            setError("Ubicación no encontrada");
            setLoadingCity(false); // Indica que ya no se está cargando.
        } else {
            setError("");// Limpia cualquier error anterior.
            setTimeout(() => { // Establece un retraso para simular la carga.
              setLoadingCity(false);
            setPlace(city);// Actualiza el estado del lugar con la ciudad ingresada.
            setShowSuggestions(false);
            }, 500);
        }
    }

     // Función para manejar la obtención de la ubicación actual.
    function handleCurrentLocation() {
      if (navigator.geolocation) {// Verifica si la geolocalización es soportada.
        navigator.geolocation.getCurrentPosition(async (postiion) => {
          const { latitude, longitude } = postiion.coords;// Obtiene la latitud y longitud.
          try {
            setLoadingCity(true);
             // Realiza una solicitud a la API de OpenWeatherMap con las coordenadas.
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
            );
            setTimeout(() => {
              setLoadingCity(false);
              setPlace(response.data.name);
            }, 500);
          } catch (error) {
            setLoadingCity(false);
          }
        });
      }
    }

        return (
            //bara de navegacion
            <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
                <div className="h-[80px]     w-full      flex   justify-between items-center     max-w-7xl px-3 mx-auto">
                    <p className="flex items-center justify-center gap-2">
                        <h2 className="text-gray-500 text-3xl">Clima</h2>
                        <FaSun className="text-3xl mt-1 text-yellow-400" />
                    </p>           
                    <section className="flex gap-2 items-center">
                      {/* seccion de busqueda automatica*/}
                        <FaLocationDot
                        title="Tu ubicación actual"
                        onClick={handleCurrentLocation}
                        className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
                        <FaMagnifyingGlassLocation className="text-3xl" />
                        <p className="text-slate-900/80 text-sm" >{location}</p>
                        <div className="relative">
                            {/* Contenedor relativo para posicionar la barra de búsqueda y sugerencias */}
                            <SearchBox
                                value={city}// Pasa el valor actual de la ciudad al componente SearchBox.
                                onSubmit={handleSubmiSearch}// Maneja la búsqueda al enviar el formulario.
                                onChange={(e) => handleInputChang(e.target.value)}// Maneja el cambio en el input..
                            />
                            {/* Muestra las sugerencias*/}
                            <SuggetionBox
                                {...{
                                    showSuggestions,
                                    suggestions,
                                    handleSuggestionClick,
                                    error
                                }}
                            />
                        </div>
                    </section>
                </div>
            </nav>
        );
    }

    // Componente que muestra las sugerencias de búsqueda.
    function SuggetionBox({
        showSuggestions,
        suggestions,
        handleSuggestionClick,
        error
      }: {
        showSuggestions: boolean;
        suggestions: string[];// Lista de sugerencias de ciudades.
        handleSuggestionClick: (item: string) => void;// Función para manejar el clic en una sugerencia.
        error: string;
      }) {
        return (
          <>
           {/* Muestra la lista de sugerencias si es visible y hay sugerencias o un error */}
            {((showSuggestions && suggestions.length > 1) || error) && (
              <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2">
                {error && suggestions.length < 1 && (
                  <li className="text-red-500 p-1 "> {error}</li>
                )}
                {suggestions.map((item, i) => (
                  <li
                    key={i}// Clave única para cada sugerencia
                    onClick={() => handleSuggestionClick(item)}
                    className="cursor-pointer p-1 rounded   hover:bg-gray-200"
                  >
                    {item}{/* Muestra el nombre de la ciudad */}
                  </li>
                ))}
              </ul>
            )}
          </>
        );
      }