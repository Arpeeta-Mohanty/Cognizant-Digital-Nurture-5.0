using Moq;
using NUnit.Framework;

namespace MoqHandson
{
    [TestFixture]
    public class EmployeeServiceTests
    {
        private Mock<IEmployeeRepository> _mockRepo;
        private EmployeeService _service;

        [SetUp]
        public void SetUp()
        {
            _mockRepo = new Mock<IEmployeeRepository>();
            _service = new EmployeeService(_mockRepo.Object);
        }

        [TearDown]
        public void TearDown()
        {
            _mockRepo = null;
            _service = null;
        }

        [Test]
        public void GetEmployeeName_ValidId_ReturnsName()
        {
            _mockRepo.Setup(r => r.GetEmployeeNameById(1)).Returns("Alice");

            string result = _service.GetEmployeeName(1);

            Assert.AreEqual("Alice", result);
            _mockRepo.Verify(r => r.GetEmployeeNameById(1), Times.Once);
        }

        [Test]
        public void AddEmployee_ValidData_CallsSaveEmployee()
        {
            _service.AddEmployee(2, "Bob");

            _mockRepo.Verify(r => r.SaveEmployee(2, "Bob"), Times.Once);
        }
    }
}
