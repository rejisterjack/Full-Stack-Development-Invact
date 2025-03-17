from flask import Flask, jsonify

app = Flask(__name__)

employees = [
    {'name': 'Rahul Gupta', 'department': 'HR', 'salary': 50000},
    {'name': 'Sneha Sharma', 'department': 'Finance', 'salary': 60000},
    {'name': 'Priya Singh', 'department': 'Marketing', 'salary': 55000},
    {'name': 'Amit Kumar', 'department': 'IT', 'salary': 65000}
]

bikes = [
    {'make': 'Hero', 'model': 'Splendor', 'mileage': 80},
    {'make': 'Bajaj', 'model': 'Pulsar', 'mileage': 60},
    {'make': 'TVS', 'model': 'Apache', 'mileage': 70}
]

songs = [
    {'title': 'Tum Hi Ho', 'genre': 'Romantic', 'rating': 4},
    {'title': 'Senorita', 'genre': 'Pop', 'rating': 5},
    {'title': 'Dil Chahta Hai', 'genre': 'Bollywood', 'rating': 3}
]

tasks = [
    {'taskId': 1, 'taskName': 'Prepare Presentation', 'status': 'pending'},
    {'taskId': 2, 'taskName': 'Attend Meeting', 'status': 'in-progress'},
    {'taskId': 3, 'taskName': 'Submit Report', 'status': 'completed'}
]

@app.route('/employees/department/<department>', methods=['GET'])
def filter_employees_by_department(department):
    filtered_employees = [emp for emp in employees if emp['department'] == department]
    return jsonify(filtered_employees)

@app.route('/bikes/mileage/<int:minMileage>', methods=['GET'])
def filter_bikes_by_mileage(minMileage):
    filtered_bikes = [bike for bike in bikes if bike['mileage'] > minMileage]
    return jsonify(filtered_bikes)

@app.route('/bikes/make/<make>', methods=['GET'])
def filter_bikes_by_make(make):
    filtered_bikes = [bike for bike in bikes if bike['make'] == make]
    return jsonify(filtered_bikes)

@app.route('/songs/rating/<int:minRating>', methods=['GET'])
def filter_songs_by_rating(minRating):
    filtered_songs = [song for song in songs if song['rating'] > minRating]
    return jsonify(filtered_songs)

@app.route('/songs/genre/<genre>', methods=['GET'])
def filter_songs_by_genre(genre):
    filtered_songs = [song for song in songs if song['genre'] == genre]
    return jsonify(filtered_songs)

@app.route('/tasks/status/<status>', methods=['GET'])
def filter_tasks_by_status(status):
    filtered_tasks = [task for task in tasks if task['status'] == status]
    return jsonify(filtered_tasks)

if __name__ == '__main__':
    app.run(debug=True)