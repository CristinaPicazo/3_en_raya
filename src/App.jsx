import { useState } from "react";
import confetti from "canvas-confetti";

// Importar componentes
import { Square } from "./components/Square.jsx";
import { TURNOS } from "./constants.js";
import { comprobarGanador, comprobarFinalJuego } from "./logic/board.js";
import { GanadorModal } from "./components/GanadorModal.jsx";
import { guardarJuego, resetJuegoStorage } from "./logic/storeage/index.js";

function App() {
  // Rellena el tablero
  const [tablero, setTablero] = useState(() => {
    const tableroDesdeStoreage = window.localStorage.getItem("tablero");
    if (tableroDesdeStoreage) return JSON.parse(tableroDesdeStoreage);
    return Array(9).fill(null);
  });

  // establece los turnos que tocan
  const [turno, setTurno] = useState(() => {
    const turnoDesdeStoreage = window.localStorage.getItem("turno");
    return turnoDesdeStoreage ?? TURNOS.X;
  });

  // null si no tiene ganador
  const [ganador, setGanador] = useState(null);

  const resetJuego = () => {
    setTablero(Array(9).fill(null));
    setTurno(TURNOS.X);
    setGanador(null);

    resetJuegoStorage();
  };

  // Actualiza el tablero despuesd e cada click
  const actualizaTablero = (index) => {
    if (tablero[index] || ganador) return;

    // Se crea nuevo tablero para no modificar los props originales
    const nuevoTablero = [...tablero];
    nuevoTablero[index] = turno;
    setTablero(nuevoTablero);

    const nuevoTurno = turno == TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurno(nuevoTurno);

    // Guardar partida
    guardarJuego({ tablero: nuevoTablero, turno: nuevoTurno });

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

        <GanadorModal resetJuego={resetJuego} ganador={ganador} />
      </main>
    </>
  );
}

export default App;
