# DIASProject - Stock Data Management

This project is designed to work with stock market data and allows users to manage and analyze stock trading information. The data is stored in a MySQL database and consists of two primary tables: `stock_data` and `issuers`.

## Prerequisites

Before you begin, ensure you have the following installed:

- **MySQL**: The project requires a MySQL database to store stock data.
- **MySQL Workbench** (optional): For managing your database visually.
- **.env file**: Required for configuring database credentials.

## Setup Instructions

1. **Install MySQL**:  
   Download and install MySQL from the official website: [MySQL Download](https://dev.mysql.com/downloads/).

2. **Create Database and Tables**:  
   After setting up MySQL, you'll need to create the database and tables.

   - **Create the Database**:
     Open MySQL and run the following SQL command to create the `stock_data` database:

     ```sql
     CREATE DATABASE stock_data;
     ```

   - **Create the Tables**:  
     Now, create the necessary tables (`stock_data` and `issuers`) by running the following SQL queries:

     ```sql
     CREATE TABLE issuers (
         id INT AUTO_INCREMENT PRIMARY KEY,
         symbol VARCHAR(10) NOT NULL,
         name VARCHAR(255) NOT NULL
     );

     CREATE TABLE stock_data (
         id INT AUTO_INCREMENT PRIMARY KEY,
         symbol VARCHAR(10) NOT NULL,
         date DATE NOT NULL,
         last_price DECIMAL(10,2),
         high_price DECIMAL(10,2),
         low_price DECIMAL(10,2),
         avg_price DECIMAL(10,2),
         quantity INT,
         turnover DECIMAL(10,2),
         total_turnover DECIMAL(10,2),
         FOREIGN KEY (symbol) REFERENCES issuers(symbol)
     );
     ```

3. **Create `.env` File**:  
   Create a `.env` file in the root directory of the project and add the following environment variables for database configuration:

   ```ini
   DB_HOST=localhost
   DB_USER=<your_user>
   DB_PASSWORD=<your_password>
   DB_DATABASE=stock_data


