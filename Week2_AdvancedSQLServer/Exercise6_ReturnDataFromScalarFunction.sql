USE EcommerceDB;
GO

CREATE FUNCTION fn_GetAnnualSalary
(
    @MonthlySalary DECIMAL(10, 2)
)
RETURNS DECIMAL(10, 2)
AS
BEGIN
    DECLARE @AnnualSalary DECIMAL(10, 2);
    SET @AnnualSalary = @MonthlySalary * 12;
    RETURN @AnnualSalary;
END;
GO

SELECT dbo.fn_GetAnnualSalary(5000.00) AS AnnualSalary;

SELECT
    EmpID,
    FirstName,
    LastName,
    Department,
    Salary                         AS MonthlySalary,
    dbo.fn_GetAnnualSalary(Salary) AS AnnualSalary
FROM Employees
ORDER BY AnnualSalary DESC;

SELECT
    FirstName,
    LastName,
    Department,
    dbo.fn_GetAnnualSalary(Salary) AS AnnualSalary
FROM Employees
WHERE dbo.fn_GetAnnualSalary(Salary) > 800000
ORDER BY AnnualSalary DESC;

SELECT
    name      AS FunctionName,
    type_desc AS FunctionType
FROM sys.objects
WHERE type IN ('FN', 'IF', 'TF');
