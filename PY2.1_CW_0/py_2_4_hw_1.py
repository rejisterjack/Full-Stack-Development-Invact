from flask import Flask, jsonify

app = Flask(__name__)

heights = [160, 175, 180, 165, 170]
employees = [
    {'name': 'Rahul', 'employeeId': 101, 'salary': 50000},
    {'name': 'Sita', 'employeeId': 102, 'salary': 60000},
    {'name': 'Amit', 'employeeId': 103, 'salary': 45000}
]
books = [
    {'title': 'The God of Small Things', 'author': 'Arundhati Roy', 'pages': 340},
    {'title': 'The White Tiger', 'author': 'Aravind Adiga', 'pages': 321},
    {'title': 'The Palace of Illusions', 'author': 'Chitra Banerjee', 'pages': 360}
]

def sortHeightsAscending(heights):
    return sorted(heights)

def sortHeightsDescending(heights):
    return sorted(heights, reverse=True)

def sortEmployeesBySalaryDescending(employees):
    return sorted(employees, key=lambda x: x['salary'], reverse=True)

def sortBooksByPagesAscending(books):
    return sorted(books, key=lambda x: x['pages'])

@app.route('/heights/sort-ascending', methods=['GET'])
def heights_sort_ascending():
    sorted_heights = sortHeightsAscending(heights)
    return jsonify(sorted_heights)

@app.route('/heights/sort-descending', methods=['GET'])
def heights_sort_descending():
    sorted_heights = sortHeightsDescending(heights)
    return jsonify(sorted_heights)

@app.route('/employees/sort-by-salary-descending', methods=['GET'])
def employees_sort_by_salary_descending():
    sorted_employees = sortEmployeesBySalaryDescending(employees)
    return jsonify(sorted_employees)

@app.route('/books/sort-by-pages-ascending', methods=['GET'])
def books_sort_by_pages_ascending():
    sorted_books = sortBooksByPagesAscending(books)
    return jsonify(sorted_books)

if __name__ == '__main__':
    app.run(debug=True)