import chapters from "../fixtures/chapters.json";

describe("Chapter", () => {
  beforeEach(() => {
    cy.intercept(Cypress.env("API"), {
      fixture: "chapters.json",
    }).as("getChapters");
  });

  it("should go to chapter from home page", () => {
    cy.visit("/");

    cy.wait("@getChapters");

    cy.get("header").find(".q-btn").click();
    cy.get("aside.q-drawer")
      .should("be.visible")
      .find(".q-list")
      .find("a[href^='/#/chapters']")
      .first()
      .click();

    cy.get("h1").should("have.text", chapters.includes.Entry[0].fields.title);
    cy.get("p")
      .find("p")
      .first()
      .should(
        "have.text",
        chapters.includes.Entry[0].fields.content.split(/\n\n/)[0]
      );
    cy.get("p")
      .find("p")
      .last()
      .should(
        "have.text",
        chapters.includes.Entry[0].fields.content.split(/\n\n/)[1]
      );

    cy.get("header").find(".q-btn").click();
    cy.get("aside.q-drawer")
      .should("be.visible")
      .find(".q-list")
      .find("a[href^='/#/chapters']")
      .first()
      .click();

    cy.get("h1").should("have.text", chapters.includes.Entry[0].fields.title);
    cy.get("p")
      .find("p")
      .first()
      .should(
        "have.text",
        chapters.includes.Entry[0].fields.content.split(/\n\n/)[0]
      );
    cy.get("p")
      .find("p")
      .last()
      .should(
        "have.text",
        chapters.includes.Entry[0].fields.content.split(/\n\n/)[1]
      );

    cy.get("aside.q-drawer")
      .should("be.visible")
      .find(".q-list")
      .find("a[href^='/#/chapters']")
      .last()
      .click();

    cy.get("h1").should(
      "have.text",
      chapters.includes.Entry[chapters.includes.Entry.length - 1].fields.title
    );
    cy.get("p")
      .find("p")
      .first()
      .should(
        "have.text",
        chapters.includes.Entry[
          chapters.includes.Entry.length - 1
        ].fields.content.split(/\n\n/)[0]
      );
    cy.get("p")
      .find("p")
      .last()
      .should(
        "have.text",
        chapters.includes.Entry[
          chapters.includes.Entry.length - 1
        ].fields.content.split(/\n\n/)[1]
      );
  });

  it("should go directly to chapter", () => {
    cy.visit(`/#/chapters/${chapters.items[0].fields.chapters[1].sys.id}`);

    cy.wait("@getChapters");

    cy.get("h1").should("have.text", chapters.includes.Entry[1].fields.title);
    cy.get("p")
      .find("p")
      .first()
      .should(
        "have.text",
        chapters.includes.Entry[1].fields.content.split(/\n\n/)[0]
      );
    cy.get("p")
      .find("p")
      .last()
      .should(
        "have.text",
        chapters.includes.Entry[1].fields.content.split(/\n\n/)[1]
      );
  });
});

export {};
