// Função assíncrona para obter o timestamp da última atualização da API
async function getLastUpdatedTimestamp() {
    // Faz uma requisição assíncrona para a API
    const response = await fetch('https://disease.sh/v3/covid-19/all');
    // Aguarda a resposta e extrai os dados JSON
    const data = await response.json();
    // Retorna o timestamp da última atualização
    return data.updated;
}

// Obtém o timestamp da última atualização e atualiza o rodapé da página
getLastUpdatedTimestamp()
    .then(timestamp => {
        // Formata o timestamp para exibir no formato de data e hora local
        const formattedTimestamp = new Date(timestamp).toLocaleString('pt-BR');
        // Atualiza o elemento HTML com o timestamp formatado
        document.getElementById('updatedTimestamp').textContent = `Última atualização da API: ${formattedTimestamp}`;
    })
    .catch(error => console.error('Error:', error));

// Evento que é acionado quando o DOM está completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    // Fetch para obter os dados de vacinação do Brasil
    fetch('https://covid.ourworldindata.org/data/vaccinations/vaccinations.json')
        .then(response => response.json())
        .then(data => {
            // Filtra os dados para encontrar os dados de vacinação do Brasil
            const brazilData = data.find(countryData => countryData.country === 'Brazil');
            if (!brazilData) {
                // Exibe um erro se os dados do Brasil não forem encontrados
                console.error('Dados de vacinação para o Brasil não encontrados.');
                return;
            }

            // Extrai os dados de doses totais e pessoas totalmente vacinadas para o Brasil
            const totalDosesBrazil = brazilData.data.map(dayData => dayData.total_vaccinations || 0);
            const totalVaccinatedBrazil = brazilData.data.map(dayData => dayData.people_fully_vaccinated || 0);

            // Cria um gráfico de linha para mostrar a vacinação no Brasil ao longo do tempo
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

// Evento que é acionado quando o DOM está completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    // Fetch para obter os dados de vacinação globais
    fetch('https://covid.ourworldindata.org/data/vaccinations/vaccinations.json')
        .then(response => response.json())
        .then(data => {
            // Filtra os dados para encontrar os dados de vacinação globais
            const globalData = data.find(countryData => countryData.country === 'World');
            if (!globalData) {
                // Exibe um erro se os dados globais não forem encontrados
                console.error('Dados de vacinação mundiais não encontrados.');
                return;
            }

            // Extrai os dados de doses totais e pessoas totalmente vacinadas globalmente
            const totalDosesGlobal = globalData.data.map(dayData => dayData.total_vaccinations || 0);
            const totalVaccinatedGlobal = globalData.data.map(dayData => dayData.people_fully_vaccinated || 0);

            // Cria um gráfico de linha para mostrar a vacinação global ao longo do tempo
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
