
Feature: Ecommerce validations
  @Validation
  Scenario: Placing the Order
    Given a login to Ecommerce application with "Tusharpatil1@gmail.com" and "Niks@1234"
    When Add "zara coat 3" to cart
    Then Verify "zara coat 3" is displayed in the cart
    When Enter valid details and Place the Order
    Then Verify order in present in the OrderHistory

  @Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed for invalid login

    Examples:
      | username               | password     |
      | Tusharpatil1@gmail.com | Niks@1234    |
      | hello@123.com          | Iamhello@123 |