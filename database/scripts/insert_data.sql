-- Create a new user
INSERT INTO Users (username, password, email) 
VALUES ('john_doe', 'password123', 'john@example.com');

-- Create another new user
INSERT INTO Users (username, password, email) 
VALUES ('jane_smith', 'password456', 'jane@example.com');

-- Create a new portfolio for the first user
INSERT INTO Portfolios (user_id, name, description) 
VALUES (1, 'Retirement Fund', 'Long-term investment portfolio for retirement.');

-- Create another portfolio for the first user
INSERT INTO Portfolios (user_id, name, description) 
VALUES (1, 'Short-Term Savings', 'Portfolio for short-term savings goals.');

-- Create a new asset
INSERT INTO Assets (name, type, ticker_symbol) 
VALUES ('Apple Inc.', 'Stock', 'AAPL');

-- Create another asset
INSERT INTO Assets (name, type, ticker_symbol) 
VALUES ('Tesla Inc.', 'Stock', 'TSLA');

-- Insert to Asset_Prices
INSERT INTO Asset_Prices (asset_id, price)
values(1, 224.31);
-- Create another asset
INSERT INTO Asset_Prices (asset_id, price)
values(2, 239.20);

-- Insert a transaction for buying an asset
INSERT INTO Transactions (portfolio_id, asset_id, transaction_type, quantity, price_per_unit)
VALUES (1, 1, 'Buy', 100, 150.00);

-- Insert another transaction for selling an asset
INSERT INTO Transactions (portfolio_id, asset_id, transaction_type, quantity, price_per_unit)
VALUES (1, 1, 'Sell', 50, 160.00);

-- Read all users
SELECT * FROM Users;

-- Read all portfolios for the first user
SELECT * FROM Portfolios WHERE user_id = 1;

-- Read all assets
SELECT a.*, ap.* FROM Assets as a
join Asset_Prices as ap on a.asset_id = ap.asset_id;

-- Read from prices
select * from Asset_Prices;

-- Read all transactions for a specific portfolio
SELECT * FROM Transactions WHERE portfolio_id = 1;

-- Update the email of the first user
UPDATE Users 
SET email = 'john_doe_new@example.com' 
WHERE user_id = 1;

-- Update the description of a portfolio
UPDATE Portfolios 
SET description = 'Updated description for short-term savings.' 
WHERE portfolio_id = 2;

-- Update the quantity of an asset in a portfolio
UPDATE Portfolio_Assets 
SET quantity = 50 
WHERE portfolio_id = 1 AND asset_id = 1;

-- Update the price of an asset
UPDATE Asset_Prices 
SET price = 150.00 
WHERE asset_id = 1 AND price_date = '2024-07-20';

-- Delete a specific transaction
DELETE FROM Transactions 
WHERE transaction_id = 1;

-- Delete a specific asset from a portfolio
DELETE FROM Portfolio_Assets 
WHERE portfolio_id = 1 AND asset_id = 2;

-- Delete a portfolio
DELETE FROM Portfolios 
WHERE portfolio_id = 2;

-- Delete a user
DELETE FROM Users 
WHERE user_id = 2;