export const guardarJuego = ({ tablero, turno }) => {
  window.localStorage.setItem("tablero", JSON.stringify(tablero));
  window.localStorage.setItem("turno", turno);
};

export const resetJuegoStorage = () => {
  window.localStorage.removeItem("tablero");
  window.localStorage.removeItem("turno");
};
