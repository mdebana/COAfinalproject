require("cypress-xpath");
const dayjs = require('dayjs')

class AgodaPage {
	visiting() {
		cy.visit(Cypress.env("AGODA_URL"));
		cy.log(dayjs().format('DD/MM/YYYY'))
	}

	clickFlight(){
		cy.get("#tab-flight-tab").click();
	}

	fillDeparture(departure) {
		cy.get("#flight-origin-search-input").clear().type(departure);
		cy.get(".AutocompleteList, .AutocompleteSearch__AutocompleteList")
			.contains(departure)
			.click();
	}

	fillDestination(destination) {
		cy.get("#flight-destination-search-input").clear().type(destination);
		cy.get(".AutocompleteList, .AutocompleteSearch__AutocompleteList")
			.contains(destination)
			.click();
	}
	
	fillDate() {
		cy.get('[data-selenium="range-picker-date"]').click();
		cy.get("[class*='DayPicker']").should("be.visible");
		
		const tomorrow = dayjs().add(1, "day").format("D");
		const month = dayjs().format("MMMM")
		cy.log(month);
		
		cy.get('[role="grid"]').then(($grid) => {
			if ($grid.find(`DayPicker-Caption-Wide:contains(${month})`)) {
				cy.wrap($grid)
					.contains(new RegExp(`^${tomorrow}$`))
					.click();
			} else {
				cy.get('[aria-label="Next Month"]').click();
				cy.get('[role="grid"]')
					.contains(new RegExp(`^${tomorrow}$`))
					.click();
			}
		});
	}

	clickSearch() {
		cy.get('[data-test="SearchButtonBox"]').click();
	}

	chooseFlight() {
		cy.contains("Show all").click();
		cy.get('[data-element-value="Malaysia Airlines"]').should("be.visible").click();
		cy.wait(1000);
		cy.get('[data-testid="flight-infinite-scroll"]')
			.children().children().first().click();
	}

	getDepTime(depTime) {
		return cy.get(depTime)
			.find('[data-testid="departure-time"]').find("h3").first();
	}

	getArrTime(arrTime) {
		return cy.get(arrTime)
			.find('[data-testid="arrival-time"]').find("h3").first();
	}

	selectFlight() {
		cy.get('[data-component="flight-card"]').first().click();
		cy.get('[data-component="flight-card-bookButton"]').click();
	}

	getTotalPrice(totalPrice){
		return cy.get(totalPrice)
			.find('[data-component="mob-flight-price-total-desc"]').children();
	}

	clickAddons() {
		cy.contains("Continue to add-ons", { timeout: 10000 }).click({ force: true });
		cy.get("form").should("exist");
	}

	fillContactDetails(passenger) {
		cy.get('[id="contact.contactFirstName"]').clear().type(passenger.firstName);
		cy.get('[id="contact.contactLastName"]').clear().type(passenger.lastName);
		cy.get('[id="contact.contactEmail"]').clear().type(passenger.email);
		cy.get('[id="contact.contactPhoneNumber"]').clear().type(passenger.phone);
		cy.get('[data-testid="0"]').children().first().click({ force: true });
		cy.get('[id="flight.forms.i0.units.i0.passengerFirstName"]').clear().type(passenger.firstName);
		cy.get('[data-element-feature="flight.forms.i0.units.i0.passengerLastName"]').clear().type(passenger.lastName);
		cy.get('[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-DateInputDataTestId"]').clear().type("1");
		cy.get('[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-MonthInputDataTestId"]').click();
		cy.get('span').contains("June").click();
		cy.get('[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-YearInputDataTestId"]').clear().type("1997");
		cy.get('[data-testid="flight.forms.i0.units.i0.passengerNationality"]').click();
		cy.get('span').contains("Indonesia").click();
		try {
			cy.get('[id="flight.forms.i0.units.i0.passportNumber"]').should("be.visible").type(passenger.passport);
			cy.get('[data-testid="flight.forms.i0.units.i0.passportCountryOfIssue"]').should("be.visible").click();
			cy.get('span').contains("Indonesia").click();
			cy.get('[data-testid="flight.forms.i0.units.i0.passportExpiryDate-DateInputDataTestId"]').should("be.visible").type("1");
			cy.get('[data-testid="flight.forms.i0.units.i0.passportExpiryDate-MonthInputDataTestId"]').should("be.visible").click();
			cy.get('span').contains("January").click();
			cy.get('[data-testid="flight.forms.i0.units.i0.passportExpiryDate-YearInputDataTestId"]').should("be.visible").type("2030");
		} catch (error) {}
		
	}

	clickProtection() {
		try {
			cy.contains("No, thanks, I’ll risk it.", { timeout: 10000 }).click();
		} catch (error) {}
	}

	clickContinuePay() {
		cy.get('[data-testid="continue-to-payment-button"]').click();
	}

	clickNoUpgrade() {
		try {
		cy.contains("button", "No, thanks", { timeout: 10000 })
			.should("be.visible")
			.click({ force: true });
		} catch (error) {}
	}

	verifyContactName() {
		return cy.get('[data-component="name-container-name"]').first();
	}

	verifyContactEmail() {
		return cy.get('[data-component="name-container-detail"]').first();
	}

	verifyContactPhone() {
		return cy.get('[data-component="name-container-detail"]').next();
	}

	verifyPassportName() {
		return cy.get('[data-component="name-container-name"]').last();
	}

	verifyDate() {
		return cy.get('[data-testid="mob-flight-slice-departuredate"]');
	}

	verifyTotalPrice() {
		return cy.get('[data-component="mob-flight-price-total-desc"]').children();
	}
}

export default new AgodaPage();