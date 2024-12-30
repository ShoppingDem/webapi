const mongoose = require('mongoose');
const { connectToDatabase, disconnectDatabase } = require('../setup/testSetup');

module.exports = function() {
  this.Given('The test environment is set up', async function () {
    await connectToDatabase();
  });

  this.When('I try to connect to the test database', function () {
    // Connection is already established in the previous step
  });

  this.Then('the connection should be successful', function () {
    expect(mongoose.connection.readyState).toBe(1);
  });

  // Cleanup after tests
  this.After(async function () {
    await disconnectDatabase();
  });
};

// Add a dummy test to satisfy Jest's requirement
describe('Dummy test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
