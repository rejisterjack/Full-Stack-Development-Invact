from flask import Flask, jsonify

app = Flask(__name__)

books = [
    {"title": "Moby Jonas", "author": "Herman Melville", "publication_year": 2023},
    {"title": "1984", "author": "George Orwell", "publication_year": 1984},
    {"title": "A Tale of Two Cities", "author": "Charles Jonas", "publication_year": 2000},
]

employees = [
    {"name": "John", "salary": 75000},
    {"name": "Doe", "salary": 30000},
    {"name": "Jane", "salary": 50000},
]

products = [
    {"name": "Product A", "price": 15},
    {"name": "Product B", "price": 25},
    {"name": "Product C", "price": 10},
]

events = [
    {"name": "Event A", "date": "2023-05-01"},
    {"name": "Event B", "date": "2023-01-01"},
    {"name": "Event C", "date": "2023-12-01"},
]

movies = [
    {"title": "Movie A", "rating": 9.0},
    {"title": "Movie C", "rating": 7.0},
    {"title": "Movie B", "rating": 8.5},
]

customers = [
    {"name": "Customer A", "lastPurchase": "2023-06-15"},
    {"name": "Customer B", "lastPurchase": "2023-11-01"},
    {"name": "Customer C", "lastPurchase": "2023-03-10"},
]

@app.route('/books/sort-by-year', methods=['GET'])
def sortBooksByYear():
    sorted_books = sorted(books, key=lambda x: x["publication_year"])
    return jsonify(sorted_books)

@app.route('/employees/sort-by-salary', methods=['GET'])
def sortEmployeesBySalary():
    sorted_employees = sorted(employees, key=lambda x: x["salary"], reverse=True)
    return jsonify(sorted_employees)

@app.route('/products/sort-by-price', methods=['GET'])
def sortProductsByPrice():
    sorted_products = sorted(products, key=lambda x: x["price"])
    return jsonify(sorted_products)

@app.route('/events/sort-by-date', methods=['GET'])
def sortEventsByDate():
    sorted_events = sorted(events, key=lambda x: x["date"])
    return jsonify(sorted_events)

@app.route('/movies/sort-by-rating', methods=['GET'])
def sortMoviesByRating():
    sorted_movies = sorted(movies, key=lambda x: x["rating"], reverse=True)
    return jsonify(sorted_movies)

@app.route('/customers/sort-by-last-purchase', methods=['GET'])
def sortCustomersByLastPurchase():
    sorted_customers = sorted(customers, key=lambda x: x["lastPurchase"], reverse=True)
    return jsonify(sorted_customers)

if __name__ == '__main__':
    app.run(debug=True)