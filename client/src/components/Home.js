import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddPizzaToRestaurant from './AddPizzaToRestaurant'; 

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5555/restaurants/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
        } else {
          throw new Error('Failed to delete restaurant');
        }
      })
      .catch(error => console.error('Error deleting restaurant:', error));
  };

  return (
    <div>
      <h1>Restaurants</h1>
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant.id}>
            <p>{restaurant.name}</p>
            <Link to={`/restaurants/${restaurant.id}`}>
              <button>Details</button>
            </Link>
            <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/all-pizzas">
        <button style={{ fontSize: '1.5rem', padding: '10px 20px', marginTop: '20px' }}>All Pizzas</button>
      </Link>

      <AddPizzaToRestaurant />
    </div>
  );
};

export default Home;
