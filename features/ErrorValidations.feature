
Feature: Ecommerce validations
@Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed for invalid login
  
  Examples:
    | username                  | password |
    | Tusharpatil1@gmail.com    | Niks@1234 |
    | hello@123.com             | Iamhello@123 |