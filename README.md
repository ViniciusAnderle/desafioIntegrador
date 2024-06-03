Para iniciar a rotina de codigos do cypress, pode ser necessario atualizar o IP na pagina correspondente.

  Para fazer isso basta alterar a seguinte linha de codigo:

    describe("Dashboard Brasil - Testes de Integração", () => {
    beforeEach(() => {
        cy.visit("http://172.26.152.65:8080/index.html"); !-- ALTERE ESTA LINHA PARA FUNCIONAMENTO DA ROTINA DE TESTES
    });

  A linha 3 dos 3 arquivos de testes devem ser alteradas para o IP correspondente ao iniciar o servidor local!
