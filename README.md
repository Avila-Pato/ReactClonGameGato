# Juego del Gato (Tic-Tac-Toe) - React y TypeScript

Este proyecto es una implementación del clásico juego del Gato (Tic-Tac-Toe) utilizando React,TypeScript y un poco de Javascript. El objetivo del juego es lograr tres marcas consecutivas (en línea, columna o diagonal) antes que el oponente.

## Descripción del Proyecto

El juego del Gato es un juego de dos jugadores en el que uno juega con "X" y el otro con "O". Los jugadores se turnan para marcar sus símbolos en una cuadrícula de 3x3. El primero en conseguir tres de sus marcas en una línea (horizontal, vertical o diagonal) gana el juego.

## Funcionalidades Principales

- **Juego interactivo en un tablero de 3x3**: Los jugadores pueden hacer clic en las casillas para colocar sus marcas ("X" o "O").
- **Detección de ganador**: El juego detecta automáticamente cuando hay un ganador o un empate.
- **Reinicio del juego**: Los jugadores pueden reiniciar el juego en cualquier momento.
- **Animación de confetti**: Se muestra una animación de confetti cuando hay un ganador.

## Estructura del Código y Lógica del Juego

### 1. Estado del Tablero (`board`)

El estado del tablero se representa mediante un array de 9 elementos, que corresponde a las 9 casillas del juego. Cada elemento del array puede ser:

- `"X"`: Marca del primer jugador.
- `"O"`: Marca del segundo jugador.
- `null`: Casilla vacía.

```typescript
const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
