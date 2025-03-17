from flask import Flask, request, jsonify

app = Flask(__name__)

movies = [
    {'id': 1, 'title': 'Inception', 'genre': 'Sci-Fi', 'available': True},
    {'id': 2, 'title': 'Titanic', 'genre': 'Romance', 'available': False},
    {'id': 3, 'title': 'The Dark Knight', 'genre': 'Action', 'available': True},
    {'id': 4, 'title': 'The Matrix', 'genre': 'Sci-Fi', 'available': True},
]

reviews = [
    {'id': 1, 'product_id': 1, 'rating': 4, 'content': 'Great laptop for work.'},
    {'id': 2, 'product_id': 2, 'rating': 5, 'content': 'Excellent sound quality.'},
    {'id': 3, 'product_id': 3, 'rating': 3, 'content': 'Works fine but feels cheap.'},
    {'id': 4, 'product_id': 4, 'rating': 4, 'content': 'Good value for money.'},
]

@app.route('/movies/update', methods=['GET'])
def updateMovieAvailability():
    movie_id = int(request.args.get('id'))
    available = request.args.get('available').lower() == 'true'
    for movie in movies:
        if movie['id'] == movie_id:
            movie['available'] = available
            return jsonify({'Updated Movie': movie})
    return jsonify({'error': 'Movie not found'}), 404

@app.route('/movies/delete', methods=['GET'])
def deleteMovieById():
    movie_id = int(request.args.get('id'))
    global movies
    movies = [movie for movie in movies if movie['id'] != movie_id]
    return jsonify({'Remaining Movies': movies})

@app.route('/reviews/update', methods=['GET'])
def updateReviewContent():
    review_id = int(request.args.get('id'))
    content = request.args.get('content')
    for review in reviews:
        if review['id'] == review_id:
            review['content'] = content
            return jsonify({'Updated Review': review})
    return jsonify({'error': 'Review not found'}), 404

@app.route('/reviews/delete', methods=['GET'])
def deleteReviewsByProductId():
    product_id = int(request.args.get('product_id'))
    global reviews
    reviews = [review for review in reviews if review['product_id'] != product_id]
    return jsonify({'Remaining Reviews': reviews})

@app.route('/movies/update-genre', methods=['GET'])
def updateMovieGenre():
    movie_id = int(request.args.get('id'))
    genre = request.args.get('genre')
    for movie in movies:
        if movie['id'] == movie_id:
            movie['genre'] = genre
            return jsonify({'Updated Movie': movie})
    return jsonify({'error': 'Movie not found'}), 404

@app.route('/movies/delete-by-genre', methods=['GET'])
def deleteMoviesByGenre():
    genre = request.args.get('genre')
    global movies
    movies = [movie for movie in movies if movie['genre'] != genre]
    return jsonify({'Remaining Movies': movies})

if __name__ == '__main__':
    app.run(debug=True)