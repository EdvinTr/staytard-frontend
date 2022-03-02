import { APP_PAGE_ROUTE } from "../../../src/constants";

describe("MobileNavbar", () => {
  it("should have navigable links", () => {
    cy.viewport("iphone-6");
    cy.visit(APP_PAGE_ROUTE.INDEX, {});
    // email input
    cy.get('[data-cy="mobile-navbar-open-button"]').click();
  });
});
