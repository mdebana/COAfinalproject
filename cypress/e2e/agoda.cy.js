require("cypress-xpath");
import AgodaPage from "../support/pages/agodaPage";

describe("Agoda Web Test", function () {

  it("Verifying flight details in Agoda", function () {
    const passenger = {
			firstName: Cypress.env("firstName"),
			lastName: Cypress.env("lastName"),
			email: Cypress.env("email"),
			phone: Cypress.env("phone"),
            passport: Cypress.env("passport")
		};
    
    let expectDepTime, 
        expectArrTime, 
        expectPrice,
        resultContactName,
        resultContactEmail,
		resultContactPhone,
        resultPassportName,
        resultDate,
        resultTotalPrice
        ;

    cy.viewport(1920, 1080)
    AgodaPage.visiting();

    cy.wait(1000);
    AgodaPage.clickFlight();

    cy.wait(1000);
    AgodaPage.fillDeparture(Cypress.env("departure"));
    AgodaPage.fillDestination(Cypress.env("arrival"));
    AgodaPage.fillDate();
    AgodaPage.clickSearch();

    cy.wait(1000);
    AgodaPage.chooseFlight();
    cy.get('[data-component="flight-card"]').as("selected");
    AgodaPage.getDepTime("@selected")
            .invoke("text")
            .then((text) => {
                expectDepTime = text;
                cy.log("Captured departure time:", expectDepTime);
            });
    AgodaPage.getArrTime("@selected")
            .invoke("text")
            .then((text) => {
                expectArrTime = text;
                cy.log("Captured arrival time:", expectArrTime);
            });
    AgodaPage.selectFlight();

    cy.wait(1000);
    cy.get('[data-component="mob-flight-price-breakdown-wrapper"]').as("selected");
    AgodaPage.getTotalPrice("@selected")
            .invoke("text")
            .then((text) => {
                expectPrice = text;
                cy.log("Captured total price:", expectPrice);
            });
            
    AgodaPage.clickAddons();
    AgodaPage.fillContactDetails(passenger);

    cy.wait(1000);
    //AgodaPage.clickProtection();
    AgodaPage.clickContinuePay();
    
    cy.wait(2000);
    AgodaPage.clickNoUpgrade();

    cy.wait(2000);
    cy.get('[data-component="mob-flight-contact-wrapper"]').as("selected");
    AgodaPage.verifyContactName("@selected")
            .invoke("text")
            .then((text) => {
                resultContactName = text;
                cy.log("Captured name:", resultContactName);
                expect(passenger.firstName+" "+passenger.lastName).to.eq(resultContactName);
            });
    AgodaPage.verifyContactEmail("@selected")
            .invoke("text")
            .then((text) => {
                resultContactEmail = text;
                cy.log("Captured email:", resultContactEmail);
                expect(passenger.email).to.eq(resultContactEmail);
            });
    AgodaPage.verifyContactPhone("@selected")
            .invoke("text")
            .then((text) => {
                resultContactPhone = text;
                cy.log("Captured phone:", resultContactPhone);
                expect("+62 "+passenger.phone).to.eq(resultContactPhone);
            });
    AgodaPage.verifyPassportName("@selected")
            .invoke("text")
            .then((text) => {
                resultPassportName = text;
                cy.log("Captured name:", resultPassportName);
                expect(passenger.firstName+" "+passenger.lastName).to.eq(resultPassportName);
            });

    AgodaPage.verifyDate("@selected")
            .invoke("text")
            .then((text) => {
                resultDate = text;
                cy.log("Captured date:", resultDate);
                expect(resultDate).to.contain(expectDepTime+" - "+expectArrTime);
            });

    cy.get('[data-component="mob-price-breakdown-wrapper"]').as("selected");
    AgodaPage.verifyTotalPrice("@selected")
            .invoke("text")
            .then((text) => {
                resultTotalPrice = text;
                cy.log("Captured total price:", resultTotalPrice);
                expect(expectPrice).to.eq(resultTotalPrice);
            });        
  });
});