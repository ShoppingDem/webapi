const { defineFeature, loadFeature } = require('jest-cucumber');
const { setupTestData, getMockModels } = require('../setup/testSetup');
const { createGroup } = require('../../src/resolvers/mutations/createGroup');
const mongoose = require('mongoose');

const feature = loadFeature('./test/features/createGroup.feature');

defineFeature(feature, test => {
  let context, error, mockModels;

  beforeEach(async () => {
    await setupTestData();
    mockModels = getMockModels();
    context = { models: mockModels };
  });

  test('Database connectivity check', ({ given, when, then }) => {
    given('The test environment is set up', () => {
      // This step is handled by the beforeEach hook
    });

    when('I try to connect to the test database', () => {
      // Connection is already established in setupTestData
    });

    then('the connection should be successful', () => {
      expect(mongoose.connection.readyState).toBe(1);
    });
  });

  test('Successfully create a new group', ({ given, when, then, and }) => {
    given('I am a logged-in user', () => {
      context.user = { id: new mongoose.Types.ObjectId() };
    });

    when(/^I create a group with title "(.*)" and description "(.*)"$/, async (title, description) => {
      try {
        await createGroup(null, { title, description }, context);
      } catch (e) {
        error = e;
      }
    });

    then('the group should be created successfully', () => {
      expect(error).toBeUndefined();
    });

    and('I should be a member of the group', async () => {
      const group = await mockModels.Group.findOne({ title: 'My New Group' });
      expect(group).toBeDefined();
      expect(group.members.map(id => id.toString())).toContain(context.user.id.toString());
    });
  });

  test('Attempt to create a group with a duplicate title', ({ given, and, when, then }) => {
    given('I am a logged-in user', () => {
      context.user = { id: mongoose.Types.ObjectId() };
    });

    and(/^I have already created a group with title "(.*)"$/, async (title) => {
      await mockModels.Group.create({ title, members: [context.user.id] });
    });

    when(/^I try to create another group with title "(.*)"$/, async (title) => {
      try {
        await createGroup(null, { title, description: 'Test description' }, context);
      } catch (e) {
        error = e;
      }
    });

    then(/^I should receive an error message "(.*)"$/, (errorMessage) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMessage);
    });
  });

  test('Attempt to create a group when not logged in', ({ given, when, then }) => {
    given('I am not logged in', () => {
      context.user = null;
    });

    when(/^I try to create a group with title "(.*)"$/, async (title) => {
      try {
        await createGroup(null, { title, description: 'Test description' }, context);
      } catch (e) {
        error = e;
      }
    });

    then(/^I should receive an error message "(.*)"$/, (errorMessage) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMessage);
    });
  });
});
