from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/welcome", methods=["GET"])
def welcome():
    return "We will now learn functions!"

@app.route("/greet", methods=["GET"])
def greet():
    return f"Hey, {request.args.get("username", "")}! Are you ready to learn functions with us?"

@app.route("/message", methods=["yearsOfExp"])
def years_of_exp():
    return f"You have experience with functions, Great!"

@app.route("/hours", methods=["GET"])
def hours():
    days = int(request.args.get("days", 0))
    hours = int(request.args.get("hours", 0))
    def getTime(days, hours):
        return days * hours
    total_hours = getTime(days, hours)
    return jsonify(total_hours)

@app.route("/module-completion-status", methods=["GET"])
def module_completion_status():
    username = request.args.get("username", "")
    hasCompleted = request.args.get("hasCompleted", "false").lower() == "true"
    def getModuleCompletion(username, hasCompleted):
        return f"{username} has {'completed' if hasCompleted else 'not completed'} the modules"
    message = getModuleCompletion(username, hasCompleted)
    return jsonify(message)

@app.route("/personalized-greeting", methods=["GET"])
def personalized_greeting():
    city = request.args.get("city", "")
    name = request.args.get("name", "")
    def getPersonalizedGreeting(city, name):
        return f"Hey, {name}! What's famous about {city}?"
    greeting = getPersonalizedGreeting(city, name)
    return jsonify(greeting)

@app.route("/find-age", methods=["GET"])
def find_age():
    birthyear = int(request.args.get("birthyear", 0))
    def findAge(birthyear):
        current_year = 2024
        return current_year - birthyear
    age = findAge(birthyear)
    return jsonify(age)

@app.route("/is-time-sufficient", methods=["GET"])
def is_time_sufficient():
    days = int(request.args.get("days", 0))
    hours = int(request.args.get("hours", 0))
    def findRequiredTime(days, hours):
        return days * hours >= 30
    sufficient = findRequiredTime(days, hours)
    message = "The time being dedicated is sufficient for learning functions" if sufficient else "The time being dedicated is not sufficient for learning functions"
    return jsonify(message)

if __name__ == '__main__':
    app.run(debug=True)