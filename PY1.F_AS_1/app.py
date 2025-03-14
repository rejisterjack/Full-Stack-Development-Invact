from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/title-length', methods=['GET'])
def title_length():
    title = request.args.get('title', '')
    return f'Assignment title length: {len(title)}'

@app.route('/extract-initials', methods=['GET'])
def extract_initials():
    name = request.args.get('name', '')
    initials = ''.join(word[0].upper() for word in name.split())
    return f'Student initials: {initials}'

@app.route('/create-slug', methods=['GET'])
def create_slug():
    title = request.args.get('title', '')
    slug = title.replace(' ', '-').lower()
    return f'Assignment slug: {slug}'

@app.route('/calculate-total-marks', methods=['GET'])
def calculate_total_marks():
    marks1 = int(request.args.get('marks1', 0))
    marks2 = int(request.args.get('marks2', 0))
    marks3 = int(request.args.get('marks3', 0))
    total = marks1 + marks2 + marks3
    return f'Total marks: {total}'

@app.route('/calculate-average-marks', methods=['GET'])
def calculate_average_marks():
    marks1 = int(request.args.get('marks1', 0))
    marks2 = int(request.args.get('marks2', 0))
    marks3 = int(request.args.get('marks3', 0))
    average = (marks1 + marks2 + marks3) / 3
    return f'Average marks: {average:.2f}'

@app.route('/calculate-grade', methods=['GET'])
def calculate_grade():
    totalMarks = int(request.args.get('totalMarks', 0))
    if totalMarks >= 90:
        grade = 'A'
    elif totalMarks >= 80:
        grade = 'B'
    elif totalMarks >= 70:
        grade = 'C'
    elif totalMarks >= 35:
        grade = 'D'
    else:
        grade = 'F'
    return f'Grade: {grade}'

@app.route('/check-pass-fail', methods=['GET'])
def check_pass_fail():
    marks = int(request.args.get('marks', 0))
    return 'Pass' if marks >= 40 else 'Fail'

@app.route('/check-scholarship', methods=['GET'])
def check_scholarship():
    marks = int(request.args.get('marks', 0))
    attendance = int(request.args.get('attendance', 0))
    if marks >= 85 and attendance >= 90:
        return 'Eligible for Scholarship'
    return 'Not eligible for Scholarship'

def calculatePenalty(daysLate, penaltyPerDay):
    return daysLate * penaltyPerDay

@app.route('/calculate-late-penalty', methods=['GET'])
def calculate_late_penalty():
    daysLate = int(request.args.get('daysLate', 0))
    penaltyPerDay = int(request.args.get('penaltyPerDay', 0))
    penalty = calculatePenalty(daysLate, penaltyPerDay)
    return f'Total penalty: {penalty}'

def calculateStudyHours(dailyHours, totalDays):
    return dailyHours * totalDays

@app.route('/estimate-study-hours', methods=['GET'])
def estimate_study_hours():
    dailyHours = int(request.args.get('dailyHours', 0))
    totalDays = int(request.args.get('totalDays', 0))
    totalHours = calculateStudyHours(dailyHours, totalDays)
    return f'Total study hours: {totalHours}'

def recommendTopics(interest):
    topics_data = {
        'AI': ['Machine Learning', 'Neural Networks', 'Natural Language Processing'],
        'Web Development': ['HTML', 'CSS', 'JavaScript', 'React'],
        'Data Science': ['Data Analysis', 'Visualization', 'Pandas', 'NumPy']
    }
    return topics_data.get(interest, [])

@app.route('/recommend-topics', methods=['GET'])
def recommend_topics():
    interest = request.args.get('interest', '')
    topics = recommendTopics(interest)
    return f'Recommended Topics: {", ".join(topics)}'

# flask --app app run --debug
if __name__ == '__main__':
    app.run(debug=True)
