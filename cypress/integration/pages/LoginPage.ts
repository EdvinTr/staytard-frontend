/// <reference types="Cypress" />

import { APP_PAGE_ROUTE } from "../../../src/constants";
import { Localized } from "../../../src/Localized";

const {
  loginEmailInputErrorMessage,
  loginFailedErrorMessage,
  loginPasswordInputErrorMessage,
} = Localized.page.login;
describe("LoginPage", () => {
  beforeEach(() => {
    cy.visit(APP_PAGE_ROUTE.LOGIN);
  });
  describe("when logging in", () => {
    describe("and email is not valid", () => {
      it("should display an error message when the email is not valid", () => {
        cy.get("input[type=email]").type("invalidEmail").blur();
        cy.get("[data-cy=email-input-error]").should(
          "contain",
          loginEmailInputErrorMessage
        );
      });
    });
    describe("and email is valid", () => {
      it("should not display an error message", () => {
        cy.get("input[type=email]").type("some.guy@gmail.com").blur();
        const errorMessageElement = cy.get("[data-cy=email-input-error]");
        errorMessageElement.should("not.exist", loginEmailInputErrorMessage);
      });
    });
  });
});
export {};
