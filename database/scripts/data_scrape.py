def install(package):
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])
    
def main():
    import yfinance as yf
    import pandas as pd

    tickers = ['AAPL', 'NVDA', 'MSFT', 'AMZN', 'GOOGL', 'TSLA', 'JNJ', 'SPY', 'TLT', 'BIL', 'BTC']

    df = pd.concat([yf.download(ticker, group_by="Ticker", period = "5y", interval = "1d").assign(ticker=ticker) for ticker in tickers], ignore_index=False).reset_index()
    df.rename(columns={'level_1': 'Date', 'Adj Close': 'Price'}, inplace=True)
    df = df[['Date', 'ticker', 'Open', 'Price', 'Volume']]
    position = 100
    df['Daily PnL'] = df.groupby('ticker')['Price'].diff() * position
    df['Cumulative PnL'] = df.groupby('ticker')['Daily PnL'].cumsum()
    df.to_csv('./database/scripts/data_snapshot.csv')    
              
if __name__ == "__main__":
    install('yfinance')
    main()