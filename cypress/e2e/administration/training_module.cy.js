import Authentication from "../../pom/authentication/Authentication.cy";
import TrainingModule from "../../pom/TrainingModule.cy";

describe("User access training module", () => {

    const authenticationObject = new Authentication();
    const trainingModuleObject = new TrainingModule();
    let baseUrl = Cypress.env('stage');

    beforeEach(() => {
        cy.intercept('POST', '/api/authentication/login').as('postAuthentication');
        authenticationObject.openApp(baseUrl);
        cy.fixture('stage_admin_login').then((user) => {
            authenticationObject.setEmail(user.email);
            authenticationObject.setPassword(user.password);
            authenticationObject.clickBtnLogin();
            cy.wait('@postAuthentication').then((req) => {
                expect(req.response.statusCode).to.eq(200);
            });
        })
    });

    it("Verify access training module", () => {
        cy.intercept('GET', '/api/trainingModule/list').as('getTrainingModule');
        trainingModuleObject.goToTrainingModule();
        cy.wait('@getTrainingModule').then((req) => {
            expect(req.response.statusCode).to.eq(200);
        });
    })

    it.only("Verify search training module", () => {
        cy.intercept('GET', '/api/trainingModule/list').as('getTrainingModule');
        trainingModuleObject.goToTrainingModule();
        cy.wait('@getTrainingModule').then((req) => {
            expect(req.response.statusCode).to.eq(200);
        });
        trainingModuleObject.searchTrainingModule("test");
    })
})