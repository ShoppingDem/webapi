const { connectToDatabase, disconnectDatabase } = require('../setup/testSetup');
const { defineFeature, loadFeature } = require('jest-cucumber');
const mongoose = require('mongoose');

const feature = loadFeature('./test/features/createGroup.feature');

defineFeature(feature, test => {
  let error, context;

  beforeAll(async () => {
    await disconnectDatabase(); // Ensure we start with a clean slate
  });

  test('Database connectivity check', ({ given, when, then }) => {
    given('The test environment is set up', () => {
      // No action needed here
    });

    when('I try to connect to the test database', async () => {
      try {
        await connectToDatabase();
      } catch (err) {
        error = err;
      }
    });

    then('the connection should be successful', () => {
      expect(error).toBeUndefined();
      expect(mongoose.connection.readyState).toBe(1); // 1 means connected
    });
  });

  test('Successfully create a new group', ({ given, when, then, and }) => {
    given('I am a logged-in user', () => {
      context = { user: { id: 'test-user-id' } };
    });

    when(/^I create a group with title "(.*)" and description "(.*)"$/, async (title, description) => {
      // Implement the group creation logic here
    });

    then('the group should be created successfully', () => {
      // Verify that the group was created
    });

    and('I should be a member of the group', () => {
      // Verify that the user is a member of the group
    });
  });

  test('Attempt to create a group with a duplicate title', ({ given, and, when, then }) => {
    given('I am a logged-in user', () => {
      context = { user: { id: 'test-user-id' } };
    });

    and(/^I have already created a group with title "(.*)"$/, async (title) => {
      // Create a group with the given title
    });

    when(/^I try to create another group with title "(.*)"$/, async (title) => {
      // Attempt to create another group with the same title
    });

    then(/^I should receive an error message "(.*)"$/, (errorMessage) => {
      // Verify that the correct error message is received
    });
  });

  test('Attempt to create a group when not logged in', ({ given, when, then }) => {
    given('I am not logged in', () => {
      context = { user: null };
    });

    when(/^I try to create a group with title "(.*)"$/, async (title) => {
      // Attempt to create a group without being logged in
    });

    then(/^I should receive an error message "(.*)"$/, (errorMessage) => {
      // Verify that the correct error message is received
    });
  });

  afterAll(async () => {
    await disconnectDatabase();
  });
});
