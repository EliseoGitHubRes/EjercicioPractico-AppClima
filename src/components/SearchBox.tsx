import React from 'react';
import { FaSearch } from "react-icons/fa";
import { cn } from '@/utils/cn';

// Define el tipo de las propiedades que recibe el componente SearchBox
type Props = {
    className?:string;// Propiedad opcional para permitir clases CSS adicionales.
    value:string;//Valor del input
    onChange:React.ChangeEventHandler<HTMLInputElement> | undefined; // Función que maneja el cambio en el input.
    onSubmit:React.FormEventHandler<HTMLFormElement> | undefined;// Función que maneja el envío del formulario.
};

// Componente funcional que representa una caja de búsqueda.
export default function SearchBox(props: Props){
    return(
        // Formulario que maneja el envío y utiliza las propiedades recibidas.
        <form onSubmit={props.onSubmit} className={cn("flex relative items-center justify-center h-10",props.className  )}>
            <input type="text" //Campo en entrada para las cuidades.
            value={props.value}// Asigna la función para manejar cambios en el input.
            onChange={props.onChange}// Asigna la función para manejar cambios en el input.
            placeholder="Buscar ciudad"
            className="px-4 py-2  w-[230px] border border-gray-300 rounded-l-md focus:outline-none
            focus:border-blue-500 h-full "/>
            <button className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600  h-full"> 
            <FaSearch />
            </button>
        </form>
    )
}