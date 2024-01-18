import React from 'react';

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Label</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {data.slice(0, 35).map((item, index) => (
          <tr key={index}>
            <td>{item.label}</td>
            <td>{item.value}</td>
            {/* Puedes agregar más columnas según sea necesario */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Cambié el nombre de "App" a "Carrusel"
const Carrusel = () => {
  const labelText = [
    // ... tu array de datos
  ];

  return (
    <div>
      <h1>Tu Carrusel React</h1>
      <Table data={labelText} />
    </div>
  );
};

export default Carrusel;
