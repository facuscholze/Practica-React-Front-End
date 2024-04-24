import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams(); 
  const [dentista, setDentista] = useState(null);

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener la información del dentista');
        }
        const data = await response.json();
        setDentista(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='detalles'>
      <h1>Detalle del Dentista ID: {id}</h1>
      {dentista ? (
        <div className='detalles'>
          <img src="https://us.123rf.com/450wm/iimages/iimages2203/iimages220301244/185015067-dentista-sosteniendo-instrumentos-y-examinando-los-dientes-en-la-ilustraci%C3%B3n-de-fondo-verde.jpg?ver=6" alt="dentista" />
          <h2>Name: {dentista.name}</h2>
          <p>Email: {dentista.email}</p>
          <p>Phone: {dentista.phone}</p>
          <a href=""><p>Website: {dentista.website}</p></a>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Detail;