// Importamos la función `atom` de la librería Jotai para crear átomos de estado.
import { atom } from "jotai";


// Creamos un átomo que guarda la ciudad seleccionada por el usuario.
// Inicialmente, la ciudad está configurada como "San Salvador".
export const placeAtom = atom("San Salvador");


// Creamos otro átomo que indica si se está cargando la información de la ciudad.
// Este valor es `false` por defecto, lo que significa que no hay carga en curso.
export const loadingCityAtom = atom(false);