require("cypress-xpath");
import YoutubePage from "../support/pages/youtubePage";

describe("Youtube Web Test", function () {

  it("Verifying trending video number 3 on Youtube", function () {
    let expectedTitle, expectedChannel, resultTitle, resultChannel;
    YoutubePage.visiting();
    
    cy.wait(1000);
    YoutubePage.clickTrending();

    cy.wait(1000);
    YoutubePage.clickMovies();

    cy.wait(2000);
    YoutubePage.getVideo(2).as("selected");
    YoutubePage.getTitle("@selected")
            .invoke("text")
            .then((text) => {
                expectedTitle = text.replace('kr', '').replace('\u00A0','').trim();
                cy.log("Captured title:", expectedTitle);
            });
    YoutubePage.getChannel("@selected")
            .invoke("text")
            .then((text) => {
                expectedChannel = text;
                cy.log("Captured channel:", expectedChannel);
            });
    YoutubePage.clickVideo(2);

    cy.wait(2000);
    cy.get('ytd-watch-metadata').as("selected");
    YoutubePage.verifyTitle("@selected")
            .invoke("text")
            .then((text) => {
                resultTitle = text.replace('kr', '').replace('\u00A0','').trim();
                cy.log("Captured title:", resultTitle);
                expect(expectedTitle).to.eq(resultTitle);
            });
    YoutubePage.verifyChannel("@selected")
            .invoke("text")
            .then((text) => {
                resultChannel = text;
                cy.log("Captured channel:", resultChannel);
                expect(expectedChannel).to.eq(resultChannel);
            });
  });
});