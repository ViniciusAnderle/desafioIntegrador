// Função para obter dados da API
async function getData() {
  const response = await fetch('https://disease.sh/v3/covid-19/countries/Brazil');
  const data = await response.json();
  return data;
}

// Função para criar os cards com os totais
async function updateCards() {
  const data = await getData();
  if (document) {
    document.getElementById('totalCases').textContent = data.cases.toLocaleString('pt-BR');
    document.getElementById('totalRecovered').textContent = data.recovered.toLocaleString('pt-BR');
    document.getElementById('totalDeaths').textContent = data.deaths.toLocaleString('pt-BR');
  }
}

// Função para obter o timestamp da última atualização da API
async function getLastUpdatedTimestamp() {
  const response = await fetch('https://disease.sh/v3/covid-19/all');
  const data = await response.json();
  return data.updated;
}

// Função para obter dados históricos de casos no Brasil
async function getDailyCasesData() {
  const response = await fetch('https://disease.sh/v3/covid-19/historical/Brazil?lastdays=all');
  const data = await response.json();
  return data.timeline.cases;
}

// Função para criar o gráfico de taxa de crescimento diário de casos
async function createDailyCasesChart() {
  const historicalData = await getDailyCasesData();
  const dates = Object.keys(historicalData).map(date => new Date(date));
  const cases = Object.values(historicalData);

  const dailyCases = [cases[0]];
  for (let i = 1; i < cases.length; i++) {
    dailyCases.push(cases[i] - cases[i - 1]);
  }

  const ctx = document.getElementById('dailyCasesChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates.map(date => date.toLocaleDateString('pt-BR')), // Formatando as datas para pt-BR
      datasets: [{
        label: 'Crescimento Diário de Casos no Brasil',
        data: dailyCases,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'DD/MM/YYYY' // Formato do tooltip em pt-BR
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// Fetch para obter o timestamp da última atualização e atualizar o rodapé
getLastUpdatedTimestamp()
  .then(timestamp => {
    const formattedTimestamp = new Date(timestamp).toLocaleString('pt-BR');
    document.getElementById('updatedTimestamp').textContent = `Última atualização da API: ${formattedTimestamp}`;
  })
  .catch(error => console.error('Error:', error));

// Chamadas iniciais
createDailyCasesChart();
updateCards();

//darkmode
document.getElementById('toggleDarkMode').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.container').classList.toggle('dark-mode');
  document.querySelector('footer').classList.toggle('dark-mode');
  const button = document.getElementById('toggleDarkMode');
  if (document.body.classList.contains('dark-mode')) {
      button.textContent = 'Modo Claro';
  } else {
      button.textContent = 'Modo Escuro';
  }
});