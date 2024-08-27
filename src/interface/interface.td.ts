import React from 'react';

// Definimos los tipos de los props que espera el componente Square
export interface SquareProps {
  children: React.ReactNode; // Cualquier tipo de nodo React (texto, elementos, etc.)
  isSelected?: boolean;      // Prop opcional para saber si está seleccionado
  updateBoard: (index: number) => void; // Función para actualizar el tablero
  index: number; // Índice de la casilla en el tablero
}

