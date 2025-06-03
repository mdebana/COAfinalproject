require("cypress-xpath");
import AmazonPage from "../support/pages/amazonPage";

describe("Amazon Web Test", function () {

  it("Verifying the most right item on Amazon", function () {
    let expectedName, expectedPrice, resultName, resultPrice;

    cy.viewport(1920, 1080)
    AmazonPage.visiting();

    cy.wait(1000);
    AmazonPage.searching();

    cy.wait(1000);
    AmazonPage.sortingHighLow();

    cy.wait(1000);
    AmazonPage.getSearch().as('selected');
    AmazonPage.getName("@selected")
        .invoke("text")
        .then((text) => {
            expectedName = text;
            cy.log("Captured name:", expectedName);
        });
    AmazonPage.getPrice("@selected")
          .invoke("text")
          .then((text) => {
            expectedPrice = text;
            cy.log("Captured price:", expectedPrice);
          });
    AmazonPage.clickItem();

    AmazonPage.verifyName()
        .invoke("text")
        .then((text) => {
          resultName = text.replace('kr', '').replace('\u00A0','').trim();
          cy.log("Captured name:", resultName);
          expect(expectedName).to.eq(resultName);
        });
    AmazonPage.verifyPrice()
        .invoke("text")
        .then((text) => {
          resultPrice = text;
          cy.log("Captured price:", resultPrice);
          expect(expectedPrice).to.eq(resultPrice);
        });
  });
});