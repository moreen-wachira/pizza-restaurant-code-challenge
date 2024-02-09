#!/usr/bin/env python3

from faker import Faker
import random
from app import app
from models import db, Restaurant,Pizza,RestaurantPizza

fake = Faker()

def make_restaurants():
    Restaurant.query.delete()

    restaurants_data = [
        {"name": fake.company(), "address": fake.address()} for _ in range(10)
    ]

    restaurants = [Restaurant(name=data["name"], address=data["address"]) for data in restaurants_data]

    db.session.add_all(restaurants)
    db.session.commit()

def make_pizzas():
    Pizza.query.delete()

    pizzas_data = [
        {"name": fake.word(), "ingredients": ", ".join(fake.words(nb=3, unique=True))} for _ in range(10)
    ]

    pizzas = [Pizza(name=data["name"], ingredients=data["ingredients"]) for data in pizzas_data]
    db.session.add_all(pizzas)
    db.session.commit()


def make_restaurantpizzas():
    RestaurantPizza.query.delete()

    restaurantpizzas = []
    for _ in range(30):
        price = random.randint(10, 30)
        restaurant_id = random.randint(1, 5)
        pizza_id = random.randint(1, 10)


        # Create and add the restaurant-pizza combination directly to the session
        db.session.add(RestaurantPizza(price=price, pizza_id=pizza_id, restaurant_id=restaurant_id))

    db.session.add_all(restaurantpizzas)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        try:
            make_restaurants()
            make_pizzas()
            make_restaurantpizzas()
        except Exception as e:
            print(f"An error occurred: {e}")