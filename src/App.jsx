import { useState } from "react";
import confetti from "canvas-confetti";

// establece los turnos
const TURNOS = {
  X: "X",
  O: "O",
};

// Establece lo que tiene cada cuadrado del tablero
const Square = ({ children, isSelected, actualizaTablero, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    actualizaTablero(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const CombinacionesGanadoras = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  // Rellena el tablero
  const [tablero, setTablero] = useState(Array(9).fill(null));
  // establece los turnos que tocan
  const [turno, setTurn] = useState(TURNOS.X);
  // null si no tiene ganador
  const [ganador, setGanador] = useState(null);

  // Comprobar ganador
  const comprobarGanador = (tableroAChequear) => {
    for (const combo of CombinacionesGanadoras) {
      const [a, b, c] = combo;

      if (
        // Si existe
        tableroAChequear[a] &&
        // Si son iguales
        tableroAChequear[a] == tableroAChequear[b] &&
        tableroAChequear[a] == tableroAChequear[c]
      ) {
        // Devuelve el ganador
        return tableroAChequear[a];
      }
    }
    return null;
  };

  const resetJuego = () => {
    setTablero(Array(9).fill(null));
    setTurn(TURNOS.X);
    setGanador(null);
  };

  const comprobarFinalJuego = (nuevoTablero) => {
    return nuevoTablero.every((square) => square !== null);
  };

  // Actualiza el tablero despuesd e cada click
  const actualizaTablero = (index) => {
    if (tablero[index] || ganador) return;

    // Se crea nuevo tablero para no modificar los props originales
    const nuevoTablero = [...tablero];
    nuevoTablero[index] = turno;
    setTablero(nuevoTablero);

    const nuevoTurno = turno == TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurn(nuevoTurno);

    // Comprobar el ganador
    const nuevoGanador = comprobarGanador(nuevoTablero);
    if (nuevoGanador) {
      confetti();
      setGanador(nuevoGanador);
    }
    // Comprobamos si tenemos empate
    else if (comprobarFinalJuego(nuevoTablero)) {
      setGanador(false);
    }
  };

  return (
    <>
      <main className="tablero">
        <h1>3 EN RAYA</h1>
        <button onClick={resetJuego}>Empieza de nuevo el juego</button>
        <section className="game">
          {tablero.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                actualizaTablero={actualizaTablero}
              >
                {square}
              </Square>
            );
          })}
        </section>
        <section className="turn">
          <Square isSelected={turno == TURNOS.X}>{TURNOS.X}</Square>
          <Square isSelected={turno == TURNOS.O}>{TURNOS.O}</Square>
        </section>

        {ganador !== null && (
          <section className="winner">
            <div className="text">
              <h2>{ganador == false ? "Empate" : "Ganó:"}</h2>
              <header className="win">
                {ganador && <Square>{ganador}</Square>}
              </header>
              <footer>
                <button onClick={resetJuego}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
