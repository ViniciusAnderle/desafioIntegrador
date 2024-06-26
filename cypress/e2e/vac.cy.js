describe('Vacinação COVID-19 Dashboard', () => {
    beforeEach(() => {
        cy.visit('http://172.26.152.65:8080/view/dashboard_vacinas/vac.html');
    });

    it('Deve alternar entre modo claro e escuro', () => {
        cy.get('body').should('not.have.class', 'dark-mode');
        cy.get('#toggleDarkMode').click();
        cy.get('body').should('have.class', 'dark-mode');
        cy.get('#toggleDarkMode').click();
        cy.get('body').should('not.have.class', 'dark-mode');
        cy.wait(5000);

    });

    it('Deve exibir a última atualização da API', () => {
        cy.get('#updatedTimestamp').should('not.be.empty');
        cy.wait(5000);

    });

    it('Deve exibir os dados de vacinação do Brasil', () => {
        cy.get('#brazilChart').should('exist');
        cy.wait(5000);

    });

    it('Deve exibir os dados de vacinação globais', () => {
        cy.get('#globalChart').should('exist');
        cy.wait(5000);

    });
    it(`DADO que a aplicação é iniciada
        E a busca por todos os dados é realizada
        DEVE informar a última vez que a API foi atualizada`, () => {
        cy.intercept("https://disease.sh/v3/covid-19/all", {
            fixture: "all_data.json",
        }).as("getAllData");

        cy.reload();

        cy.wait("@getAllData").then(({ response }) => {
            const formattedTimestamp = new Date(response.body.updated).toLocaleString(
                "pt-BR"
            );
            cy.get("#updatedTimestamp").should(
                "contain",
                `Última atualização da API: ${formattedTimestamp}`
            );
        });
    });
});
