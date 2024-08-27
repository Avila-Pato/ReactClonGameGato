import React, { useState } from 'react';
import './App.css';

// Definimos los turnos posibles en el juego
const TURNS = {
  X: 'x', // Turno del jugador X
  O: 'o'  // Turno del jugador O
};

// Definimos los tipos de los props que espera el componente Square
interface SquareProps {
  children?: React.ReactNode; // Cualquier tipo de nodo React (texto, elementos, etc.), opcional
  isSelected?: boolean;       // Prop opcional para saber si la casilla está seleccionada
  updateBoard: (index: number) => void; // Función para actualizar el tablero
  index: number;        // Índice de la casilla en el tablero
}

// Componente Square tipado con TypeScript
const Square = ({ children, isSelected, updateBoard, index }: SquareProps) => {
  // Definición de la clase CSS para aplicar estilos dependiendo si la casilla está seleccionada
  const className = `square ${isSelected ? 'is-selected' : ''}`;

  // Manejo del clic en la casilla para actualizar el tablero
  const handleClick = () => {
    updateBoard(index); // Llamada a la función pasada como prop para actualizar el estado del tablero
  };

  // Renderizado del componente
  return (
    <div onClick={handleClick} className={className}>
      {children} {/* Renderiza el contenido de la casilla (puede ser 'X', 'O' o vacío) */}
    </div>
  );
}

// Combinaciones ganadoras en el juego
const WINNER_COMBOS = [
  [0, 1, 2], // Primera fila
  [3, 4, 5], // Segunda fila
  [6, 7, 8], // Tercera fila
  [0, 3, 6], // Primera columna
  [1, 4, 7], // Segunda columna
  [2, 5, 8], // Tercera columna
  [0, 4, 8], // Diagonal principal
  [2, 4, 6]  // Diagonal secundaria
];

const App: React.FC = () => {
  // Estado del tablero, inicialmente un array de 9 posiciones con valores nulos
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  
  // Estado del turno, inicia con el turno de 'X'
  const [turn, setTurn] = useState(TURNS.X);
  
  // Estado del ganador, inicialmente nulo (sin ganador)
  const [winner, setWinner] = useState<string | null>(null);

  // Función para verificar si hay un ganador en el tablero
  const checkWinner = (boardToCheck: Array<string | null>): string | null => {
    for (const combo of WINNER_COMBOS) { // Itera sobre cada combinación ganadora
      const [a, b, c] = combo; // Desestructura las posiciones de la combinación actual
      if (
        boardToCheck[a] && // Verifica que la posición 'a' no sea nula
        boardToCheck[a] === boardToCheck[b] && // Verifica que 'a' sea igual a 'b'
        boardToCheck[a] === boardToCheck[c]    // Verifica que 'a' sea igual a 'c'
      ) {
        return boardToCheck[a]; // Si hay coincidencia, retorna el ganador ('X' o 'O')
      }
    }
    return null; // Si no hay ganador, retorna null
  };

  // Función para actualizar el tablero y los cambios de estado al hacer clic en las casillas
  const updateBoard = (index: number) => {
    // Si la casilla ya tiene un valor o hay un ganador, no hace nada
    if (board[index] || winner) return;

    // Copia del estado actual del tablero para evitar mutaciones directas
    const newBoard = [...board];
    newBoard[index] = turn; // Asigna el turno actual ('X' o 'O') a la posición clickeada
    setBoard(newBoard); // Actualiza el estado del tablero con la nueva configuración

    // Alterna el turno entre 'X' y 'O'
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn); // Actualiza el estado del turno

    // Verifica si hay un nuevo ganador después del movimiento
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner); // Actualiza el estado del ganador si hay uno
    }
  };

  // Renderizado de la aplicación
  return (
    <main className='board'>
      <h1>Juego del Gato</h1>
      <section className='game'>
        {/* Mapea cada posición del tablero para renderizar un componente Square */}
        {board.map((value, index) => {
          return (
            <Square
              key={index}          // Clave única para cada casilla
              index={index}        // Índice de la casilla en el tablero
              updateBoard={updateBoard} // Función para actualizar el tablero
            >
              {value}              {/* Contenido de la casilla ('X', 'O', o null) */}
            </Square>
          )
        })}
      </section>
      <section className='turn'>
        {/* Renderiza los turnos actuales con estilos para indicar el turno en juego */}
        <Square isSelected={turn === TURNS.X} updateBoard={() => {}} index={-1}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O} updateBoard={() => {}} index={-1}>
          {TURNS.O}
        </Square>
      </section>
      {/* Muestra un mensaje de ganador si hay un ganador */}
      {winner && <p>{winner} ganó la partida!</p>}
    </main>
  );
}
export default App;
