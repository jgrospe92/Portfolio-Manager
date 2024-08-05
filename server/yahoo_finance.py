import yfinance as yf


def get_asset_price(ticker):
    try:
        asset = yf.Ticker(ticker)
        price = asset.history(period="1d")['Close'].iloc[-1]
        return price
    except Exception as e:
        return f"An error occurred: {e}"