namespace MoqHandson
{
    public interface IEmployeeRepository
    {
        string GetEmployeeNameById(int id);
        void SaveEmployee(int id, string name);
    }
}
