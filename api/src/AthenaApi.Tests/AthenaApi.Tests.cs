using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Net.NetworkInformation;

namespace AthenaApi.Tests
{
    [TestClass]
    public class AthenaApiTests
    {
        [TestMethod]
        [ExpectedException(typeof(System.Exception))]
        public void TestGetKeywordFailing()
        {
        }

        [TestMethod]
        public void TestGetKeyword()
        {
        }

        [TestMethod]
        [ExpectedException(typeof(PingException))]
        public void TestFailingSitePing()
        {
        }

        [TestMethod]
        public void TestPing()
        {
        }
    }
}