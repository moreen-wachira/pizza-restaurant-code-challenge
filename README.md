# Pizza Restaurant Management System

This project is a full-stack web application for managing pizza restaurants. It includes a Flask-based RESTful API for managing restaurants, pizzas, and their relationships, as well as a web application interface for users to interact with the system.

## Features



- View a list of restaurants
- View details of each restaurant, including its name and address
- Delete a restaurant
- Add a pizza to a restaurant
- View a list of all pizzas
## Endpoints

- `GET /restaurants`: Retrieve all restaurants.
- `GET /restaurants/<id>`: Retrieve a specific restaurant by ID.
- `DELETE /restaurants/<id>`: Delete a restaurant by ID.
- `GET /pizzas`: Retrieve all pizzas.
- `GET /restaurant_pizzas`: Retrieve all restaurant-pizza combinations.
- `POST /restaurant_pizzas`: Add a new restaurant-pizza combination.
