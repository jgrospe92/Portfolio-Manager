from flask import Flask, request, jsonify
from db_manager import *
from flask_cors import CORS
import yfinance as yf
import matplotlib.pyplot as plt
import pandas as pd
import io
import base64

app = Flask(__name__)
CORS(app)

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

@app.route('/portfolios', methods=['GET'])
def retrieve_portfolios():
    try:
        portfolios = get_all_portfolios()
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

@app.route('/portfolios/<int:portfolio_id>', methods=['PUT'])
def modify_portfolio_name(portfolio_id):
    data = request.get_json()
    new_name = data['name']
    try:
        update_portfolio_name(portfolio_id, new_name)
        response = jsonify(message="Portfolio name updated successfully")
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/assets', methods=['POST'])
def create_asset():
    data = request.get_json()
    name = data['name']
    type = data['type']
    ticker_symbol = data['ticker_symbol']
    try:
        add_asset(name, type, ticker_symbol)
        response = jsonify(message="Asset added successfully")
        response.status_code = 201
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/assets', methods=['GET'])
def retrieve_assets():
    try:
        assets = get_all_assets()
        response = jsonify(assets)
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/assets/<int:asset_id>', methods=['DELETE'])
def remove_asset(asset_id):
    try:
        delete_asset(asset_id)
        response = jsonify(message="Asset deleted successfully")
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/assets/<int:asset_id>', methods=['PUT'])
def modify_asset_name(asset_id):
    data = request.get_json()
    new_name = data['name']
    try:
        update_asset_name(asset_id, new_name)
        response = jsonify(message="Asset name updated successfully")
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

### Buy and Sell
@app.route('/stocks/<ticker>', methods=['GET'])
def get_stock_data(ticker):
    try:
        stock = yf.Ticker(ticker)
        data = stock.history(period="1d")
        response = jsonify(data.to_dict(orient='records'))
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code=400
    return response

@app.route('/buy', methods=['POST'])
def buy_stock():
    data = request.get_json()
    user_id = data['user_id']
    ticker = data['ticker']
    volume = data['volume']
    price = get_real_time_price(ticker)
    try:
        buy_asset(user_id, ticker, volume, price)
        response = jsonify(message='Stock Bought Successfully')
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

@app.route('/sell', methods=['POST'])
def sell_stock():
    data = request.get_json()
    user_id = data['user_id']
    ticker = data['ticker']
    volume = data['volume']
    price = get_real_time_price(ticker)
    try:
        sell_asset(user_id, ticker, volume, price)
        response = jsonify(message='Stock Sold Successfully')
        response.status_code = 200
    except Exception as e:
        response = jsonify(message=str(e))
        response.status_code = 400
    return response

def get_real_time_price(ticker):
    stock = yf.Ticker(ticker)
    data = stock.history(period='1d')
    return data['Adj Close'].iloc[-1]

if __name__ == '__main__':
    app.run(debug=True)
