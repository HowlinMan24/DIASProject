from datetime import datetime, timedelta

end_d= datetime.now().strftime("%d.%m.%Y")
start_d= (datetime.now() - timedelta(days=365 * 10)).strftime("%d.%m.%Y")
historical_records_file_ = 'mse_historical_data.csv'
