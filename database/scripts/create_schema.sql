START TRANSACTION;

SET time_zone = "+00:00";

-- Create the database
DROP DATABASE IF EXISTS `Portfolio_Management`;

-- Create database portfolio_management
CREATE DATABASE `Portfolio_Management`;

USE `Portfolio_Management`;

-- Create Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    funds INT  NOT NULL DEFAULT 0,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Portfolios table
CREATE TABLE Portfolios (
    portfolio_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profit FLOAT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Assets table
CREATE TABLE Assets (
    asset_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50),
    instrument_type VARCHAR(50),
    sector VARCHAR(20),
    ticker_symbol VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Transactions table
CREATE TABLE Transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    portfolio_id INT NOT NULL,
    asset_id INT NOT NULL,
    transaction_type VARCHAR(10) NOT NULL,
    quantity INT NOT NULL,
    price_per_unit FLOAT NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction_profit FLOAT NOT NULL DEFAULT 0,
    FOREIGN KEY (portfolio_id) REFERENCES Portfolios(portfolio_id),
    FOREIGN KEY (asset_id) REFERENCES Assets(asset_id)
);

-- Create Portfolio_Assets table
CREATE TABLE Portfolio_Assets (
    portfolio_id INT NOT NULL,
    asset_id INT NOT NULL,
    quantity INT NOT NULL,
    average_price FLOAT NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (portfolio_id, asset_id),
    FOREIGN KEY (portfolio_id) REFERENCES Portfolios(portfolio_id),
    FOREIGN KEY (asset_id) REFERENCES Assets(asset_id)
);

-- Create Asset_Prices table
CREATE TABLE Asset_Prices (
    price_id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT NOT NULL,
    price FLOAT NOT NULL,
    price_date datetime default(curdate()),
    FOREIGN KEY (asset_id) REFERENCES Assets(asset_id)
);

-- Insert Users
INSERT INTO Users (username, funds, password, email) VALUES
('user1', 100000, 'password1', 'user1@example.com'),
('user2', 50000, 'password2', 'user2@example.com');

-- Insert Portfolios for the first user (user_id = 1)
INSERT INTO Portfolios (user_id, name, description, profit) VALUES
(1, 'Tech Portfolio', 'A portfolio consisting of technology stocks', 1000.00),
(1, 'Healthcare Portfolio', 'A portfolio consisting of healthcare stocks', 1500.00),
(1, 'Energy Portfolio', 'A portfolio consisting of energy stocks', 2000.00);

-- Insert Portfolios for the second user (user_id = 2)
INSERT INTO Portfolios (user_id, name, description, profit) VALUES
(2, 'Finance Portfolio', 'A portfolio consisting of finance stocks', 500.00),
(2, 'Real Estate Portfolio', 'A portfolio consisting of real estate stocks', 750.00);

-- Insert Assets
INSERT INTO Assets (name, type, instrument_type, sector, ticker_symbol) VALUES
('Apple Inc.', 'Equity', 'Stock', 'Technology', 'AAPL'),
('Microsoft Corp.', 'Equity', 'Stock', 'Technology', 'MSFT'),
('Johnson & Johnson', 'Equity', 'Stock', 'Healthcare', 'JNJ'),
('Pfizer Inc.', 'Equity', 'Stock', 'Healthcare', 'PFE'),
('Exxon Mobil', 'Equity', 'Stock', 'Energy', 'XOM'),
('Chevron Corp.', 'Equity', 'Stock', 'Energy', 'CVX');

-- Insert Transactions
INSERT INTO Transactions (portfolio_id, asset_id, transaction_type, quantity, price_per_unit, transaction_profit) VALUES
(1, 1, 'BUY', 10, 150.00, 500.00),
(1, 2, 'BUY', 5, 200.00, 500.00),
(1, 1, 'SELL', 5, 160.00, 100.00),
(2, 3, 'BUY', 20, 75.00, 200.00),
(2, 4, 'BUY', 15, 100.00, 300.00),
(3, 5, 'BUY', 30, 50.00, 600.00),
(3, 6, 'BUY', 25, 60.00, 400.00);

-- Insert Portfolio_Assets
INSERT INTO Portfolio_Assets (portfolio_id, asset_id, quantity, average_price) VALUES
(1, 1, 5, 155.00),
(1, 2, 5, 200.00),
(2, 3, 20, 75.00),
(2, 4, 15, 100.00),
(3, 5, 30, 50.00),
(3, 6, 25, 60.00);

-- Insert Asset Prices
INSERT INTO Asset_Prices (asset_id, price) VALUES
(1, 158.00),
(2, 205.00),
(3, 78.00),
(4, 102.00),
(5, 52.00),
(6, 62.00);


COMMIT;
