# db.py

from flask import g
import mysql.connector
from mysql.connector import Error

# Database configuration
DB_CONFIG = {
    'user': 'root',
    'password': 'my-secret-pw',
    'host': '127.0.0.1',
    'port':'3306',
    'database': 'Portfolio_Management'
}

def get_db():
    if 'db' not in g:
        try:
            g.db = mysql.connector.connect(**DB_CONFIG)
        except Error as e:
            print(f"Error connecting to MySQL database: {e}")
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
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
def update_user_email(user_id, new_email):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("UPDATE Users SET email = %s WHERE user_id = %s", (new_email, user_id))
        db.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_db(db)

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

# Function to update a portfolio's name
def update_portfolio_name(portfolio_id, new_name):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("UPDATE Portfolios SET name = %s WHERE portfolio_id = %s", (new_name, portfolio_id))
        db.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_db(db)

# Function to add an asset
def add_asset(name, type, ticker_symbol):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO Assets (name, type, ticker_symbol) VALUES (%s, %s, %s)", (name, type, ticker_symbol))
        db.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_db(db)

# Function to delete an asset
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

# Function to update an asset's name
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
