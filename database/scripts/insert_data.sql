-- Adding dummy data for Users
INSERT INTO Users (username, password, email) VALUES 
('john_doe', 'password123', 'john_doe@example.com'),
('jane_smith', 'password123', 'jane_smith@example.com'),
('bob_brown', 'password123', 'bob_brown@example.com');

-- Adding dummy data for Portfolios
INSERT INTO Portfolios (user_id, name, description) VALUES 
(1, 'John\'s Portfolio', 'John\'s primary investment portfolio'),
(2, 'Jane\'s Portfolio', 'Jane\'s diversified investment portfolio'),
(3, 'Bob\'s Portfolio', 'Bob\'s retirement investment portfolio');

-- Adding dummy data for Assets
INSERT INTO Assets (name, type, ticker_symbol) VALUES 
('Apple Inc.', 'Stock', 'AAPL'),
('Tesla Inc.', 'Stock', 'TSLA'),
('Bitcoin', 'Cryptocurrency', 'BTC'),
('Gold', 'Commodity', 'XAU');

-- Adding dummy data for Transactions
INSERT INTO Transactions (portfolio_id, asset_id, transaction_type, quantity, price_per_unit) VALUES 
(1, 1, 'BUY', 10, 150.00),
(1, 2, 'BUY', 5, 700.00),
(2, 3, 'BUY', 1.5, 40000.00),
(3, 4, 'BUY', 2, 1800.00);

-- Adding dummy data for Portfolio_Assets
INSERT INTO Portfolio_Assets (portfolio_id, asset_id, quantity, average_price) VALUES 
(1, 1, 10, 150.00),
(1, 2, 5, 700.00),
(2, 3, 1.5, 40000.00),
(3, 4, 2, 1800.00);

-- Adding dummy data for Asset_Prices
INSERT INTO Asset_Prices (asset_id, price, price_date) VALUES 
(1, 160.00, '2024-07-01'),
(1, 155.00, '2024-07-02'),
(2, 710.00, '2024-07-01'),
(2, 705.00, '2024-07-02'),
(3, 42000.00, '2024-07-01'),
(3, 41500.00, '2024-07-02'),
(4, 1850.00, '2024-07-01'),
(4, 1825.00, '2024-07-02');

-- Adding more transactions for John Doe
-- Adding more transactions for John Doe
INSERT INTO Transactions (portfolio_id, asset_id, transaction_type, quantity, price_per_unit) VALUES 
(1, 1, 'BUY', 5, 145.00),
(1, 1, 'SELL', 3, 155.00),
(1, 2, 'BUY', 2, 710.00),
(1, 2, 'SELL', 1, 720.00),
(1, 3, 'BUY', 0.5, 41000.00),
(1, 3, 'BUY', 0.2, 42000.00),
(1, 3, 'SELL', 0.3, 42500.00),
(1, 4, 'BUY', 1, 1820.00),
(1, 4, 'SELL', 0.5, 1850.00);

-- Updating Portfolio_Assets for John Doe
INSERT INTO Portfolio_Assets (portfolio_id, asset_id, quantity, average_price) VALUES 
(1, 1, 12, 147.00) 
ON DUPLICATE KEY UPDATE 
    quantity = VALUES(quantity), 
    average_price = VALUES(average_price);

INSERT INTO Portfolio_Assets (portfolio_id, asset_id, quantity, average_price) VALUES 
(1, 2, 6, 705.00) 
ON DUPLICATE KEY UPDATE 
    quantity = VALUES(quantity), 
    average_price = VALUES(average_price);

INSERT INTO Portfolio_Assets (portfolio_id, asset_id, quantity, average_price) VALUES 
(1, 3, 1.0, 41500.00) 
ON DUPLICATE KEY UPDATE 
    quantity = VALUES(quantity), 
    average_price = VALUES(average_price);

INSERT INTO Portfolio_Assets (portfolio_id, asset_id, quantity, average_price) VALUES 
(1, 4, 1.5, 1825.00) 
ON DUPLICATE KEY UPDATE 
    quantity = VALUES(quantity), 
    average_price = VALUES(average_price);

-- Adding more asset prices
INSERT INTO Asset_Prices (asset_id, price, price_date) VALUES 
(1, 148.00, '2024-07-03'),
(1, 150.00, '2024-07-04'),
(2, 715.00, '2024-07-03'),
(2, 725.00, '2024-07-04'),
(3, 43000.00, '2024-07-03'),
(3, 43500.00, '2024-07-04'),
(4, 1870.00, '2024-07-03'),
(4, 1900.00, '2024-07-04');

COMMIT;

