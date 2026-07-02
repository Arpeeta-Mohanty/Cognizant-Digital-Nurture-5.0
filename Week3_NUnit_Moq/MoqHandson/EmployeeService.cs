namespace MoqHandson
{
    public class EmployeeService
    {
        private readonly IEmployeeRepository _repository;

        public EmployeeService(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public string GetEmployeeName(int id)
        {
            return _repository.GetEmployeeNameById(id);
        }

        public void AddEmployee(int id, string name)
        {
            _repository.SaveEmployee(id, name);
        }
    }
}
