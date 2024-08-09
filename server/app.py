from flask import Flask, request, jsonify, Response
from flask_swagger_ui import get_swaggerui_blueprint
from flask_swagger import swagger
from db_manager import *
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

SWAGGER_URL = '/docs'
API_URL = '/static/swagger.yaml'

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Portfolio Management API"
    }
)

app.register_blueprint(swaggerui_blueprint, url_prefix="/docs")

@app.route("/spec")
def spec():
    return jsonify(swagger(app))

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data['username']
    password = data['password']
    email = data['email']
    try:
        add_user(username, password, email)
        response = jsonify(message="User added successfully")
        response.status_code = 201
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/users', methods=['GET'])
def retrieve_users():
    try:
        users = get_all_users()
        response = jsonify(users)
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/users/<int:user_id>', methods=['GET'])
def retrieve_user_by_id(user_id):
    try:
        user = get_user_by_id(user_id)
        response = jsonify(user)
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/users/<int:user_id>', methods=['DELETE'])
def remove_user(user_id):
    try:
        delete_user(user_id)
        response = jsonify(message="User deleted successfully")
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    new_email = data['email']
    try:
        update_user(user_id, new_email)
        response = jsonify(message="User email updated successfully")
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/portfolios', methods=['POST'])
def create_portfolio():
    data = request.get_json()
    user_id = data['user_id']
    name = data['name']
    description = data['description']
    try:
        add_portfolio(user_id, name, description)
        response = jsonify(message="Portfolio added successfully")
        response.status_code = 201
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/portfolios/<int:user_id>', methods=['GET'])
def retrieve_portfolios(user_id):
    try:
        portfolios = get_all_portfolios(user_id)
        response = jsonify(portfolios)
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/portfolios/<int:portfolio_id>', methods=['DELETE'])
def remove_portfolio(portfolio_id):
    try:
        delete_portfolio(portfolio_id)
        response = jsonify(message="Portfolio deleted successfully")
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/buy', methods=['POST'])
def buy_asset():
    data = request.get_json()
    name = data['name']
    type = data['type']
    ticker_symbol = data['ticker_symbol']
    quantity = float(data['quantity'])
    portfolio_id = int(data['portfolio_id'])
    price_per_unit = float(data["price"])
    
    try:
        # Ensure asset is added to the Assets table
        add_asset(name, type, ticker_symbol)

        # Fetch the asset ID
        asset_id = get_asset_id(ticker_symbol)

        # Calculate total cost
        total_cost = quantity * price_per_unit

        # Get the user's current funds
        user_funds = get_user_funds(portfolio_id)

        if user_funds < total_cost:
            raise Exception("Insufficient funds")

        # Record the transaction
        record_transaction(portfolio_id, asset_id, quantity, price_per_unit, 'BUY')

        # Update Portfolio_Assets table
        update_portfolio_assets(portfolio_id, asset_id, quantity, price_per_unit)

        # Deduct the total cost from user's funds
        new_funds = user_funds - total_cost
        update_user_funds(portfolio_id, new_funds)
        
      
        response = jsonify(message="Asset bought successfully",status='success')
        response.status_code = 201
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400

    return response


@app.route('/assets/<int:portfolio_id>', methods=['GET'])
def retrieve_assets(portfolio_id):
    try:
        assets = get_assets_by_portfolio_id(portfolio_id)
        response = jsonify(assets)
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/sell', methods=['POST'])
def sell_asset():
    data = request.get_json()
    ticker_symbol = data['ticker_symbol']
    quantity = float(data['quantity'])
    portfolio_id = int(data['portfolio_id'])
    price_per_unit = float(get_asset_price(ticker_symbol))
  
    try:
        # Fetch the asset ID
        asset_id = get_asset_id(ticker_symbol)
        print("asset_id", asset_id)

        # Get current portfolio asset details
        portfolio_asset = get_portfolio_asset(portfolio_id, asset_id)
        if not portfolio_asset or portfolio_asset['quantity'] < quantity:
            raise Exception("Insufficient assets to sell")

        # Calculate total proceeds
        total_proceeds = quantity * price_per_unit

        # Record the transaction
        record_transaction(portfolio_id, asset_id, quantity, price_per_unit, 'SELL')

        # Update Portfolio_Assets table
        update_portfolio_assets_on_sell(portfolio_id, asset_id, quantity)

        # Add the total proceeds to user's funds
        user_funds = get_user_funds(portfolio_id)
        new_funds = user_funds + total_proceeds
        update_user_funds(portfolio_id, new_funds)

        response = jsonify(message="Asset sold successfully")
        response.status_code = 201
        
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400

    return response

@app.route('/market_assets/<string:name>', methods=['GET'])
def get_market_assets(name):
    try:
        assets = search_stocks_and_get_prices(name)
        response = jsonify(assets)
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response


@app.route('/realized_profit_loss/<int:portfolio_id>', methods=['GET'])
def realized_profit_loss(portfolio_id):
    try:
        profit_loss = get_realized_profit_loss(portfolio_id)
        response = jsonify(realized_profit_loss=profit_loss)
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/unrealized_profit_loss/<int:portfolio_id>', methods=['GET'])
def unrealized_profit_loss(portfolio_id):
    try:
        profit_loss = get_unrealized_profit_loss(portfolio_id)
        response = jsonify(unrealized_profit_loss=profit_loss)
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/realized_profit_loss_single_stock', methods=['POST'])
def realized_profit_loss_single_stock():
    data = request.get_json()
    portfolio_id = data['portfolio_id']
    ticker_symbol = data['ticker_symbol']
    try:
        profit_loss = get_single_stock_realized(portfolio_id, ticker_symbol)
        response = jsonify(realized_profit_loss=profit_loss)
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/unrealized_profit_loss_single_stock', methods=['POST'])
def unrealized_profit_loss_single_stock():
    data = request.get_json()
    portfolio_id = data['portfolio_id']
    ticker_symbol = data['ticker_symbol']
    try:
        profit_loss = get_single_stock_unrealized(portfolio_id, ticker_symbol)
        response = jsonify(unrealized_profit_loss=profit_loss)
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/real_time_price/<ticker_symbol>', methods=['GET'])
def real_time_price(ticker_symbol):
    try:
        price = get_real_time_price(ticker_symbol)
        response = jsonify(price)
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/roi/<int:portfolio_id>', methods=['GET'])
def return_on_investment(portfolio_id):
    try:
        roi = calculate_roi(portfolio_id)
        response = jsonify(roi=roi)
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/historical-data/<string:ticker>', methods=['GET'])
def get_historical_data(ticker):
    if not ticker:
        return jsonify({'error': 'Ticker is required'}), 400

    try:
        stock = yf.Ticker(ticker)
        hist = stock.history(period="2y")  # Fetch last 2 years of data
        data = hist.reset_index().to_dict(orient='records')
        result = [
            {
                'date': item['Date'].strftime('%Y-%m-%d'),
                'open': item['Open'],
                'high': item['High'],
                'low': item['Low'],
                'close': item['Close'],
                'volume': item['Volume']
            } for item in data
        ]
        print(jsonify(result))
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    

if __name__ == '__main__':
    app.run(debug=True)
