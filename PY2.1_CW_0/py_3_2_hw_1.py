from flask import Flask, request, jsonify

app = Flask(__name__)

library = [
    {'bookId': 1, 'title': '1984', 'dueDate': '2023-12-01', 'isOverdue': True},
    {'bookId': 2, 'title': 'Brave New World', 'dueDate': '2024-01-10', 'isOverdue': False},
    {'bookId': 3, 'title': 'Fahrenheit 451', 'dueDate': '2023-11-15', 'isOverdue': True}
]

bookList = [
    {'bookId': 1, 'title': 'Python Programming', 'author': 'John Doe', 'completed': False, 'url': '<https://shorturl.to/python>', 'isFavorite': False},
    {'bookId': 2, 'title': 'Flask Framework Guide', 'author': 'Jane Smith', 'completed': True, 'url': '<https://shorturl.to/flask>', 'isFavorite': False},
    {'bookId': 3, 'title': 'Machine Learning Basics', 'author': 'Alan Turing', 'completed': False, 'url': '<https://shorturl.to/ml>', 'isFavorite': False}
]

products = [
    {'productId': 1, 'name': 'Laptop', 'inStock': True},
    {'productId': 2, 'name': 'Phone', 'inStock': True},
    {'productId': 3, 'name': 'Tablet', 'inStock': False}
]

@app.route('/library/remove-overdue', methods=['GET'])
def remove_overdue_books():
    global library
    library = [book for book in library if not book['isOverdue']]
    return jsonify(library)

@app.route('/book/favorite', methods=['GET'])
def mark_book_as_favorite():
    book_id = int(request.args.get('bookId'))
    is_favorite = request.args.get('isFavorite').lower() == 'true'
    for book in bookList:
        if book['bookId'] == book_id:
            book['isFavorite'] = is_favorite
    return jsonify({'bookList': bookList})

@app.route('/book/update', methods=['GET'])
def update_book_status_by_id():
    book_id = int(request.args.get('bookId'))
    completed = request.args.get('completed').lower() == 'true'
    for book in bookList:
        if book['bookId'] == book_id:
            book['completed'] = completed
    return jsonify({'bookList': bookList})

@app.route('/books/remove-completed', methods=['GET'])
def remove_completed_books():
    global bookList
    bookList = [book for book in bookList if not book['completed']]
    return jsonify({'bookList': bookList})

@app.route('/products/remove-out-of-stock', methods=['GET'])
def remove_out_of_stock_products():
    global products
    products = [product for product in products if product['inStock']]
    return jsonify({'products': products})

if __name__ == '__main__':
    app.run(debug=True)