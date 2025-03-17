from flask import Flask, request, jsonify

app = Flask(__name__)

movies = [
    {'id': 1, 'title': 'Inception', 'genre': 'Sci-Fi', 'available': True},
    {'id': 2, 'title': 'Titanic', 'genre': 'Romance', 'available': False},
    {'id': 3, 'title': 'The Dark Knight', 'genre': 'Action', 'available': True},
    {'id': 4, 'title': 'The Matrix', 'genre': 'Sci-Fi', 'available': True},
]

students = [
    {'id': 1, 'name': 'Anna', 'major': 'Computer Science', 'gpa': 3.8},
    {'id': 2, 'name': 'Ben', 'major': 'Physics', 'gpa': 3.4},
    {'id': 3, 'name': 'Clara', 'major': 'Engineering', 'gpa': 3.9},
    {'id': 4, 'name': 'David', 'major': 'Computer Science', 'gpa': 2.8},
]

products = [
    {'id': 1, 'name': 'Laptop', 'category': 'Electronics', 'price': 1200},
    {'id': 2, 'name': 'Headphones', 'category': 'Electronics', 'price': 100},
    {'id': 3, 'name': 'Coffee Maker', 'category': 'Appliances', 'price': 150},
    {'id': 4, 'name': 'Smartphone', 'category': 'Electronics', 'price': 800},
]

reviews = [
    {'id': 1, 'product_id': 1, 'rating': 4, 'content': 'Great laptop for work.'},
    {'id': 2, 'product_id': 2, 'rating': 5, 'content': 'Excellent sound quality.'},
    {'id': 3, 'product_id': 3, 'rating': 3, 'content': 'Works fine but feels cheap.'},
    {'id': 4, 'product_id': 4, 'rating': 4, 'content': 'Good value for money.'},
]

@app.route('/movies/filter', methods=['GET'])
def filterMoviesByGenreAndAvailability():
    genre = request.args.get('genre')
    available = request.args.get('available', 'false').lower() == 'true'
    filtered_movies = [movie for movie in movies if movie['genre'] == genre and movie['available'] == available]
    return jsonify({'Movies': filtered_movies})

@app.route('/students/find', methods=['GET'])
def findStudentsByMajorOrGPARange():
    major = request.args.get('major')
    min_gpa = float(request.args.get('min_gpa', 0))
    max_gpa = float(request.args.get('max_gpa', 4.0))
    filtered_students = [
        student for student in students
        if student['major'] == major or (min_gpa <= student['gpa'] <= max_gpa)
    ]
    return jsonify({'Filtered Students': filtered_students})

@app.route('/products/delete', methods=['DELETE'])
def deleteProductsByCategoryOrPrice():
    category = request.args.get('category')
    price = float(request.args.get('price', 0))
    global products
    products = [
        product for product in products
        if product['category'] != category and product['price'] != price
    ]
    return jsonify({'Remaining Products': products})

@app.route('/reviews/search', methods=['GET'])
def searchReviewsByProductAndRating():
    product_id = int(request.args.get('product_id', 0))
    rating = int(request.args.get('rating', 0))
    filtered_reviews = [
        review for review in reviews
        if review['product_id'] == product_id and review['rating'] == rating
    ]
    return jsonify({'Reviews': filtered_reviews})

if __name__ == '__main__':
    app.run(debug=True)