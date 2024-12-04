import asyncio
import time

from data import load_data, save_data
from stock_scraper import get_stock_codes, scrape_all_stock_codes


async def main():
    start_time = time.time()
    stock_codes = get_stock_codes()
    print(f"Brojot na izdavaci  е: {len(stock_codes)}")

    existing_df = load_data()
    new_data = await scrape_all_stock_codes(stock_codes)

    if new_data:
        save_data(new_data, existing_df)

    end_time = time.time()
    duration = end_time - start_time
    minutes = duration / 60
    print(f"Prezemanjeto na podatoci e: {minutes:.2f} min.")


asyncio.run(main())
