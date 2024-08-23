// Establece lo que tiene cada cuadrado del tablero
export const Square = ({ children, isSelected, actualizaTablero, index }) => {
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
