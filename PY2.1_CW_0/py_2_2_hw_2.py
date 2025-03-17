from flask import Flask, jsonify, request

app = Flask(__name__)

numbers = [-10, -5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

def is_prime(num):
    if num < 2:
        return False
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False
    return True

def filterPrimeNumbers(numbers):
    return [num for num in numbers if is_prime(num)]

@app.route('/prime-numbers', methods=['GET'])
def get_prime_numbers():
    return jsonify(filterPrimeNumbers(numbers))

def filterPositiveNumbers(numbers):
    return [num for num in numbers if num > 0]

@app.route('/positive-numbers', methods=['GET'])
def get_positive_numbers():
    return jsonify(filterPositiveNumbers(numbers))

def filterNegativeNumbers(numbers):
    return [num for num in numbers if num < 0]

@app.route('/negative-numbers', methods=['GET'])
def get_negative_numbers():
    return jsonify(filterNegativeNumbers(numbers))

def filterOddNumbers(numbers):
    return [num for num in numbers if num % 2 != 0]

@app.route('/odd-numbers', methods=['GET'])
def get_odd_numbers():
    return jsonify(filterOddNumbers(numbers))

def filterNumbersGreaterThan(numbers, value):
    return [num for num in numbers if num > value]

@app.route('/numbers-greater-than', methods=['GET'])
def get_numbers_greater_than():
    value = request.args.get('value', type=int)
    if value is None:
        return jsonify({"error": "Query parameter 'value' is required"}), 400
    return jsonify(filterNumbersGreaterThan(numbers, value))

def filterNumbersLessThan(numbers, value):
    return [num for num in numbers if num < value]

@app.route('/numbers-less-than', methods=['GET'])
def get_numbers_less_than():
    value = request.args.get('value', type=int)
    if value is None:
        return jsonify({"error": "Query parameter 'value' is required"}), 400
    return jsonify(filterNumbersLessThan(numbers, value))

if __name__ == '__main__':
    app.run(debug=True)