def main():
    try:
        import yfinance as yf
        import pandas as pd
        import numpy as np
        import plotly
        import os
    except ImportError:
        import pip
        pip.main(['install', '--user', 'yfinance'])
        pip.main(['install', '--user', 'pandas'])
        pip.main(['install', '--user', 'numpy'])
        pip.main(['install', '--user', 'plotly'])
        import yfinance
        import pandas as pd
        import numpy as np
        import plotly
        import os

    tickers_and_values = {
        'AAPL': 2600,
        'NVDA': 700,
        'MSFT': 1800,
        'SPY': 5000,
        'META': 1300
    }

    df = pd.concat([yf.download(ticker, group_by="Ticker", period = "5y", interval = "1d").assign(ticker=ticker) for ticker in tickers_and_values.keys()], ignore_index=False)
    df.to_csv('./database/scripts/data_snapshot.csv')    
              
if __name__ == "__main__":
    main()