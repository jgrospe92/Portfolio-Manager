from flask import Flask, request, jsonify
from db_manager import *
from flask_cors import CORS


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

if __name__ == '__main__':
    app.run(debug=True)
