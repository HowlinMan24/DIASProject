import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
import matplotlib.pyplot as plt

historical_data = pd.read_csv('../../../../../DIASProject/HomeWork_1/mse_historical_data.csv')


def preprocess_data(data):
    scaler = MinMaxScaler(feature_range=(0, 1))
    data_scaled = scaler.fit_transform(data['Цена на последна трансакција'].values.reshape(-1, 1))
    return data_scaled, scaler


def train_lstm_model(data_scaled):
    X, y = [], []
    for i in range(60, len(data_scaled)):
        X.append(data_scaled[i - 60:i, 0])
        y.append(data_scaled[i, 0])
    X, y = np.array(X), np.array(y)

    X = X.reshape(X.shape[0], X.shape[1], 1)

    model = Sequential(
        LSTM(units=50, return_sequences=True, input_shape=(X.shape[1], 1)),
        LSTM(units=50, return_sequences=False),
        Dropout(0.2),
        Dense(units=1)
    )
    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(X, y, epochs=10, batch_size=16)
    return model


data_scaled, scaler = preprocess_data(historical_data)

model = train_lstm_model(data_scaled)

predicted_price = model.predict(data_scaled[-60:])
predicted_price = scaler.inverse_transform(predicted_price)

plt.plot(historical_data['Цена на последна трансакција'], label='Actual Price')
plt.plot(predicted_price, label='Predicted Price')
plt.legend()
plt.show()
