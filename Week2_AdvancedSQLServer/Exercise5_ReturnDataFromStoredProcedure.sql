USE EcommerceDB;
GO

CREATE PROCEDURE usp_GetEmployeesByDepartment
    @Department VARCHAR(50)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Employees WHERE Department = @Department)
    BEGIN
        PRINT 'No employees found in department: ' + @Department;
        RETURN;
    END

    SELECT
        EmpID,
        FirstName,
        LastName,
        Department,
        Salary,
        Email
    FROM Employees
    WHERE Department = @Department
    ORDER BY LastName;
END;
GO

EXEC usp_GetEmployeesByDepartment @Department = 'IT';

EXEC usp_GetEmployeesByDepartment @Department = 'HR';

EXEC usp_GetEmployeesByDepartment @Department = 'Finance';

EXEC usp_GetEmployeesByDepartment @Department = 'Legal';
