from flask import Flask, request, jsonify

app = Flask(__name__)

phones = [
    {'number': '123-456-7890', 'owner': 'Alice', 'type': 'mobile'},
    {'number': '987-654-3210', 'owner': 'Bob', 'type': 'home'}
]

accounts = [
    {'number': '111122223333', 'holder': 'Charlie', 'balance': 5000},
    {'number': '444455556666', 'holder': 'Dave', 'balance': 3000}
]

licenses = [
    {'number': 'D1234567', 'name': 'Eve', 'expiryDate': '2026-04-01'},
    {'number': 'D7654321', 'name': 'Frank', 'expiryDate': '2024-11-15'}
]

employees = [
    {'id': 'E1234', 'name': 'Grace', 'department': 'Engineering'},
    {'id': 'E5678', 'name': 'Hank', 'department': 'Marketing'}
]

orders = [
    {'id': 'ORD12345', 'customerName': 'Ivy', 'totalAmount': 150},
    {'id': 'ORD67890', 'customerName': 'Jake', 'totalAmount': 200}
]

@app.route('/phones/find', methods=['GET'])
def find_phone_number():
    phone_number = request.args.get('phoneNumber')
    phone = next((p for p in phones if p['number'] == phone_number), None)
    if phone:
        return jsonify({'phone': phone})
    return jsonify({'error': 'Phone number not found'}), 404

@app.route('/accounts/find', methods=['GET'])
def find_account_number():
    account_number = request.args.get('accountNumber')
    account = next((a for a in accounts if a['number'] == account_number), None)
    if account:
        return jsonify({'account': account})
    return jsonify({'error': 'Account number not found'}), 404

@app.route('/licenses/find', methods=['GET'])
def find_license_number():
    license_number = request.args.get('licenseNumber')
    license = next((l for l in licenses if l['number'] == license_number), None)
    if license:
        return jsonify({'license': license})
    return jsonify({'error': 'License number not found'}), 404

@app.route('/employees/find', methods=['GET'])
def find_employee_by_id():
    employee_id = request.args.get('employeeId')
    employee = next((e for e in employees if e['id'] == employee_id), None)
    if employee:
        return jsonify({'employee': employee})
    return jsonify({'error': 'Employee ID not found'}), 404

@app.route('/orders/find', methods=['GET'])
def find_order_by_id():
    order_id = request.args.get('orderId')
    order = next((o for o in orders if o['id'] == order_id), None)
    if order:
        return jsonify({'order': order})
    return jsonify({'error': 'Order ID not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)