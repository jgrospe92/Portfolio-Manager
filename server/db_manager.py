import mysql.connector
from mysql.connector import errorcode
from yahoo_finance import *

# Add your database connection details
db_config = {
    'user': 'root',
    'password': 'my-secret-pw',
    'host': '127.0.0.1',
    'database': 'Portfolio_Management',
    'raise_on_warnings': True
}

def get_db():
    try:
        db = mysql.connector.connect(**db_config)
        return db
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

def close_db(db):
    db.close()

# Function to add a user
def add_user(username, password, email):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO Users (username, password, email) VALUES (%s, %s, %s)", (username, password, email))
        db.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_db(db)

# Function to delete a user
def delete_user(user_id):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM Users WHERE user_id = %s", (user_id,))
        db.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_db(db)

# Function to update a user's email
def update_user(user_id, new_data):
    # To be implemented later once done on the client side
    return

# Function to get all users
def get_all_users():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM Users")
        users = cursor.fetchall()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        users = []
    finally:
        cursor.close()
        close_db(db)
    return users

def update_user_email():
    # To be implemented later once done on the client side
    return 

# Function to add a portfolio
def add_portfolio(user_id, name, description):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO Portfolios (user_id, name, description) VALUES (%s, %s, %s)", (user_id, name, description))
        db.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_db(db)

# Function to delete a portfolio
def delete_portfolio(portfolio_id):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM Portfolios WHERE portfolio_id = %s", (portfolio_id,))
        db.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_db(db)
        
def get_assets_by_portfolio_id(portfolio_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        query = """
        SELECT a.asset_id, a.name, a.type, a.ticker_symbol, pa.quantity, pa.average_price
        FROM Assets a
        JOIN Portfolio_Assets pa ON a.asset_id = pa.asset_id
        WHERE pa.portfolio_id = %s
        """
        cursor.execute(query, (portfolio_id,))
        assets = cursor.fetchall()
        for asset in assets:
            # Fetch the current price for each asset using its ticker symbol
            current_price = get_asset_price(asset['ticker_symbol'])
            asset['current_price'] = current_price
            asset['projected_profit'] = (current_price - asset['average_price']) * asset['quantity']
            asset['realized_profit'] = get_realized_profit(portfolio_id, asset['asset_id'])

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        assets = []
    finally:
        cursor.close()
        db.close()
    return assets

import mysql.connector
from mysql.connector import Error

def get_realized_profit(portfolio_id, asset_id=None):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        query = """
                SELECT SUM(transaction_profit) AS total_profit
                FROM Transactions 
                WHERE portfolio_id = %s
            """
        if asset_id:
            query = query +""" AND asset_id = %s
            """
            params = (portfolio_id, asset_id)
        else:
            params = (portfolio_id,)
        cursor.execute(query, params)
        result = cursor.fetchone()
        if result is None or result['total_profit'] is None:
            raise Exception("No matching record found in Transactions")
        total_profit = result['total_profit']
        return total_profit
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None
    finally:
        cursor.close()
        db.close()


# Function to update a portfolio's name
def update_portfolio_name(portfolio_id, new_name):
    # To be implemented later once done on the client side
    return

def get_all_portfolios(user_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM Portfolios WHERE user_id=%s", (user_id,))
        portfolios = cursor.fetchall()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        portfolios = []
    finally:
        cursor.close()
        db.close()
    return portfolios
        



def delete_asset(asset_id):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM Assets WHERE asset_id = %s", (asset_id,))
        db.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_db(db)
        
def update_asset_name(asset_id, new_name):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("UPDATE Assets SET name = %s WHERE asset_id = %s", (new_name, asset_id))
        db.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_db(db)

def add_transaction(user_id, ticker, volume, price, type):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO Transactions (user_id, ticker, volume, price, type) VALUES (%s, %s, %s, %s, %s)", 
                       (user_id, ticker, volume, price, type))
        db.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_db(db)

def add_asset(name, type, ticker_symbol):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("SELECT asset_id FROM Assets WHERE ticker_symbol = %s", (ticker_symbol,))
        asset = cursor.fetchone()
        
        if not asset:
            cursor.execute("INSERT INTO Assets (name, type, ticker_symbol) VALUES (%s, %s, %s)", 
                        (name, type, ticker_symbol))
            db.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_db(db)

def get_asset_id(ticker_symbol):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("SELECT asset_id FROM Assets WHERE ticker_symbol = %s", (ticker_symbol,))
        asset = cursor.fetchone()
        asset_id = asset[0] if asset else None
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        asset_id = None
    finally:
        cursor.close()
        close_db(db)
    return asset_id

def get_user_funds(portfolio_id):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            SELECT Users.funds 
            FROM Users 
            JOIN Portfolios ON Users.user_id = Portfolios.user_id 
            WHERE Portfolios.portfolio_id = %s
        """, (portfolio_id,))
        user_funds = cursor.fetchone()[0]
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        user_funds = 0
    finally:
        cursor.close()
        close_db(db)
    return user_funds


def record_transaction(portfolio_id, asset_id, quantity, price_per_unit):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            INSERT INTO Transactions (portfolio_id, asset_id, transaction_type, quantity, price_per_unit, transaction_profit)
            VALUES (%s, %s, 'BUY', %s, %s, 0.00)
        """, (portfolio_id, asset_id, quantity, price_per_unit))
        db.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_db(db)

