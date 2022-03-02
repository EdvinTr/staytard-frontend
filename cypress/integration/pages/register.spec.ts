/// <reference types="Cypress" />
import { APP_PAGE_ROUTE } from "../../../src/constants";
import { Localized } from "../../../src/Localized";

const cypressIds = {
  emailInput: "email-input",
  emailInputError: "email-error-message",
  passwordInput: "password-input",
  passwordInputError: "password-error-message",
  firstNameInput: "first-name-input",
  firstNameError: "first-name-error-message",
  lastNameInput: "last-name-input",
  lastNameError: "last-name-error-message",
  addressInput: "address-input",
  addressError: "address-error-message",
  zipCodeInput: "zip-code-input",
  zipCodeError: "zip-code-error-message",
  cityInput: "city-input",
  cityError: "city-error-message",
  phoneErrorMessage: "cell-phone-error-message",
  phoneNumberInput: "phone-number-input",
  submitButton: "submit-button",
};
const {
  inputContainsNumberErrorMessage,
  addressValidationErrorMessage,
  zipCodeValidationErrorMessage,
} = Localized.page.register;
describe("RegisterPage", () => {
  it("should display form errors when inputs do not pass validation", () => {
    cy.visit(APP_PAGE_ROUTE.REGISTER);
    cy.get('[data-cy="cookie-consent-accept-button"]').click();

    // email input
    cy.get(`[data-cy=${cypressIds.emailInputError}]`).should("not.exist");
    cy.get(`[data-cy=${cypressIds.emailInput}]`).type("!@").blur();
    cy.get(`[data-cy=${cypressIds.emailInputError}]`).should("exist");

    // password input
    cy.get(`[data-cy=${cypressIds.passwordInputError}]`).should("not.exist");
    cy.get(`[data-cy=${cypressIds.passwordInput}]`).type("x23").blur();
    cy.get(`[data-cy=${cypressIds.passwordInputError}]`).should("exist");

    // first name input
    cy.get(`[data-cy=${cypressIds.firstNameError}]`).should("not.exist");
    cy.get(`[data-cy=${cypressIds.firstNameInput}]`).clear().type("123").blur();
    cy.get(`[data-cy=${cypressIds.firstNameError}]`)
      .should("exist")
      .and("contain", inputContainsNumberErrorMessage);

    // last name input
    cy.get(`[data-cy=${cypressIds.lastNameError}]`).should("not.exist");
    cy.get(`[data-cy=${cypressIds.lastNameInput}]`).clear().type("123").blur();
    cy.get(`[data-cy=${cypressIds.lastNameError}]`).should("exist");

    // address input
    cy.get(`[data-cy=${cypressIds.addressError}]`).should("not.exist");
    cy.get(`[data-cy=${cypressIds.addressInput}]`).clear().type("!!@").blur();
    cy.get(`[data-cy=${cypressIds.addressError}]`)
      .should("exist")
      .and("contain", addressValidationErrorMessage);

    // zip code input
    cy.get(`[data-cy=${cypressIds.zipCodeError}]`).should("not.exist");
    cy.get(`[data-cy=${cypressIds.zipCodeInput}]`).clear().type("123").blur();
    cy.get(`[data-cy=${cypressIds.zipCodeError}]`)
      .should("exist")
      .and("contain", zipCodeValidationErrorMessage);

    // city input
    cy.get(`[data-cy=${cypressIds.cityError}]`).should("not.exist");
    cy.get(`[data-cy=${cypressIds.cityInput}]`).clear().type("!@").blur();
    cy.get(`[data-cy=${cypressIds.cityError}]`).should("exist");

    // cell phone input
    cy.get(`[data-cy=${cypressIds.phoneErrorMessage}]`).should("not.exist");
    cy.get(`[data-cy=${cypressIds.phoneNumberInput}]`)
      .clear()
      .type("123")
      .blur();
    cy.get(`[data-cy=${cypressIds.phoneErrorMessage}]`).should("exist");
  });
  it("should not submit form when inputs have errors", () => {
    cy.get(`[data-cy=${cypressIds.submitButton}]`).click();
  });
});
export {};
