from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/high-temperatures', methods=['GET'])
def high_temperatures():
    data = [22, 26, 19, 30, 23, 28, 17, 31]
    def filterHighTemperatures(temp):
        return temp > 25
    filtered = list(filter(filterHighTemperatures, data))
    return jsonify(filtered)


@app.route('/low-prices', methods=['GET'])
def low_prices():
    data = [80, 120, 95, 150, 60, 110]
    def filterLowPrices(price):
        return price <= 100
    filtered = list(filter(filterLowPrices, data))
    return jsonify(filtered)

@app.route('/high-ratings', methods=['GET'])
def high_ratings():
    data = [4.2, 3.8, 2.5, 4.7, 3.0, 4.9, 3.6]
    def filterHighRatings(rating):
        return rating > 3.5
    filtered = list(filter(filterHighRatings, data))
    return jsonify(filtered)

@app.route('/long-indian-names', methods=['GET'])
def long_indian_names():
    data = ['Akshay', 'Priyanka', 'Arjun', 'Anushka', 'Rajesh', 'Kavita']
    def filterLongIndianNames(name):
        return len(name) > 6
    filtered = list(filter(filterLongIndianNames, data))
    return jsonify(filtered)

@app.route('/cheaper-products', methods=['GET'])
def cheaper_products():
    data = [10, 25, 50, 75, 100, 150, 200]
    filter_param = request.args.get('filterParam', type=int)
    def filterCheaperProducts(price):
        return price < filter_param
    filtered = list(filter(filterCheaperProducts, data))
    return jsonify(filtered)

if __name__ == '__main__':
    app.run(debug=True)