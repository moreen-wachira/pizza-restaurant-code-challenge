import React, { useState, useEffect } from 'react';

const AllPizzas = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/pizzas')
      .then(response => response.json())
      .then(data => setPizzas(data))
      .catch(error => console.error('Error fetching pizzas:', error));
  }, []);

  return (
    <div>
      <h1>All Pizzas</h1>
      <ul>
        {pizzas.map(pizza => (
          <li key={pizza.id}>
            <p>{pizza.name}</p>
            <p>Ingredients: {pizza.ingredients}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPizzas;
