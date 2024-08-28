import React from 'react';

// Definimos los tipos de los props que espera el componente Square
export interface SquareProps {
  children: React.ReactNode; // Cualquier tipo de nodo React (texto, elementos, etc.)
  isSelected?: boolean;      // Prop opcional para saber si está seleccionado
  updateBoard: (index: number) => void; // Función para actualizar el tablero
  index: number; // Índice de la casilla en el tablero
}

// Combinaciones ganadoras en el juego
export const WINNER_COMBOS = [
  [0, 1, 2], // Primera fila
  [3, 4, 5], // Segunda fila
  [6, 7, 8], // Tercera fila
  [0, 3, 6], // Primera columna
  [1, 4, 7], // Segunda columna
  [2, 5, 8], // Tercera columna
  [0, 4, 8], // Diagonal principal
  [2, 4, 6]  // Diagonal secundaria
];

// Definimos los turnos posibles en el juego
export const TURNS = {
  X: '❌', // Turno del jugador X
  O: '⚪ '  // Turno del jugador O
};
// dame emojis donde la o es blanco y x es rojo

 