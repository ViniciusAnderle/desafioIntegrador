// vac.js

// Função para alternar entre modo claro e escuro
document.getElementById('toggleDarkMode').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.navbar').classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');
    const button = document.getElementById('toggleDarkMode');
    if (document.body.classList.contains('dark-mode')) {
        button.textContent = 'Modo Claro';
    } else {
        button.textContent = 'Modo Escuro';
    }
});

// Função assíncrona para obter o timestamp da última atualização da API
async function getLastUpdatedTimestamp() {
    const response = await fetch('https://disease.sh/v3/covid-19/all');
    const data = await response.json();
    return data.updated;
}

// Obtém o timestamp da última atualização e atualiza o rodapé da página
getLastUpdatedTimestamp()
    .then(timestamp => {
        const formattedTimestamp = new Date(timestamp).toLocaleString('pt-BR');
        document.getElementById('updatedTimestamp').textContent = `Última atualização da API: ${formattedTimestamp}`;
    })
    .catch(error => console.error('Error:', error));
    document.addEventListener('DOMContentLoaded', function () {
        // Fetch para obter os dados de vacinação do Brasil
        fetch('https://covid.ourworldindata.org/data/vaccinations/vaccinations.json')
            .then(response => response.json())
            .then(data => {
                const brazilData = data.find(countryData => countryData.country === 'Brazil');
                if (!brazilData) {
                    console.error('Dados de vacinação para o Brasil não encontrados.');
                    return;
                }
    
                const dosesAdministeredBrazil = brazilData.data.map(dayData => dayData.total_vaccinations || 0);
                const peopleVaccinatedBrazil = brazilData.data.map(dayData => dayData.people_vaccinated || 0);
                const peopleFullyVaccinatedBrazil = brazilData.data.map(dayData => dayData.people_fully_vaccinated || 0);
    
                const brazilChartCtx = document.getElementById('brazilChart').getContext('2d');
                const brazilChart = new Chart(brazilChartCtx, {
                    type: 'line',
                    data: {
                        labels: brazilData.data.map(dayData => dayData.date),
                        datasets: [{
                            label: 'Total de Doses Administradas no Brasil',
                            data: dosesAdministeredBrazil,
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }, {
                            label: 'Pessoas Vacinadas Parcialmente no Brasil',
                            data: peopleVaccinatedBrazil,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }, {
                            label: 'Pessoas Totalmente Vacinadas no Brasil',
                            data: peopleFullyVaccinatedBrazil,
                            backgroundColor: 'rgba(255, 206, 86, 0.6)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    
        // Fetch para obter os dados de vacinação globais
        fetch('https://covid.ourworldindata.org/data/vaccinations/vaccinations.json')
            .then(response => response.json())
            .then(data => {
                const globalData = data.find(countryData => countryData.country === 'World');
                if (!globalData) {
                    console.error('Dados de vacinação mundiais não encontrados.');
                    return;
                }
    
                const dosesAdministeredGlobal = globalData.data.map(dayData => dayData.total_vaccinations || 0);
                const peopleVaccinatedGlobal = globalData.data.map(dayData => dayData.people_vaccinated || 0);
                const peopleFullyVaccinatedGlobal = globalData.data.map(dayData => dayData.people_fully_vaccinated || 0);
    
                const globalChartCtx = document.getElementById('globalChart').getContext('2d');
                const globalChart = new Chart(globalChartCtx, {
                    type: 'line',
                    data: {
                        labels: globalData.data.map(dayData => dayData.date),
                        datasets: [{
                            label: 'Total de Doses Administradas no Mundo',
                            data: dosesAdministeredGlobal,
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }, {
                            label: 'Pessoas Vacinadas Parcialmente no Mundo',
                            data: peopleVaccinatedGlobal,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }, {
                            label: 'Pessoas Totalmente Vacinadas no Mundo',
                            data: peopleFullyVaccinatedGlobal,
                            backgroundColor: 'rgba(255, 206, 86, 0.6)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    });
    