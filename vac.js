// Função para obter o timestamp da última atualização da API
async function getLastUpdatedTimestamp() {
    const response = await fetch('https://disease.sh/v3/covid-19/all');
    const data = await response.json();
    return data.updated;
}

// Fetch para obter o timestamp da última atualização e atualizar o rodapé
getLastUpdatedTimestamp()
    .then(timestamp => {
        const formattedTimestamp = new Date(timestamp).toLocaleString('pt-BR');
        document.getElementById('updatedTimestamp').textContent = `Última atualização da API: ${formattedTimestamp}`;
    })
    .catch(error => console.error('Error:', error));






document.addEventListener('DOMContentLoaded', function () {
    fetch('https://covid.ourworldindata.org/data/vaccinations/vaccinations.json')
        .then(response => response.json())
        .then(data => {
            const brazilData = data.find(countryData => countryData.country === 'Brazil');
            if (!brazilData) {
                console.error('Dados de vacinação para o Brasil não encontrados.');
                return;
            }

            const totalDosesBrazil = brazilData.data.map(dayData => dayData.total_vaccinations || 0);
            const totalVaccinatedBrazil = brazilData.data.map(dayData => dayData.people_fully_vaccinated || 0);

            // Gráfico de linha para vacinação no Brasil ao longo do tempo
            const brazilChartCtx = document.getElementById('brazilChart').getContext('2d');
            const brazilChart = new Chart(brazilChartCtx, {
                type: 'line',
                data: {
                    labels: brazilData.data.map(dayData => dayData.date),
                    datasets: [{
                        label: 'Total de Doses Aplicadas no Brasil',
                        data: totalDosesBrazil,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Total de Pessoas Totalmente Vacinadas no Brasil',
                        data: totalVaccinatedBrazil,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
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
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://covid.ourworldindata.org/data/vaccinations/vaccinations.json')
        .then(response => response.json())
        .then(data => {
            // Filtrar os dados globais
            const globalData = data.find(countryData => countryData.country === 'World');
            if (!globalData) {
                console.error('Dados de vacinação mundiais não encontrados.');
                return;
            }

            const totalDosesGlobal = globalData.data.map(dayData => dayData.total_vaccinations || 0);
            const totalVaccinatedGlobal = globalData.data.map(dayData => dayData.people_fully_vaccinated || 0);

            // Gráfico de linha para vacinação global ao longo do tempo
            const globalChartCtx = document.getElementById('globalChart').getContext('2d');
            const globalChart = new Chart(globalChartCtx, {
                type: 'line',
                data: {
                    labels: globalData.data.map(dayData => dayData.date),
                    datasets: [{
                        label: 'Total de Doses Aplicadas no Mundo',
                        data: totalDosesGlobal,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Total de Pessoas Totalmente Vacinadas no Mundo',
                        data: totalVaccinatedGlobal,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
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
