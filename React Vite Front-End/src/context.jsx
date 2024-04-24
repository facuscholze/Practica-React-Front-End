import React, { createContext, useReducer, useContext, useEffect } from 'react';

const initialState = {
  theme: 'claro',
  data: null,
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  dataFavorites: [],
};

const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'claro' ? 'oscuro' : 'claro' };
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SET_DATA_FAVORITES':
      return { ...state, dataFavorites: action.payload };
    case 'ADD_TO_FAVORITES':
      if (!state.favorites.includes(action.payload)) {
        const updatedFavoritesAdd = [...state.favorites, action.payload];
        localStorage.setItem('favorites', JSON.stringify(updatedFavoritesAdd));

        
        const updatedDataFavoritesAdd = [...state.dataFavorites, action.payload];
        return { ...state, favorites: updatedFavoritesAdd, dataFavorites: updatedDataFavoritesAdd };
      }
      return state;
    case 'REMOVE_FROM_FAVORITES':
      const updatedFavoritesRemove = state.favorites.filter((item) => item !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(updatedFavoritesRemove));

     
      const updatedDataFavoritesRemove = state.dataFavorites.filter((item) => item.id !== action.payload);
      return { ...state, favorites: updatedFavoritesRemove, dataFavorites: updatedDataFavoritesRemove };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites && storedFavorites.length > 0) {
      dispatch({ type: 'SET_DATA', payload: storedFavorites });
    }
  }, []);

  const obtenerOdonotologos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('No se pudo obtener la información de la API');
      }
      const data = await response.json();
      dispatch({ type: 'SET_DATA', payload: data });
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
    }
  };

  const obtenerOdonotologosXid = async () => {
    try {
      const favorites = state.favorites;
      const dataFavorites = [];

      for (const id of favorites) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener la información de la API');
        }
        const userData = await response.json();
        dataFavorites.push(userData);

        
        console.log('ID de dentista obtenido:', id);
        console.log('Datos de dentista obtenidos:', userData);
      }

     
      dispatch({ type: 'SET_DATA_FAVORITES', payload: dataFavorites });
    } catch (error) {
      console.error('Error al obtener datos de favoritos de la API:', error);
    }
  };

  

  return (
    <AppContext.Provider value={{ state, dispatch, obtenerOdonotologos, obtenerOdonotologosXid }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser utilizado dentro de AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };