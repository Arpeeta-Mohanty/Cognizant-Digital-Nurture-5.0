USE EcommerceDB;
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Employees')
BEGIN
    CREATE TABLE Employees (
        EmpID      INT PRIMARY KEY,
        FirstName  VARCHAR(50),
        LastName   VARCHAR(50),
        Department VARCHAR(50),
        Salary     DECIMAL(10, 2),
        Email      VARCHAR(100)
    );

    INSERT INTO Employees VALUES
    (1, 'Alice', 'Smith',    'HR',      55000, 'alice@company.com'),
    (2, 'Bob',   'Johnson',  'IT',      72000, 'bob@company.com'),
    (3, 'Carol', 'Williams', 'Finance', 68000, 'carol@company.com');
END
GO

CREATE PROCEDURE usp_ManageEmployee
    @Action     VARCHAR(10),
    @EmpID      INT,
    @FirstName  VARCHAR(50)   = NULL,
    @LastName   VARCHAR(50)   = NULL,
    @Department VARCHAR(50)   = NULL,
    @Salary     DECIMAL(10,2) = NULL,
    @Email      VARCHAR(100)  = NULL
AS
BEGIN
    IF @Action = 'INSERT'
    BEGIN
        IF EXISTS (SELECT 1 FROM Employees WHERE EmpID = @EmpID)
        BEGIN
            PRINT 'Employee with this ID already exists.';
            RETURN;
        END

        INSERT INTO Employees (EmpID, FirstName, LastName, Department, Salary, Email)
        VALUES (@EmpID, @FirstName, @LastName, @Department, @Salary, @Email);

        PRINT 'Employee inserted successfully.';
    END
    ELSE IF @Action = 'SELECT'
    BEGIN
        SELECT EmpID, FirstName, LastName, Department, Salary, Email
        FROM Employees
        WHERE EmpID = @EmpID;
    END
    ELSE
    BEGIN
        PRINT 'Invalid action. Use INSERT or SELECT.';
    END
END;
GO

EXEC usp_ManageEmployee
    @Action     = 'INSERT',
    @EmpID      = 11,
    @FirstName  = 'Laura',
    @LastName   = 'White',
    @Department = 'IT',
    @Salary     = 76000,
    @Email      = 'laura@company.com';

EXEC usp_ManageEmployee
    @Action = 'SELECT',
    @EmpID  = 11;

EXEC usp_ManageEmployee
    @Action     = 'INSERT',
    @EmpID      = 11,
    @FirstName  = 'Laura',
    @LastName   = 'White',
    @Department = 'IT',
    @Salary     = 76000,
    @Email      = 'laura@company.com';
