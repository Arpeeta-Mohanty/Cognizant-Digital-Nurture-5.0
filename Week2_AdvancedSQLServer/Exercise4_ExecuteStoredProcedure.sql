USE EcommerceDB;
GO

EXEC usp_ManageEmployee
    @Action     = 'INSERT',
    @EmpID      = 12,
    @FirstName  = 'Mark',
    @LastName   = 'Lee',
    @Department = 'Marketing',
    @Salary     = 63000,
    @Email      = 'mark@company.com';

EXEC usp_ManageEmployee
    @Action     = 'INSERT',
    @EmpID      = 13,
    @FirstName  = 'Nina',
    @LastName   = 'Clark',
    @Department = 'Finance',
    @Salary     = 71000,
    @Email      = 'nina@company.com';

EXEC usp_ManageEmployee
    @Action     = 'INSERT',
    @EmpID      = 14,
    @FirstName  = 'Oscar',
    @LastName   = 'Hall',
    @Department = 'HR',
    @Salary     = 49000,
    @Email      = 'oscar@company.com';

EXEC usp_ManageEmployee @Action = 'SELECT', @EmpID = 12;

EXEC usp_ManageEmployee @Action = 'SELECT', @EmpID = 13;

EXEC usp_ManageEmployee @Action = 'SELECT', @EmpID = 14;

EXEC usp_ManageEmployee @Action = 'SELECT', @EmpID = 99;

EXEC usp_ManageEmployee @Action = 'DELETE', @EmpID = 12;

SELECT * FROM Employees ORDER BY EmpID;
