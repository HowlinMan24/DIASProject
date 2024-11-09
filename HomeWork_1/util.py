from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import mysql.connector
from pathlib import Path
from dotenv import load_dotenv
from datetime import datetime
import os
import pandas as pd

load_dotenv(dotenv_path=Path(__file__).parent.parent / '.env')

# STATIC VARIABLES
START_DATE = 2014
END_DATE = 2024
THREAD_WORKERS = 5
LIMIT_DATA_ROWS = 10000


def init_driver():
    """Initialize a Chrome WebDriver instance."""
    options = Options()
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)
    return driver


# Connect to MySQL Database
def connect_db():
    return mysql.connector.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_DATABASE')
    )


def parse_price(price_str):
    if price_str is None or pd.isna(price_str):
        return None
    if isinstance(price_str, float):
        return price_str
    if isinstance(price_str, str):
        price_str = price_str.replace('.', '', price_str.count('.') - 1).replace(',', '.')
        try:
            return float(price_str)
        except ValueError:
            return None
    return None


def insert_stock_data():
    df = pd.read_csv("data_all_codes.csv")
    df = df.head(LIMIT_DATA_ROWS)
    columns = [
        'Stock Symbol', 'Датум', 'Цена на последна трансакција', 'Мак.', 'Мин.', 'Просечна цена',
        '%пром.', 'Количина', 'Промет во БЕСТ во денари', 'Вкупен промет во денари'
    ]

    if not all(col in df.columns for col in columns):
        raise ValueError(f"The CSV does not have all the required columns: {columns}")

    connection = connect_db()
    cursor = connection.cursor()
    insert_query = """
        INSERT INTO stock_data (
            symbol, date, last_price, high_price, low_price, avg_price, 
            quantity, turnover, total_turnover
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
            last_price = VALUES(last_price),
            high_price = VALUES(high_price),
            low_price = VALUES(low_price),
            avg_price = VALUES(avg_price),
            quantity = VALUES(quantity),
            turnover = VALUES(turnover),
            total_turnover = VALUES(total_turnover)
    """

    for _, row in df.iterrows():
        try:
            date_value = datetime.strptime(row['Датум'], "%d.%m.%Y").date()
            last_price = parse_price(row['Цена на последна трансакција'])
            high_price = parse_price(row['Мак.']) if row['Мак.'] else None
            low_price = parse_price(row['Мин.']) if row['Мин.'] else None
            avg_price = parse_price(row['Просечна цена']) if row['Просечна цена'] else None
            quantity = parse_price(row['Количина']) if row['Количина'] else None
            turnover = parse_price(row['Промет во БЕСТ во денари']) if row['Промет во БЕСТ во денари'] else None
            total_turnover = parse_price(row['Вкупен промет во денари']) if row['Вкупен промет во денари'] else None
            data = (
                row['Stock Symbol'],
                date_value,
                last_price,
                high_price,
                low_price,
                avg_price,
                quantity,
                turnover,
                total_turnover
            )
            cursor.execute(insert_query, data)
        except Exception as e:
            print(f"Error inserting row: {row}")
            print(f"Error message: {e}")

    connection.commit()
    cursor.close()
    connection.close()

    print("DATA HAS BEEN INSERTED IN THE DB")


if __name__ == '__main__':
    insert_stock_data()
