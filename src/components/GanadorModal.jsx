import { Square } from "./Square";

export function GanadorModal({ganador, resetJuego}) {
  if (ganador == null) return null;

  const textoGanador = ganador == false ? "Empate:" : "Ganó:";

  return (
    <section className="winner">
      <div className="text">
        <h2>{textoGanador}</h2>

        <header className="win">{ganador && <Square>{ganador}</Square>}</header>

        <footer>
          <button onClick={resetJuego}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
