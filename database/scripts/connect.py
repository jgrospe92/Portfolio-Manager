import mysql.connector
import pandas as pd
from mysql.connector import Error

DB_CONFIG = {
    'user': 'root',
    'password': 'my-secret-pw',
    'host': 'localhost',
    'port': '3306',
    'database': 'Portfolio_Management'
}

def get_db_connection():
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        if connection.is_connected():
            print("Connection Successful")
            return connection
    except Error as e:
        print(f"Error connecting to Database: {e}")
        return None
    
def close_db_connection(connection):
    if connection.is_connected():
        connection.close()

def upload_csv_to_db(csv_file):
    connection = get_db_connection()
    if connection is None:
        return
    
    cursor = connection.cursor()
    df = pd.read_csv(csv_file)
    print(df)

    for _, row in df.iterrows():
        try:
            cursor.execute("""
                INSERT INTO stockData (date, ticker, open, price, volume, daily_pnl, cumulative_pnl) 
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (row['Date'], row['ticker'], row['Open'], row['Price'], row['Volume'], row['Daily PnL'], row['Cumulative PnL']))
            connection.commit()
        except mysql.connector.Error as err:
            print(f"Error: {err}")
            connection.rollback()

    cursor.close()
    close_db_connection(connection)

upload_csv_to_db('.\database\scripts\data_snapshot.csv')
print("Upload Finished")