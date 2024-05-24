// Função assíncrona para obter o timestamp da última atualização da API
async function getLastUpdatedTimestamp() {
    // Faz uma requisição assíncrona para a API
    const response = await fetch('https://disease.sh/v3/covid-19/all');
    // Aguarda a resposta e extrai os dados JSON
    const data = await response.json();
    // Retorna o timestamp da última atualização
    return data.updated;
}

document.getElementById('toggleDarkMode').addEventListener('click', function () {
    // Alterna a classe dark-mode no body
    document.body.classList.toggle('dark-mode');
    
    // Seleciona o navbar e alterna suas classes
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('dark-mode');
    navbar.classList.toggle('navbar-light');
    navbar.classList.toggle('bg-light');
    
    // Alterna a classe dark-mode no container, se existir
    const container = document.querySelector('.container');
    if (container) {
        container.classList.toggle('dark-mode');
    }
    
    // Alterna a classe dark-mode no footer, se existir
    const footer = document.querySelector('footer');
    if (footer) {
        footer.classList.toggle('dark-mode');
    }

    // Alterna a classe dark-mode em todas as card-body, se existir
    const cardBodies = document.querySelectorAll('.card-body');
    cardBodies.forEach(function(cardBody) {
        cardBody.classList.toggle('dark-mode');
    });

    // Alterna a classe dark-mode em todas as tabelas, se existir
    const tables = document.querySelectorAll('.table');
    tables.forEach(function(table) {
        table.classList.toggle('dark-mode');
    });
    
    // Muda o texto do botão
    const button = document.getElementById('toggleDarkMode');
    if (document.body.classList.contains('dark-mode')) {
        button.textContent = 'Modo Claro';
    } else {
        button.textContent = 'Modo Escuro';
    }
});
      