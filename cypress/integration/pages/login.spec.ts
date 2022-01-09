/// <reference types="Cypress" />

import { APP_PAGE_ROUTE } from "../../../src/constants";
import { Localized } from "../../../src/Localized";

const { passwordInputErrorMessage, emailInputErrorMessage } =
  Localized.page.login;

const cypressIds = {
  emailInputErrorText: "email-input-error-text",
  passwordInputError: "password-input-error-text",
};
describe("LoginPage", () => {
  beforeEach(() => {
    cy.visit(APP_PAGE_ROUTE.LOGIN);
  });
  describe("when invoking blur on inputs", () => {
    describe("and email is not valid", () => {
      it("should display an error message", () => {
        cy.get("input[type=email]").type("invalidEmail").blur();
        cy.get(`[data-cy=${cypressIds.emailInputErrorText}]`).should(
          "contain",
          emailInputErrorMessage
        );
      });
    });
    describe("and email is valid", () => {
      it("should not display an error message", () => {
        cy.get("input[type=email]").type("some.guy@gmail.com").blur();
        cy.get(`[data-cy=${cypressIds.emailInputErrorText}]`).should(
          "not.exist"
        );
      });
    });
    describe("and password is empty", () => {
      it("should display an error message", () => {
        cy.get("input[type=password]").focus().blur();
        cy.get(`[data-cy=${cypressIds.passwordInputError}]`).should(
          "contain",
          passwordInputErrorMessage
        );
      });
    });
    describe("and password is not empty", () => {
      it("should not display an error message", () => {
        cy.get("input[type=password]").type("hello").blur();
        cy.get(`[data-cy=${cypressIds.passwordInputError}]`).should(
          "not.exist"
        );
      });
    });
  });

  describe("when submitting the form", () => {
    beforeEach(() => {
      cy.get("input[type=email]").type(
        "01a32413-481b-4cd3-81b2-6ae61703c8bb@gmail.com"
      );
      cy.get("input[type=password]").type(
        "5d60f7cb-1fd2-4b5d-abcd-40c12538815d"
      );
    });
    it("should show a loading spinner", () => {
      cy.get("button[type=submit]").click();
      cy.get("[data-cy=login-button-spinner]").should("exist");
    });
    describe("and input is not valid", () => {
      it("should show an error message", () => {
        cy.get("button[type=submit]").click();
        cy.get("[data-cy=login-failed-error]").should("exist");
      });
    });
  });
});
export {};
