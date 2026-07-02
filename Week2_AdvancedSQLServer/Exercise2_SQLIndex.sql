USE EcommerceDB;
GO

CREATE TABLE Employees (
    EmpID      INT PRIMARY KEY,
    FirstName  VARCHAR(50),
    LastName   VARCHAR(50),
    Department VARCHAR(50),
    Salary     DECIMAL(10, 2),
    Email      VARCHAR(100)
);

INSERT INTO Employees VALUES
(1,  'Alice', 'Smith',    'HR',        55000, 'alice@company.com'),
(2,  'Bob',   'Johnson',  'IT',        72000, 'bob@company.com'),
(3,  'Carol', 'Williams', 'Finance',   68000, 'carol@company.com'),
(4,  'David', 'Brown',    'IT',        80000, 'david@company.com'),
(5,  'Eva',   'Jones',    'HR',        52000, 'eva@company.com'),
(6,  'Frank', 'Garcia',   'Marketing', 61000, 'frank@company.com'),
(7,  'Grace', 'Martinez', 'Finance',   74000, 'grace@company.com'),
(8,  'Henry', 'Davis',    'IT',        90000, 'henry@company.com'),
(9,  'Irene', 'Wilson',   'Marketing', 58000, 'irene@company.com'),
(10, 'Jack',  'Taylor',   'HR',        53000, 'jack@company.com');

SELECT
    name      AS IndexName,
    type_desc AS IndexType
FROM sys.indexes
WHERE object_id = OBJECT_ID('Employees');

CREATE NONCLUSTERED INDEX IX_Employees_Department
ON Employees (Department);

SELECT EmpID, FirstName, LastName, Salary
FROM Employees
WHERE Department = 'IT';

CREATE NONCLUSTERED INDEX IX_Employees_LastName
ON Employees (LastName);

SELECT EmpID, FirstName, LastName, Department
FROM Employees
WHERE LastName = 'Davis';

CREATE NONCLUSTERED INDEX IX_Employees_Dept_Salary
ON Employees (Department, Salary);

SELECT FirstName, LastName, Department, Salary
FROM Employees
WHERE Department = 'Finance' AND Salary > 65000;

CREATE UNIQUE INDEX IX_Employees_Email
ON Employees (Email);

DROP INDEX IX_Employees_LastName ON Employees;

SELECT
    i.name      AS IndexName,
    i.type_desc AS IndexType,
    c.name      AS ColumnName
FROM sys.indexes i
JOIN sys.index_columns ic ON i.object_id = ic.object_id AND i.index_id = ic.index_id
JOIN sys.columns c        ON ic.object_id = c.object_id AND ic.column_id = c.column_id
WHERE i.object_id = OBJECT_ID('Employees')
ORDER BY i.name;
