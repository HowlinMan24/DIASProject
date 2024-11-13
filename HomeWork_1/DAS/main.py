from filters import extract_issuers, check_last_date_in_db, fetch_missing_data
from time_tracking import measure_time
from util import connect_db, insert_stock_data


@measure_time
def main():
    db_connection = connect_db()

    issuers = extract_issuers()

    for issuer in issuers:
        last_date = check_last_date_in_db(issuer, db_connection)

        if last_date:
            missing_data = fetch_missing_data(issuer, last_date, db_connection)
            insert_stock_data(issuer, missing_data, db_connection)
        else:
            print(f"No data found for {issuer}")

    db_connection.close()


if __name__ == "__main__":
    main()
