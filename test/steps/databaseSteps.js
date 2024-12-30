const { Given, When, Then } = require('@cucumber/cucumber');
const mongoose = require('mongoose');

Given('The test environment is set up', function () {
  // This step is handled by the beforeAll hook in testSetup.js
});

When('I try to connect to the test database', async function () {
  // The connection should already be established in the beforeAll hook
  // We'll just check if it's ready here
  this.connectionState = mongoose.connection.readyState;
});

Then('the connection should be successful', function () {
  expect(this.connectionState).toBe(1); // 1 means connected
});