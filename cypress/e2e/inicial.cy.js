describe("Dashboard Brasil - Testes de Integração", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:8080/dashboard_inicial/dashboard_inicial.html");
    });

    it('Deve exibir a última atualização da API', () => {
        cy.get('#updatedTimestamp').should('not.be.empty');
    });

    it('Deve exibir os totais de casos, recuperados e mortes formatados', () => {
        cy.get('#totalCases').invoke('text').should('match', /\d{1,3}\.\d{3}\.\d{3}/);
        cy.get('#totalRecovered').invoke('text').should('match', /\d{1,3}\.\d{3}\.\d{3}/);
        cy.get('#totalDeaths').invoke('text').should('match', /\d{1,3}\.\d{3}\.\d{3}/);
    });
    

    it('Deve exibir os 10 países com mais casos e os 10 países com menos casos em tabelas', () => {
        cy.get('#topCases').find('tr').should('have.length', 10);
        cy.get('#leastCases').find('tr').should('have.length', 10);
    });

    it('Deve exibir gráficos de casos e mortes globais formatados', () => {
        cy.get('#casesChart', { timeout: 10000 }).should('exist');
        cy.get('#deathsChart', { timeout: 10000 }).should('exist');
    });
    

    it('Deve exibir um gráfico de barras com os 10 países com mais casos formatado', () => {
        cy.get('#topCasesChart', { timeout: 10000 }).should('exist');
    });
    

    it('Deve exibir um mapa Leaflet com marcadores para os países com casos de COVID-19', () => {
        cy.get('#map').should('exist');
    });

    it('Deve alternar entre o modo claro e escuro ao clicar no botão', () => {
        cy.get('body').should('not.have.class', 'dark-mode');
        cy.get('#toggleDarkMode').click();
        cy.get('body').should('have.class', 'dark-mode');
        cy.get('#toggleDarkMode').click();
        cy.get('body').should('not.have.class', 'dark-mode');
    });

});