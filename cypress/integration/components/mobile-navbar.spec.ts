import { APP_PAGE_ROUTE } from "../../../src/constants";

const closeMenuButtonTestId = "mobile-menu-close-button";
const openMenuButtonTestId = "mobile-navbar-open-button";
describe("MobileNavbar", () => {
  before(() => {
    cy.viewport("iphone-6");
    cy.visit(APP_PAGE_ROUTE.INDEX);
    cy.get('[data-cy="cookie-consent-accept-button"]').click();
  });
  it("should open menu and close menu", () => {
    cy.get(`[data-cy="${openMenuButtonTestId}"]`).click();
    cy.get(`[data-cy="${closeMenuButtonTestId}"]`).click();
  });
  it("should have href links", () => {
    cy.get(`[data-cy="${openMenuButtonTestId}"]`).click();
    cy.get('[data-cy="mobile-menu-disclosure-button"]').click({
      multiple: true,
    });
    cy.get('[data-cy="mobile-menu-disclosure-link"]').each(
      (item, index, list) => {
        expect(item).to.have.attr("href");
      }
    );
  });
});
