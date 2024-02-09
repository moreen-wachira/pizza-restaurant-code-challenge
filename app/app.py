#!/usr/bin/env python3

from flask import Flask, make_response,jsonify,request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS



from models import db, Restaurant, RestaurantPizza, Pizza

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../instance/app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

api=Api(app)

class Restaurants(Resource):
    def get(self):
        all_res=Restaurant.query.all()
        restaurants=[restaurant.to_dict() for restaurant in  all_res]
        return make_response(jsonify(restaurants),200)

api.add_resource(Restaurants, '/restaurants')

class RestaurantsByID(Resource):
    def get(self, id):
        restaurant = Restaurant.query.filter_by(id=id).first()
        resp = make_response(jsonify(restaurant.to_dict(include_pizzas=True)), 200) if restaurant else make_response(jsonify({"error": "Restaurant not found"}), 404)
        return resp

    def delete(self, id):
        restaurant = Restaurant.query.get(id)

        if restaurant:
            try:
                db.session.delete(restaurant)
                db.session.commit()
                return make_response('Deleted restaurant successfully', 200)
            except Exception as e:
                print(f"An error occurred: {e}")
                return make_response('Error deleting restaurant', 500)
        else:
            return make_response('Restaurant not found', 404)




api.add_resource(RestaurantsByID, '/restaurants/<int:id>')

class Pizzas(Resource):
    def get(self):
        pizzas=[pizza.to_dict() for pizza in  Pizza.query.all()]
        return make_response(jsonify(pizzas),200)
    
api.add_resource(Pizzas, '/pizzas')

class RestaurantPizzas(Resource):
    def get(self):
        restaurantPizza=[pizzarest.to_dict() for pizzarest in  RestaurantPizza.query.all()]
        return make_response(jsonify(restaurantPizza),200)

    def post(self):
        data = request.get_json()

        try:
            new_restaurant_pizza = RestaurantPizza(
                price=data['price'],
                pizza_id=data['pizza_id'],
                restaurant_id=data['restaurant_id']
            )
            db.session.add(new_restaurant_pizza)
            db.session.commit()

            pizza = Pizza.query.get(new_restaurant_pizza.pizza_id)
            if pizza:
                pizza_details = {
                    'id': pizza.id,
                    'name': pizza.name,
                    'ingredients': pizza.ingredients
                }
                return make_response(jsonify(pizza_details), 201)
            else:
                return make_response({"error": "Pizza not found"}, 404)
        except KeyError:
            return make_response({"error": "Missing required fields"}, 400)
        except Exception as e:
            db.session.rollback()
            print(f"An error occurred: {e}")
            return make_response({"error": "Error adding restaurant pizza"}, 500)
        
    
    def delete(self,id):
        restaurant_pizza = RestaurantPizza.query.filter_by(id=id).first()
        if not restaurant_pizza:
            resp={"error": "RestaurantPizza not found"}
            return resp
        db.session.delete(restaurant_pizza)
        db.session.commit()

        return make_response('deleted restaurant successfully', 200)
api.add_resource(RestaurantPizzas, '/restaurant_pizzas')



if __name__ == '__main__':
    app.run(port=5555)