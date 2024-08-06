import yfinance as yf
from yahooquery import search

# finance hub: cqp3019r01qthdu8pjfgcqp3019r01qthdu8pjg0

# webhook: cqp3019r01qthdu8pjh0

# api_key = '61KJM4WU9HX0W38V'


def get_asset_price(ticker):
    try:
        asset = yf.Ticker(ticker)
        price = asset.history(period="1d")['Close'].iloc[-1]
        return price
    except Exception as e:
        return f"An error occurred: {e}"


def search_stocks_and_get_prices(query):
    search_result = search(query)
    
    symbols = [result['symbol'] for result in search_result['quotes']]
    assets = []
    for symbol in symbols:
        stock = yf.Ticker(symbol)
        stock_info = stock.info
        renamed_stock = {
            'Symbol': stock_info.get('symbol'),
            'Name': stock_info.get('longName'),
            'Price': stock_info.get('currentPrice'),
            'Type': stock_info.get('quoteType')
        }
        assets.append(renamed_stock)
    
    return assets






