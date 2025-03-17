from flask import Flask, jsonify

app = Flask(__name__)

book = {
    'title': 'The God of Small Things',
    'author': 'Arundhati Roy',
    'publicationYear': 1997,
    'genre': 'Novel',
    'isAvailable': True,
    'stock': 5,
}

@app.route('/book', methods=['GET'])
def get_book():
    return jsonify(book)

@app.route('/book/fulltitle-author', methods=['GET'])
def get_full_title_and_author():
    def getFullTitleAndAuthor(book):
        return f"{book['title']} by {book['author']}"
    return jsonify({'fullTitleAndAuthor': getFullTitleAndAuthor(book)})

@app.route('/book/genre-availability', methods=['GET'])
def get_genre_and_availability():
    def getGenreAndAvailability(book):
        return {'genre': book['genre'], 'isAvailable': book['isAvailable']}
    return jsonify(getGenreAndAvailability(book))

@app.route('/book/age', methods=['GET'])
def get_book_age():
    def calculateBookAge(book):
        current_year = 2023
        return current_year - book['publicationYear']
    return jsonify({'age': calculateBookAge(book)})

@app.route('/book/summary', methods=['GET'])
def get_book_summary():
    def getBookSummary(book):
        return f"Title: {book['title']}, Author: {book['author']}, Genre: {book['genre']}, Published: {book['publicationYear']}"
    return jsonify({'summary': getBookSummary(book)})

@app.route('/book/stock-status', methods=['GET'])
def get_stock_status():
    def checkStockAndOrder(book):
        status = 'In Stock' if book['stock'] > 0 else 'Out of Stock'
        return {'status': status, 'stock': book['stock']}
    return jsonify(checkStockAndOrder(book))

if __name__ == '__main__':
    app.run(debug=True)