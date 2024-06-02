describe("Dashboard Brasil - Testes de Integração", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:8080/index.html");
    });

    it('Deve exibir a última atualização da API', () => {
        cy.get('#updatedTimestamp').should('not.be.empty');
        cy.wait(5000);

    });

    it('Deve exibir os totais de casos, recuperados e mortes formatados', () => {
        cy.get('#totalCases').invoke('text').should('match', /\d{1,3}\.\d{3}\.\d{3}/);
        cy.get('#totalRecovered').invoke('text').should('match', /\d{1,3}\.\d{3}\.\d{3}/);
        cy.get('#totalDeaths').invoke('text').should('match', /\d{1,3}\.\d{3}\.\d{3}/);
        cy.wait(5000);

    });


    it('Deve exibir os 10 países com mais casos e os 10 países com menos casos em tabelas', () => {
        cy.get('#topCases').find('tr').should('have.length', 10);
        cy.get('#leastCases').find('tr').should('have.length', 10);
        cy.wait(5000);

    });

    it('Deve exibir gráficos de casos e mortes globais formatados', () => {
        cy.get('#casesChart', { timeout: 10000 }).should('exist');
        cy.get('#deathsChart', { timeout: 10000 }).should('exist');
        cy.wait(5000);

    });


    it('Deve exibir um gráfico de barras com os 10 países com mais casos formatado', () => {
        cy.get('#topCasesChart', { timeout: 10000 }).should('exist');
        cy.wait(5000);

    });


    it('Deve exibir um mapa Leaflet com marcadores para os países com casos de COVID-19', () => {
        cy.get('#map').should('exist');
        cy.wait(5000);

    });

    it('Deve alternar entre o modo claro e escuro ao clicar no botão', () => {
        cy.get('body').should('not.have.class', 'dark-mode');
        cy.wait(5000);
        cy.get('#toggleDarkMode').click();
        cy.wait(5000);
        cy.get('body').should('have.class', 'dark-mode');
        cy.wait(5000);
        cy.get('#toggleDarkMode').click();
        cy.wait(5000);
        cy.get('body').should('not.have.class', 'dark-mode');
    });
    it('Deve exibir polígonos no mapa com dados de COVID-19 para diferentes países', () => {
        // Verificar se o mapa existe
        cy.get('#map').should('exist');

        // Aguardar o carregamento dos dados no mapa (ajustar o tempo conforme necessário)
        cy.wait(5000);

        // Verificar se existem elementos de polígono no mapa
        cy.get('.leaflet-interactive').should('have.length.greaterThan', 0);
    });

    it('Deve exibir corretamente as informações ao clicar nos polígonos do mapa', () => {
        // Verificar se o mapa existe
        cy.get('#map').should('exist');

        // Aguardar o carregamento dos dados no mapa (ajustar o tempo conforme necessário)
        cy.wait(5000);

        // Verificar se existem elementos de polígono no mapa
        cy.get('.leaflet-interactive').should('have.length.greaterThan', 0);

        // Simular um clique em um dos polígonos
        cy.get('.leaflet-interactive').first().click();

        // Verificar se a popup com informações aparece
        cy.get('.leaflet-popup-content').should('exist');
        cy.get('.leaflet-popup-content').should('contain.text', 'Casos:');
    });

});

