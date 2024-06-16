import chapters from "../fixtures/chapters.json";

describe("Home", () => {
  it("should assert that titles are correct", () => {
    cy.visit("/");

    cy.title().should("include", "Sóng to mặc sóng, đường xa kệ đường");
    cy.get("h2").should("exist").should("have.text", "Dương Lê Hoài Phong");
  });

  it("should show drawer", () => {
    cy.visit("/");

    cy.get(".q-btn").click();
    cy.get("aside.q-drawer").should("be.visible").contains("Trang chủ");
  });

  it("should fetch data successfully", () => {
    cy.intercept(Cypress.env("API"), { fixture: "chapters.json" }).as(
      "getChapters"
    );

    cy.visit("/");

    cy.wait("@getChapters");

    cy.get(".q-btn").click();
    cy.get("aside.q-drawer")
      .should("be.visible")
      .find(".q-list")
      .find("a[href^='/#/chapters']")
      .should("have.length", chapters.items[0].fields.chapters.length);

    cy.get("aside.q-drawer")
      .find("a[href^='/#/chapters']")
      .each((chapterEl, index) => {
        expect(chapterEl.attr("href")).equal(
          `/#/chapters/${chapters.includes.Entry[index].sys.id}`
        );
        expect(chapterEl.find(".q-item__label").text()).equal(
          chapters.includes.Entry[index].fields.title
        );
      });
  });

  it("should show confirm dialog when fetching data occurs error", () => {
    cy.intercept(Cypress.env("API"), {
      fixture: "chapters.json",
      statusCode: 400,
    }).as("getChapters");

    cy.visit("/");

    cy.wait("@getChapters");

    cy.intercept(Cypress.env("API"), {
      fixture: "chapters.json",
    }).as("getChapters");

    cy.get(".q-card")
      .should("be.visible")
      .should("contain", "Có lỗi rồi!!!")
      .find("button")
      .last()
      .click();

    cy.wait("@getChapters");

    cy.get("header").find(".q-btn").click();
    cy.get("aside.q-drawer")
      .should("be.visible")
      .find(".q-list")
      .find("a[href^='/#/chapters']")
      .should("have.length", chapters.items[0].fields.chapters.length);

    cy.get("aside.q-drawer")
      .find("a[href^='/#/chapters']")
      .each((chapterEl, index) => {
        expect(chapterEl.attr("href")).equal(
          `/#/chapters/${chapters.includes.Entry[index].sys.id}`
        );
        expect(chapterEl.find(".q-item__label").text()).equal(
          chapters.includes.Entry[index].fields.title
        );
      });
  });
});

export {};
