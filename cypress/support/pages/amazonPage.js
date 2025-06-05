require("cypress-xpath");

class AmazonPage {
	visiting() {
		cy.visit(Cypress.env("AMAZON_URL"));
	}

	searching() {
		cy.get("#twotabsearchtextbox").clear().type(Cypress.env("amazonSearch"));
    	cy.get("#nav-search-submit-text").click();
		cy.url().should("include", "s?k=");
	}

	sortingHighLow() {
		cy.get("#a-autoid-0-announce").click();
		cy.get("#s-result-sort-select_2").click();
	}

	getSearch() {
		return cy.get('[data-cel-widget="search_result_6"]');
	}

	getName(itemName) {
		return cy.get(itemName).find("h2 a span, h2 span, h2").first();
	}

	getPrice(itemPrice) {
		return cy.get(itemPrice).find('[class="a-price-whole"]').first();
	}

	clickItem() {
		cy.get('[data-cel-widget="search_result_6"]')
			.find('[data-cy="title-recipe"]').click();
	}

	verifyName(productName) {
		return cy.get("h1 span");
	}

	verifyPrice(productPrice) {
		return cy.get(".a-price .a-price-whole").first();
	}
}

export default new AmazonPage();