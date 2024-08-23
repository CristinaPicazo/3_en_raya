import { CombinacionesGanadoras } from "../constants";

// Comprobar ganador
export const comprobarGanador = (tableroAChequear) => {
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


export  const comprobarFinalJuego = (nuevoTablero) => {
    return nuevoTablero.every((square) => square !== null);
  };