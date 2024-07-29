-- Active: 1722027376374@@127.0.0.1@3306@portfolio_manager
START TRANSACTION;
SET time_zone = "+00:00";

-- Create the database
DROP DATABASE IF EXISTS `Portfolio_Management`;

-- Create database portfolio_management
CREATE DATABASE `Portfolio_Management`;

use `Portfolio_Management`;

-- Create Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
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
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Assets table
CREATE TABLE Assets (
    asset_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50),
    ticker_symbol VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Transactions table
CREATE TABLE Transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    portfolio_id INT NOT NULL,
    asset_id INT NOT NULL,
    transaction_type VARCHAR(10) NOT NULL,
    quantity DECIMAL(18, 8) NOT NULL,
    price_per_unit DECIMAL(18, 8) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (portfolio_id) REFERENCES Portfolios(portfolio_id),
    FOREIGN KEY (asset_id) REFERENCES Assets(asset_id)
);

-- Create Portfolio_Assets table
CREATE TABLE Portfolio_Assets (
    portfolio_id INT NOT NULL,
    asset_id INT NOT NULL,
    quantity DECIMAL(18, 8) NOT NULL,
    average_price DECIMAL(18, 8) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (portfolio_id, asset_id),
    FOREIGN KEY (portfolio_id) REFERENCES Portfolios(portfolio_id),
    FOREIGN KEY (asset_id) REFERENCES Assets(asset_id)
);

-- Create Asset_Prices table
CREATE TABLE Asset_Prices (
    price_id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT NOT NULL,
    price DECIMAL(18, 8) NOT NULL,
    price_date datetime default(curdate()),
    FOREIGN KEY (asset_id) REFERENCES Assets(asset_id)
);