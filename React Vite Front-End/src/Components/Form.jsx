import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.nombre.length < 6 || !emailIsValid(formData.email)) {
      setErrorMessage('Por favor, verifique su información nuevamente');
      setSuccessMessage('');
    } else {
      setSuccessMessage(`Gracias ${formData.nombre}, te contactaremos lo antes posible vía email a la dirección ${formData.email}`);
      setErrorMessage('');
    }
  };

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="my-form">
        <label htmlFor="nombre">Nombre completo:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          minLength="6"
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input type="submit" value="Enviar" />
      </form>

      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default Form;