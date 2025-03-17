from flask import Flask, request, jsonify

app = Flask(__name__)

customers = [
    {'id': 1, 'name': 'Alice', 'age': 30, 'city': 'New York', 'membership': 'Premium'},
    {'id': 2, 'name': 'Bob', 'age': 45, 'city': 'Los Angeles', 'membership': 'Basic'},
    {'id': 3, 'name': 'Eve', 'age': 28, 'city': 'San Francisco', 'membership': 'Gold'},
    {'id': 4, 'name': 'Frank', 'age': 60, 'city': 'Chicago', 'membership': 'Premium'}
]

cars = [
    {'id': 1, 'make': 'Toyota', 'model': 'Camry', 'year': 2020, 'price': 25000},
    {'id': 2, 'make': 'Honda', 'model': 'Civic', 'year': 2019, 'price': 22000},
    {'id': 3, 'make': 'Ford', 'model': 'Mustang', 'year': 2021, 'price': 35000},
    {'id': 4, 'make': 'Chevrolet', 'model': 'Malibu', 'year': 2020, 'price': 23000},
]

@app.route('/customers/filter', methods=['GET'])
def filterCustomersByAgeAndMembership():
    age = int(request.args.get('age', 0))
    membership = request.args.get('membership', '')
    filtered_customers = [
        customer for customer in customers
        if customer['age'] >= age and customer['membership'] == membership
    ]
    return jsonify({'Filtered Customers': filtered_customers})

@app.route('/cars/find', methods=['GET'])
def findCarsByPriceOrYear():
    price = int(request.args.get('price', 0))
    year = int(request.args.get('year', 0))
    filtered_cars = [
        car for car in cars
        if car['price'] == price or car['year'] == year
    ]
    return jsonify({'Filtered Cars': filtered_cars})

@app.route('/customers/filterByCity', methods=['GET'])
def filterCustomersByCityOrMembership():
    city = request.args.get('city', '')
    membership = request.args.get('membership', '')
    filtered_customers = [
        customer for customer in customers
        if customer['city'] == city or customer['membership'] == membership
    ]
    return jsonify({'Filtered Customers': filtered_customers})

@app.route('/cars/filter', methods=['GET'])
def filterCarsByMakeAndYear():
    make = request.args.get('make', '')
    year = int(request.args.get('year', 0))
    filtered_cars = [
        car for car in cars
        if car['make'] == make and car['year'] == year
    ]
    return jsonify({'Filtered Cars': filtered_cars})

@app.route('/customers/find', methods=['GET'])
def findCustomersByAgeOrCity():
    age = int(request.args.get('age', 0))
    city = request.args.get('city', '')
    filtered_customers = [
        customer for customer in customers
        if customer['age'] > age or customer['city'] == city
    ]
    return jsonify({'Filtered Customers': filtered_customers})


if(__name__ == "__main__"):
    app.run(debug=True)