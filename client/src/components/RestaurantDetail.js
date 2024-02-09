import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5555/restaurants/${id}`)
      .then(response => response.json())
      .then(data => {
        setRestaurant(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching restaurant:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>Address: {restaurant.address}</p>
      <h2>Pizzas</h2>
      <ul>
        {restaurant.pizzas?.map(pizza => (
          <li key={pizza.id}>
            {pizza.name}: {pizza.ingredients}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantDetails;
