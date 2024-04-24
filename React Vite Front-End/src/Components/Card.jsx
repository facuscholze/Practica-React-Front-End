import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context';

const Card = ({ id, name, username }) => {
  const { state, dispatch } = useAppContext();

  const isFavorited = state.favorites.includes(id);

  const addFav = () => {
    console.log('Estado de favorites antes de agregar:', state.favorites);

    if (!isFavorited) {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: id });
    } else {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: id });
    }

    console.log('Estado de favorites después de agregar/eliminar:', state.favorites);
  };

  const buttonText = isFavorited ? 'Quitar de favoritos' : 'Agregar a favoritos';

  return (
    <div className="card">
      <img
        src="https://us.123rf.com/450wm/iimages/iimages2203/iimages220301244/185015067-dentista-sosteniendo-instrumentos-y-examinando-los-dientes-en-la-ilustraci%C3%B3n-de-fondo-verde.jpg?ver=6"
        alt="dentista"
      />
      <h2>Name: {name}</h2>
      <p>Username: {username}</p>
      <p>ID: {id}</p>
      <Link to={`/dentista/${id}`} className="link-button">
        Ver detalles
      </Link>
      <button onClick={() => addFav(id)} className="add-fav-button">
        {buttonText}
      </button>
    </div>
  );
};

export default Card;