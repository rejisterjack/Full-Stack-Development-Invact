from flask import Flask, request, jsonify

app = Flask(__name__)

# Welcome route
@app.route("/", methods=["GET"])
def api_welcome():
    return jsonify({"message": "Welcome to the Flask API"})

@app.route("/shout", methods=["GET"])
def shout():
    name = request.args.get("name","")
    uppercase_name = name.upper()
    return uppercase_name

@app.route("/greet", methods=["GET"])
def greet():
    name = request.args.get("name","")
    greet_string = f"Hello {name}"
    return greet_string

@app.route("/custom-commit", methods=["GET"])
def custom_commit():
        commit_type = request.args.get("type", "")
        message = request.args.get("message", "")
        return f"{commit_type}: {message}"

@app.route("/certificate", methods=["GET"])
def certificate():
        first_name = request.args.get("firstName", "")
        last_name = request.args.get("lastName", "")
        course_name = request.args.get("courseName", "")
        return f"This certification is awarded to {first_name} {last_name} for completing the course {course_name}"

@app.route("/autoreply", methods=["GET"])
def autoreply():
        start_month = request.args.get("startMonth", "")
        end_month = request.args.get("endMonth", "")
        return f"Dear customer, thank you for reaching out to me. Unfortunately, I'm out of office from {start_month} till {end_month}. Your enquiry will be resolved by another colleague."

@app.route("/secureurl", methods=["GET"])
def secureurl():
        domain = request.args.get("domain", "")
        return f"https://{domain}"

@app.route("/sendotp", methods=["GET"])
def sendotp():
        otp_code = request.args.get("otpCode", "")
        return f"Your OTP for account verification is {otp_code}. Do not share this with anyone"

@app.route("/welcome", methods=["GET"])
def welcome():
        first_name = request.args.get("firstName", "")
        email = request.args.get("email", "")
        return f"Hey {first_name}. We're excited to have you here, we'll send future notifications to your registered mail ({email})"

@app.route("/github-profile", methods=["GET"])
def github_profile():
        username = request.args.get("userName", "")
        return f"https://github.com/{username}"

@app.route("/text-to-csv", methods=["GET"])
def text_to_csv():
        id = request.args.get("id", "")
        email = request.args.get("email", "")
        roll_number = request.args.get("rollNumber", "")
        return f"{id}, {email}, {roll_number}"

@app.route("/check-number", methods=["GET"])
def check_number():
        number = float(request.args.get("number", 0))
        if number > 0:
                result = "Positive"
        elif number < 0:
                result = "Negative"
        else:
                result = "Zero"
        return f"The number {number} is {result}"

if __name__ == "__main__":
    app.run()