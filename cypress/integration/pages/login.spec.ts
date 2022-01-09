/// <reference types="Cypress" />

import { APP_PAGE_ROUTE } from "../../../src/constants";
import { Localized } from "../../../src/Localized";

const { passwordInputErrorMessage, emailInputErrorMessage } =
  Localized.page.login;

const cypressIds = {
  emailInputErrorText: "email-input-error-text",
  passwordInputError: "password-input-error-text",
  emailInput: "email-input",
  passwordInput: "password-input",
  spinner: "login-button-spinner",
};

describe("LoginPage", () => {
  it("should display error messages when inputs do not pass validation", () => {
    cy.visit(APP_PAGE_ROUTE.LOGIN);
    // email input
    cy.get(`[data-cy=${cypressIds.emailInputErrorText}]`).should("not.exist");
    cy.get(`[data-cy=${cypressIds.emailInput}]`).type("!@").blur();
    cy.get(`[data-cy=${cypressIds.emailInputErrorText}]`).should("exist");

    // password input
    cy.get(`[data-cy=${cypressIds.passwordInputError}]`).should("not.exist");
    cy.get(`[data-cy=${cypressIds.passwordInput}]`)
      .type("removeme")
      .clear()
      .blur();
    cy.get(`[data-cy=${cypressIds.passwordInputError}]`).should("exist");
  });

  it("should not display errors when input passes validation", () => {
    cy.visit(APP_PAGE_ROUTE.LOGIN);
    // email input
    cy.get(`[data-cy=${cypressIds.emailInputErrorText}]`).should("not.exist");
    cy.get(`[data-cy=${cypressIds.emailInput}]`)
      .clear()
      .type("actually.a.valid.email@gmail.com")
      .blur();
    cy.get(`[data-cy=${cypressIds.emailInputErrorText}]`).should("not.exist");

    // password input
    cy.get(`[data-cy=${cypressIds.passwordInputError}]`).should("not.exist");
    cy.get(`[data-cy=${cypressIds.passwordInput}]`)
      .clear()
      .type("password")
      .blur();
    cy.get(`[data-cy=${cypressIds.passwordInputError}]`).should("not.exist");
  });

  it("should not submit the form if inputs are valid", () => {
    cy.visit(APP_PAGE_ROUTE.LOGIN);
    cy.get(`[data-cy=${cypressIds.emailInput}]`).type("something");

    cy.get("button[type=submit]").click();
    cy.get(`[data-cy=${cypressIds.spinner}]`).should("not.exist");
  });
});

export {};
