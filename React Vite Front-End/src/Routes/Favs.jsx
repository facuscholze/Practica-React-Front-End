import React, { useEffect } from 'react';
import Card from "../Components/Card";
import { useAppContext } from "../context";

const Favs = () => {
  const { state, obtenerOdonotologosXid } = useAppContext();
  const dentistas = state.dataFavorites;

  useEffect(() => {
    obtenerOdonotologosXid();
  }, [state.Favorites]);

  if (!dentistas) {
    return <div>Loading...</div>;
  }
  console.log("Datos de favoritos:", dentistas);
  return (
    <div className="fav">
      <h1>Dentists Favs</h1>
      <div className={`cartas${state.theme}`}>
  {dentistas.length > 0 ? (
    dentistas.map((dentista) => (
      <Card
        key={dentista.id}
        name={dentista.name}
        username={dentista.username}
        id={dentista.id}
      />
    ))
  ) : (
    <h2>No hay odontólogos en la lista de favoritos</h2>
  )}
</div>
    </div>
  );
};

export default Favs;
