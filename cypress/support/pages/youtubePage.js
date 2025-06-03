require("cypress-xpath");

class YoutubePage {
	visiting() {
		cy.visit(Cypress.env("YOUTUBE_URL"));
	}

	clickTrending() {
		cy.get('#start #guide-button').click();
    	cy.get('[title="Trending"]').click({ force: true });
		cy.url().should("include", "feed/trending");
	}

	clickMovies() {
		cy.get('[tab-title="Movies"]').click({ force: true });
	}

	getVideo(index) {
		return cy.get("ytd-video-renderer").eq(index);
	}

	getTitle(videoName) {
		return cy.get(videoName).find("#video-title");
	}

	getChannel(videoChannel) {
		return cy.get(videoChannel).find("#channel-name").find('a').last();
	}

	clickVideo(index) {
		return cy.get("ytd-video-renderer").eq(index)
			.find("#video-title").click();
	}

	verifyTitle() {
		return cy.get("h1.title");
	}

	verifyChannel() {
		return cy.get("#channel-name").find('a');
	}
}

export default new YoutubePage();