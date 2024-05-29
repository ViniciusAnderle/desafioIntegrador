describe("Dashboard Brasil - Testes de Integração", () => {
  beforeEach(() => {
    cy.visit("http://172.32.92.218:8080/view/dashboard_brasil/braza.html");
  });

  it(`teste canvas`, () => {
    cy.get("#casesChart").trigger('keydown', { keyCode: 16 })
  });

  it(`teste titulos inicialização`, () => {
    cy.get("h5.card-title").contains("Total de Casos").click();
    cy.get("h5.card-title").contains("Total Recuperados").click();
    cy.get("h5.card-title").contains("Total de Casos").click();
  });

  it(`DADO que a aplicação é iniciada
        ENTÃO o título e cards devem ser renderizados`, () => {
    cy.get("h1").should("contain", "Painel COVID-19 Brasil");
    cy.get("#totalCases").should("be.visible");
    cy.get("#totalRecovered").should("be.visible");
    cy.get("#totalDeaths").should("be.visible");
  });

  it(`DADO que a aplicação é iniciada
        E a busca de casos no Brasil é realizada
        DEVE alterar o conteúdo para locale pt-BR`, () => {
    cy.intercept("https://disease.sh/v3/covid-19/countries/Brazil", {
      fixture: "brazil_data.json",
    }).as("getBrazilData");

    cy.reload();

    cy.wait("@getBrazilData").then(({ response }) => {
      cy.get("#totalCases").should(
        "contain",
        response.body.cases.toLocaleString("pt-BR")
      );
      cy.get("#totalRecovered").should(
        "contain",
        response.body.recovered.toLocaleString("pt-BR")
      );
      cy.get("#totalDeaths").should(
        "contain",
        response.body.deaths.toLocaleString("pt-BR")
      );
    });
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

  it(`DADO que a aplicação é iniciada
        E a busca por casos do histórico do Brasil é realizada
        DEVE renderizar o gráfico de casos diários`, () => {
    cy.intercept(
      "https://disease.sh/v3/covid-19/historical/Brazil?lastdays=all",
      {
        fixture: "historical_brazil.json",
      }
    ).as("getHistoricalData");

    cy.reload();

    cy.wait("@getHistoricalData");

    cy.get("#dailyCasesChart").should("be.visible");
  });

  it(`DADO que a aplicação é iniciada
        E o botão de ativar Modo Escuro é acionado
        DEVE ativar o dark-mode e vice-versa`, () => {
    cy.get("#toggleDarkMode").click();
    cy.get("body").should("have.class", "dark-mode");
    cy.get("#toggleDarkMode").should("contain", "Modo Claro");

    cy.get("#toggleDarkMode").click();
    cy.get("body").should("not.have.class", "dark-mode");
    cy.get("#toggleDarkMode").should("contain", "Modo Escuro");
  });

  it(`DADO que a aplicação é iniciada
        E a busca por casos do histórico do Brasil é realizada
        DEVE renderizar o gráfico de recuperados versus mortes`, () => {
    cy.intercept(
      "https://disease.sh/v3/covid-19/historical/Brazil?lastdays=all",
      {
        fixture: "historical_brazil.json",
      }
    ).as("getHistoricalData");

    cy.reload();

    cy.wait("@getHistoricalData");

    cy.get("#recoveredVsDeathsChart").should("be.visible");
  });

  it(`DADO que a aplicação é iniciada
        E o botão "Dashboard de Casos" na barra de navegação é clicado
        DEVE navegar para a página de Dashboard de casos (Dashboard Inicial)`, () => {
    cy.get(".nav-dashboard_inicial").click();

    cy.url().should("include", "/dashboard_inicial.html");
    cy.get("h1").should("contain", "Painel COVID-19");
  });


});