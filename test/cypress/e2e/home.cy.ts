describe("Landing", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it(".should() - assert that <title> is correct", () => {
    cy.title().should("include", "Quasar");
    cy.get("li").first().click();
    cy.contains("Clicks on todos: 1").should("exist");
  });
});

export {};
