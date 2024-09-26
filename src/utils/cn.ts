import clsx from "clsx"; // Importa la biblioteca `clsx` para manejar clases CSS condicionalmente.
import { twMerge } from "tailwind-merge"; // Importa la función `twMerge` para fusionar clases de Tailwind CSS.
import { ClassValue } from "clsx";// Importa el tipo `ClassValue` de `clsx` para tipado.

// Define una función llamada `cn` que acepta un número variable de argumentos de tipo `ClassValue`.
export function cn(...inputs: ClassValue[]){
    return twMerge(clsx(...inputs));// Combina las clases CSS utilizando `clsx` y luego las fusiona con `twMerge`
    
}