Feature: Create Group

  Scenario: Database connectivity check
    Given The test environment is set up
    When I try to connect to the test database
    Then the connection should be successful
  Scenario: Successfully create a new group
    Given I am a logged-in user
    When I create a group with title "My New Group" and description "A group for testing"
    Then the group should be created successfully
    And I should be a member of the group

  Scenario: Attempt to create a group with a duplicate title
    Given I am a logged-in user
    And I have already created a group with title "Existing Group"
    When I try to create another group with title "Existing Group"
    Then I should receive an error message "You already have a group with this title"

  Scenario: Attempt to create a group when not logged in
    Given I am not logged in
    When I try to create a group with title "Unauthorized Group"
    Then I should receive an error message "You must be logged in to create a group"