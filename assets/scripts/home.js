async function getLastUpdatedTimestamp() {
    const response = await fetch('https://disease.sh/v3/covid-19/all');
    const data = await response.json();
    return data.updated;
}

document.getElementById('toggleDarkMode').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('dark-mode');
    navbar.classList.toggle('navbar-light');
    navbar.classList.toggle('bg-light');
    
    const container = document.querySelector('.container');
    if (container) {
        container.classList.toggle('dark-mode');
    }
    
    const footer = document.querySelector('footer');
    if (footer) {
        footer.classList.toggle('dark-mode');
    }

    const cardBodies = document.querySelectorAll('.card-body');
    cardBodies.forEach(function(cardBody) {
        cardBody.classList.toggle('dark-mode');
    });

    const tables = document.querySelectorAll('.table');
    tables.forEach(function(table) {
        table.classList.toggle('dark-mode');
    });
    
    const button = document.getElementById('toggleDarkMode');
    if (document.body.classList.contains('dark-mode')) {
        button.textContent = 'Modo Claro';
    } else {
        button.textContent = 'Modo Escuro';
    }
});
      