def update_portfolio_assets(portfolio_id, asset_id, quantity, price_per_unit):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            SELECT quantity, average_price 
            FROM Portfolio_Assets 
            WHERE portfolio_id = %s AND asset_id = %s
        """, (portfolio_id, asset_id))
        portfolio_asset = cursor.fetchone()

        if portfolio_asset:
            current_quantity, current_avg_price = portfolio_asset
            new_quantity = current_quantity + quantity
            new_avg_price = (current_avg_price * current_quantity + price_per_unit * quantity) / new_quantity
            cursor.execute("""
                UPDATE Portfolio_Assets 
                SET quantity = %s, average_price = %s 
                WHERE portfolio_id = %s AND asset_id = %s
            """, (new_quantity, new_avg_price, portfolio_id, asset_id))
        else:
            cursor.execute("""
                INSERT INTO Portfolio_Assets (portfolio_id, asset_id, quantity, average_price)
                VALUES (%s, %s, %s, %s)
            """, (portfolio_id, asset_id, quantity, price_per_unit))

        db.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_db(db)

def update_user_funds(portfolio_id, new_funds):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            UPDATE Users 
            JOIN Portfolios ON Users.user_id = Portfolios.user_id 
            SET Users.funds = %s 
            WHERE Portfolios.portfolio_id = %s
        """, (new_funds, portfolio_id))
        db.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_db(db)
        
        
def calculate_realized_profit(portfolio_id, asset_id, price_per_unit, quantity):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            SELECT average_price 
            FROM Portfolio_Assets 
            WHERE portfolio_id = %s AND asset_id = %s
        """, (portfolio_id, asset_id))
        result = cursor.fetchone()
        if result is None:
            raise Exception("No matching record found in Portfolio_Assets")
        average_price = result[0]
        realized_profit = quantity * (price_per_unit - average_price)
        print(realized_profit)
        db.commit()
        return realized_profit
    except mysql.connector.Error as err:
        db.rollback()
        raise Exception(f"Error recording transaction: {err}")
    finally:
        cursor.close()
        close_db(db)

    
def record_transaction(portfolio_id, asset_id, quantity, price_per_unit, transaction_type):
    db = get_db()
    cursor = db.cursor()
    try:
        realized_profit = 0
        if transaction_type == 'SELL':
            realized_profit = calculate_realized_profit(portfolio_id, asset_id, price_per_unit, quantity)
        cursor.execute("""
            INSERT INTO Transactions (portfolio_id, asset_id, transaction_type, quantity, price_per_unit, transaction_profit)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (portfolio_id, asset_id, transaction_type, quantity, price_per_unit, realized_profit))
        db.commit()
    except mysql.connector.Error as err:
        raise Exception(f"Error recording transaction: {err}")
    finally:
        cursor.close()
        close_db(db)

def get_portfolio_asset(portfolio_id, asset_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT quantity, average_price 
            FROM Portfolio_Assets 
            WHERE portfolio_id = %s AND asset_id = %s
        """, (portfolio_id, asset_id))
        portfolio_asset = cursor.fetchone()
    except mysql.connector.Error as err:
        raise Exception(f"Error fetching portfolio asset: {err}")
    finally:
        cursor.close()
        close_db(db)
    return portfolio_asset

def update_portfolio_assets_on_sell(portfolio_id, asset_id, quantity):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            SELECT quantity, average_price 
            FROM Portfolio_Assets 
            WHERE portfolio_id = %s AND asset_id = %s
        """, (portfolio_id, asset_id))
        portfolio_asset = cursor.fetchone()

        if portfolio_asset:
            current_quantity = portfolio_asset[0]
            new_quantity = current_quantity - quantity
            if new_quantity == 0:
                cursor.execute("""
                    DELETE FROM Portfolio_Assets
                    WHERE portfolio_id = %s AND asset_id = %s
                """, (portfolio_id, asset_id))
            else:
                cursor.execute("""
                    UPDATE Portfolio_Assets 
                    SET quantity = %s 
                    WHERE portfolio_id = %s AND asset_id = %s
                """, (new_quantity, portfolio_id, asset_id))

        db.commit()
    except mysql.connector.Error as err:
        raise Exception(f"Error updating portfolio assets on sell: {err}")
    finally:
        cursor.close()
        close_db(db)

def update_user_funds(portfolio_id, new_funds):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            UPDATE Users 
            JOIN Portfolios ON Users.user_id = Portfolios.user_id 
            SET Users.funds = %s 
            WHERE Portfolios.portfolio_id = %s
        """, (new_funds, portfolio_id))
        db.commit()
    except mysql.connector.Error as err:
        raise Exception(f"Error updating user funds: {err}")
    finally:
        cursor.close()
        close_db(db)
