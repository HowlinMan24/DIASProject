import time
from concurrent.futures import ThreadPoolExecutor, as_completed

import pandas as pd
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait

from HomeWork_1.util import init_driver, START_DATE, END_DATE, THREAD_WORKERS

years = list(range(START_DATE, END_DATE))
columns = [
    'Датум', 'Цена на последна трансакција', 'Мак.', 'Мин.', 'Просечна цена',
    '%пром.', 'Количина', 'Промет во БЕСТ во денари', 'Вкупен промет во денари'
]


def process_symbol(symbol):
    driver = init_driver()
    driver.get('https://www.mse.mk/mk/stats/symbolhistory/REPL')
    WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.NAME, 'Code')))

    select = Select(driver.find_element(By.NAME, 'Code'))
    select.select_by_visible_text(symbol)
    symbol_data = []

    for year in years:
        from_date = f'01.01.{year}'
        to_date = f'31.12.{year}'

        from_date_input = driver.find_element(By.ID, 'FromDate')
        to_date_input = driver.find_element(By.ID, 'ToDate')
        from_date_input.clear()
        from_date_input.send_keys(from_date)
        to_date_input.clear()
        to_date_input.send_keys(to_date)

        submit_button = driver.find_element(By.CSS_SELECTOR, 'input[type="submit"]')
        submit_button.click()

        time.sleep(2)

        data = driver.page_source
        soup = BeautifulSoup(data, 'html.parser')
        rows = soup.select('tbody > tr')

        if not rows:
            print(f"No rows found for {symbol} in {year}.")
            continue

        extracted_data = []
        for row in rows:
            cells = row.find_all('td')
            row_data = [cell.text.strip().replace(',', '.') for cell in cells]
            extracted_data.append(row_data)

        if extracted_data:
            df = pd.DataFrame(extracted_data, columns=columns)
            df['Stock Symbol'] = symbol
            symbol_data.append(df)

        time.sleep(1)

    driver.quit()
    return pd.concat(symbol_data, ignore_index=True) if symbol_data else None


def main():
    driver = init_driver()
    driver.get('https://www.mse.mk/mk/stats/symbolhistory/REPL')
    WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.NAME, 'Code')))

    select = Select(driver.find_element(By.NAME, 'Code'))
    options = [option.text for option in select.options if option.text != 'Изберете символ']
    driver.quit()

    all_data = []
    with ThreadPoolExecutor(max_workers=THREAD_WORKERS) as executor:
        futures = {executor.submit(process_symbol, option): option for option in options}
        for future in as_completed(futures):
            symbol = futures[future]
            try:
                data = future.result()
                if data is not None:
                    all_data.append(data)
                    print(f"Data retrieved for {symbol}.")
            except Exception as e:
                print(f"Error retrieving data for {symbol}: {e}")

    if all_data:
        final_df = pd.concat(all_data, ignore_index=True)
        print(final_df)
        final_df.to_csv('stock_data_all_options.csv', index=False)
    else:
        print("No data was retrieved.")


if __name__ == "__main__":
    main()
