import re
import time

from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from HomeWork_1.DAS.util import init_driver


def extract_issuers():
    driver = init_driver()
    driver.get('https://www.mse.mk/mk/stats/symbolhistory/REPL')

    WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.NAME, 'Code')))
    select = driver.find_element(By.NAME, 'Code')
    options_list = select.find_elements(By.TAG_NAME, 'option')

    issuers = []
    for option in options_list:
        symbol = option.text.strip()
        if symbol != 'Изберете символ' and not re.search(r'\d', symbol):  # Exclude symbols containing numbers
            issuers.append(symbol)

    driver.quit()
    return issuers


def check_last_date_in_db(symbol, db_connection):
    cursor = db_connection.cursor()
    cursor.execute("SELECT MAX(date) FROM stock_data WHERE symbol = %s", (symbol,))
    result = cursor.fetchone()
    return result[0] if result[0] else None


def fetch_missing_data(symbol, last_date, db_connection):
    driver = init_driver()
    driver.get('https://www.mse.mk/mk/stats/symbolhistory/REPL')

    from_date = last_date.strftime('%d.%m.%Y') if last_date else '01.01.2014'
    to_date = time.strftime('%d.%m.%Y')

    select = driver.find_element(By.NAME, 'Code')
    select.send_keys(symbol)

    from_date_input = driver.find_element(By.ID, 'FromDate')
    to_date_input = driver.find_element(By.ID, 'ToDate')
    from_date_input.clear()
    from_date_input.send_keys(from_date)
    to_date_input.clear()
    to_date_input.send_keys(to_date)

    submit_button = driver.find_element(By.CSS_SELECTOR, 'input[type="submit"]')
    submit_button.click()

    WebDriverWait(driver, 30).until(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'table#resultsTable tbody tr')))
    data = driver.page_source
    soup = BeautifulSoup(data, 'html.parser')

    rows = soup.select('tbody > tr')
    new_data = []
    for row in rows:
        cells = row.find_all('td')
        row_data = [cell.text.strip().replace(',', '.') for cell in cells]
        new_data.append(row_data)

    driver.quit()

    return new_data
