import { useState } from 'react';
import './App.css';

const TURNS = {
  X: 'x',
  O: 'o'
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  // Renderizado de colores según qué jugador esté jugando
  const className = `square ${isSelected ? 'is-selected' : ''}`;

  // Manejo del click en el botón
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
}

// Función principal de la aplicación en su logica para ver si hay ganador en los posibles combinaciones que haga
  // Combinaciones ganadoras
  const WINNER_COMBOS= [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];


function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  // Crear posición del estado
  const [turn, setTurn] = useState(TURNS.X);
  // estado para ver ganador del juego
  const [winner, setWinner] = useState(null);// null es que no hay ganador, false es que hay un empate

  // Función para verificar si hay un ganador
  const checkWinner = (boardToCheck) => {
    // revisando combinaciones ganadoras 
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        // verifica si en la pocicion a existe alguna de las posiciones de las combinaciones ganadoras
        boardToCheck[a] && 
        // verifica si en la pocicion b existe alguna de las posiciones de las combinaciones ganadoras
        boardToCheck[a] === boardToCheck[b] &&   
        // verifica si en la pocicion c existe alguna de las posiciones de las combinaciones ganadoras
        boardToCheck[a] === boardToCheck[c]
      ){
        // si hay un ganador devuelve x o o según el jugador que haya ganado
        return boardToCheck[a];
      }
    }
    // si no hay ganador
    return null;
  }
  // Función para actualizar el tablero y los cambios de estado al hacer clic en las casillas
  const updateBoard = (index) => {
    if (board[index] || winner) return; // Si la casilla ya tiene un valor, no actualizamos

    //actualizando estado del tablero
    // se crea un copia del tablero, para no modificar el estado original con un spread operator
    // los datos siempre tienen que ser nuevos y no mutables
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // Verificar si hay un ganador 

    // agregamos el nuevoe estado del ganador
    const newWinner = checkWinner(newBoard);
    //  si hay un ganador se actualiza el estado del ganador
    if (newWinner) {
      
      // las actualizaciones de estado en react son todas asincronas
      // si se quiere actualizar el estado de un ganador se debe hacer de esta manera
      // se debe pasar una función que retorne el nuevo valor del estado en un callBack
      setWinner(() => {
        return newWinner;
      }); 
      // generar un alerta de ganador
       // alert(`${newWinner} ganó la partida`);
    }
  
  }
  return (
    <main className='board'>
      <h1>Juego del Gato</h1>
      <section className='game'> 
        {
          board.map((value, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {value}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
    </main>
  );
}

export default App;
