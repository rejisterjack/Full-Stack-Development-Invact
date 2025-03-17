from flask import Flask, jsonify, request

app = Flask(__name__)

products = [
    {"name": "Product A", "inStock": True},
    {"name": "Product B", "inStock": False},
    {"name": "Product C", "inStock": True},
    {"name": "Product D", "inStock": False}
]

users = [
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 30},
    {"name": "Charlie", "age": 17},
    {"name": "Dave", "age": 16}
]

productPrices = [
    {"name": "Product A", "price": 50},
    {"name": "Product B", "price": 150},
    {"name": "Product C", "price": 200},
    {"name": "Product D", "price": 90}
]

articles = [
    {"title": "Article A", "wordCount": 400},
    {"title": "Article B", "wordCount": 600},
    {"title": "Article C", "wordCount": 700},
    {"title": "Article D", "wordCount": 300}
]

movies = [
    {"title": "Movie A", "rating": 8.5},
    {"title": "Movie B", "rating": 7.0},
    {"title": "Movie C", "rating": 9.0},
    {"title": "Movie D", "rating": 6.5}
]

employees = [
    {"name": "Employee A", "experience": 3},
    {"name": "Employee B", "experience": 6},
    {"name": "Employee C", "experience": 10},
    {"name": "Employee D", "experience": 2}
]

@app.route('/in-stock-products', methods=['GET'])
def filterInStockProducts():
    in_stock = [product for product in products if product["inStock"]]
    return jsonify(in_stock)

@app.route('/adult-users', methods=['GET'])
def filterAdults():
    adults = [user for user in users if user["age"] >= 18]
    return jsonify(adults)

@app.route('/expensive-products', methods=['GET'])
def filterExpensiveProducts():
    price = request.args.get('price', type=int)
    expensive_products = [product for product in productPrices if product["price"] > price]
    return jsonify(expensive_products)

@app.route('/long-articles', methods=['GET'])
def filterLongArticles():
    min_words = request.args.get('minWords', type=int)
    long_articles = [article for article in articles if article["wordCount"] > min_words]
    return jsonify(long_articles)

@app.route('/high-rated-movies', methods=['GET'])
def filterHighRatedMovies():
    rating = request.args.get('rating', type=float)
    high_rated_movies = [movie for movie in movies if movie["rating"] > rating]
    return jsonify(high_rated_movies)

@app.route('/experienced-employees', methods=['GET'])
def filterExperiencedEmployees():
    years = request.args.get('years', type=int)
    experienced_employees = [employee for employee in employees if employee["experience"] > years]
    return jsonify(experienced_employees)

if __name__ == '__main__':
    app.run(debug=True)