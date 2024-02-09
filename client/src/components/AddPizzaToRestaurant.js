import React, { useState, useEffect } from 'react';

const AddPizzaToRestaurant = () => {
  const [formData, setFormData] = useState({
    price: '',
    pizza_id: '',
    restaurant_id: ''
  });
  const [pizzaOptions, setPizzaOptions] = useState([]);
  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5555/pizzas')
      .then(response => response.json())
      .then(data => setPizzaOptions(data))
      .catch(error => console.error('Error fetching pizzas:', error));

    fetch('http://localhost:5555/restaurants')
      .then(response => response.json())
      .then(data => setRestaurantOptions(data))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5555/restaurant_pizzas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          setSuccessMessage('Pizza added to restaurant successfully.');
          setErrorMessage('');
        } else {
          setSuccessMessage('');
          setErrorMessage('Failed to add pizza to restaurant.');
        }
      })
      .catch(error => {
        console.error('Error adding pizza to restaurant:', error);
        setErrorMessage('Failed to add pizza to restaurant.');
        setSuccessMessage('');
      });
  };

  return (
    <div>
      <h2>Add Pizza to Restaurant</h2>
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pizza_id">Select Pizza:</label>
          <select
            id="pizza_id"
            name="pizza_id"
            value={formData.pizza_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Pizza</option>
            {pizzaOptions.map(pizza => (
              <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="restaurant_id">Select Restaurant:</label>
          <select
            id="restaurant_id"
            name="restaurant_id"
            value={formData.restaurant_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Restaurant</option>
            {restaurantOptions.map(restaurant => (
              <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add Pizza to Restaurant</button>
      </form>
    </div>
  );
};

export default AddPizzaToRestaurant;
