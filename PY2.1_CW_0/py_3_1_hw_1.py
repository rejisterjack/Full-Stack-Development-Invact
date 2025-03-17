from flask import Flask, request, jsonify

app = Flask(__name__)

users = [
    {'id': 1, 'username': 'ankit', 'fullName': 'Ankit Kumar'},
    {'id': 2, 'username': 'dhananjit', 'fullName': 'Dhananjit Singh'},
]

credit_cards = [
    {'number': '1234567890123456', 'holder': 'John Doe', 'expiry': '12/24'},
    {'number': '9876543210987654', 'holder': 'Jane Smith', 'expiry': '01/25'},
]

users_details = [
    {'email': 'johndoe@example.com', 'name': 'John Doe', 'age': 30},
    {'email': 'janesmith@example.com', 'name': 'Jane Smith', 'age': 25},
]

books = [
    {'isbn': '9783161484100', 'title': 'Example Book', 'author': 'John Author'},
    {'isbn': '9781234567897', 'title': 'Another Book', 'author': 'Jane Writer'},
]

people = [
    {'ssn': '123-45-6789', 'name': 'John Doe', 'birthDate': '1990-01-01'},
    {'ssn': '987-65-4321', 'name': 'Jane Smith', 'birthDate': '1985-05-05'},
]

@app.route('/username/find/<username>', methods=['GET'])
def find_username(username):
    for user in users:
        if user['username'] == username:
            return jsonify({'result': 'Username is not available'})
    return jsonify({'result': 'Username is available'})

@app.route('/credit-cards/find', methods=['GET'])
def find_credit_card():
    card_number = request.args.get('cardNumber')
    for card in credit_cards:
        if card['number'] == card_number:
            return jsonify({'creditCard': card})
    return jsonify({'error': 'Credit card not found'})

@app.route('/emails/find', methods=['GET'])
def find_user_by_email():
    email = request.args.get('email')
    for user in users_details:
        if user['email'] == email:
            return jsonify({'user': user})
    return jsonify({'error': 'User not found'})

@app.route('/books/find', methods=['GET'])
def find_book_by_isbn():
    isbn = request.args.get('isbn')
    for book in books:
        if book['isbn'] == isbn:
            return jsonify({'book': book})
    return jsonify({'error': 'Book not found'})

@app.route('/ssn/find', methods=['GET'])
def find_person_by_ssn():
    ssn = request.args.get('ssn')
    for person in people:
        if person['ssn'] == ssn:
            return jsonify({'person': person})
    return jsonify({'error': 'Person not found'})

if __name__ == '__main__':
    app.run(debug=True)