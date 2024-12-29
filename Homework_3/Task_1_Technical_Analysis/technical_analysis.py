import pandas as pd
import pandas_ta as ta

historical_data = pd.read_csv('../../../../../DIASProject/HomeWork_1/mse_historical_data.csv')

historical_data['Датум'] = pd.to_datetime(historical_data['Датум'], format='%d.%m.%Y')

historical_data.set_index('Датум', inplace=True)

historical_data['SMA_14'] = historical_data['Цена на последна трансакција'].rolling(window=14).mean()
historical_data['SMA_50'] = historical_data['Цена на последна трансакција'].rolling(window=50).mean()

historical_data['EMA_14'] = historical_data['Цена на последна трансакција'].ewm(span=14, adjust=False).mean()
historical_data['EMA_50'] = historical_data['Цена на последна трансакција'].ewm(span=50, adjust=False).mean()

historical_data['RSI_14'] = ta.rsi(historical_data['Цена на последна трансакција'], length=14)

print(historical_data[['Цена на последна трансакција', 'SMA_14', 'SMA_50', 'EMA_14', 'EMA_50', 'RSI_14']].head())