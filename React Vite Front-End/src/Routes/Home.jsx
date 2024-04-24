import React, { useEffect } from 'react';
import Card from '../Components/Card';
import { useAppContext } from '../context';

const Home = () => {
  const { state, obtenerOdonotologos } = useAppContext();
  const dentistas = state.data;

  useEffect(() => {
    obtenerOdonotologos();
  }, [state.data]);

  
  if (!dentistas) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>Home</h1>
      <div className={`cartas${state.theme}`}>
        {dentistas.map((dentista) => (
          dentista ? (
            <Card
              key={dentista.id}
              name={dentista.name}
              username={dentista.username}
              id={dentista.id}
            />
          ) : "no hay odontologos que cargar"
        ))}
      </div>
    </main>
  );
}

export default Home;