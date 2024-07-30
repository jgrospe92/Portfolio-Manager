import mysql.connector
from mysql.connector import errorcode

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
    # To be implemented later once done on the client side
    return

# Function to get all portfolios
def get_all_portfolios():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM Portfolios")
        portfolios = cursor.fetchall()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        portfolios = []
    finally:
        cursor.close()
        

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
       
