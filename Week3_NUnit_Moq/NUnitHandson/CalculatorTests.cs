using NUnit.Framework;

namespace NUnitHandson
{
    [TestFixture]
    public class CalculatorTests
    {
        private Calculator _calculator;

        [SetUp]
        public void SetUp()
        {
            _calculator = new Calculator();
        }

        [TearDown]
        public void TearDown()
        {
            _calculator = null;
        }

        [Test]
        public void Add_TwoNumbers_ReturnsSum()
        {
            int result = _calculator.Add(3, 4);
            Assert.AreEqual(7, result);
        }

        [Test]
        public void Subtract_TwoNumbers_ReturnsDifference()
        {
            int result = _calculator.Subtract(10, 4);
            Assert.AreEqual(6, result);
        }

        [Test]
        public void Multiply_TwoNumbers_ReturnsProduct()
        {
            int result = _calculator.Multiply(3, 5);
            Assert.AreEqual(15, result);
        }

        [Test]
        public void Divide_TwoNumbers_ReturnsQuotient()
        {
            double result = _calculator.Divide(10, 2);
            Assert.AreEqual(5.0, result);
        }

        [Test]
        public void Divide_ByZero_ThrowsDivideByZeroException()
        {
            Assert.Throws<DivideByZeroException>(() => _calculator.Divide(10, 0));
        }
    }
}
