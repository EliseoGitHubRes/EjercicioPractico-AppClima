import { cn } from "@/utils/cn";

import React from "react";

// Define y exporta un componente funcional llamado 'Container'
// Este componente acepta propiedades (props) que son del tipo HTMLDivElement
export default function Container(props: React.HTMLProps<HTMLDivElement>) {
   // Renderiza un elemento 'div'
  return (
    <div
      // Pasa todas las propiedades recibidas al 'div'
      {...props}
      // Establece la clase del 'div' usando la función 'cn' para combinar clases
      className={cn(
        "w-full bg-white border rounded-xl flex py-4 shadow-sm",
        props.className
      )}
    />
  );
}