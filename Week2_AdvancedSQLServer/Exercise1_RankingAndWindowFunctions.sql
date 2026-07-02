CREATE DATABASE EcommerceDB;
GO
USE EcommerceDB;
GO

CREATE TABLE Products (
    ProductID   INT PRIMARY KEY,
    ProductName VARCHAR(50),
    Category    VARCHAR(30),
    Price       DECIMAL(10, 2)
);

INSERT INTO Products VALUES
(1,  'Gaming Laptop',      'Electronics', 1500.00),
(2,  'Wireless Mouse',     'Electronics',   25.00),
(3,  'Mechanical Keyboard','Electronics',   85.00),
(4,  'Monitor 27"',        'Electronics',  350.00),
(5,  'USB Hub',            'Electronics',   40.00),
(6,  'Running Shoes',      'Footwear',     120.00),
(7,  'Casual Sneakers',    'Footwear',      75.00),
(8,  'Leather Boots',      'Footwear',     200.00),
(9,  'Flip Flops',         'Footwear',      20.00),
(10, 'Sports Sandals',     'Footwear',      55.00),
(11, 'Desk Chair',         'Furniture',    450.00),
(12, 'Standing Desk',      'Furniture',    800.00),
(13, 'Bookshelf',          'Furniture',    150.00),
(14, 'Filing Cabinet',     'Furniture',    220.00),
(15, 'Monitor Stand',      'Furniture',     60.00);

SELECT
    ProductName,
    Category,
    Price,
    ROW_NUMBER() OVER (PARTITION BY Category ORDER BY Price DESC) AS RowNum
FROM Products;

SELECT
    ProductName,
    Category,
    Price,
    RANK() OVER (PARTITION BY Category ORDER BY Price DESC) AS RankNum
FROM Products;

SELECT
    ProductName,
    Category,
    Price,
    DENSE_RANK() OVER (PARTITION BY Category ORDER BY Price DESC) AS DenseRankNum
FROM Products;

WITH RankedProducts AS (
    SELECT
        ProductName,
        Category,
        Price,
        DENSE_RANK() OVER (PARTITION BY Category ORDER BY Price DESC) AS PriceRank
    FROM Products
)
SELECT
    ProductName,
    Category,
    Price,
    PriceRank
FROM RankedProducts
WHERE PriceRank <= 3
ORDER BY Category, PriceRank;
