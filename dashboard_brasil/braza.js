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

// Função para obter dados históricos de casos no Brasil
async function getHistoricalData() {
  const response = await fetch('https://disease.sh/v3/covid-19/historical/Brazil?lastdays=all');
  const data = await response.json();
  return data.timeline;
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





// Função para obter os dados de casos por faixa etária do Brasil


// Função para criar o gráfico de pizza de casos por faixa etária
async function createCasesByAgeChart() {
  // Obter os dados de casos por faixa etária do Brasil

  // Formatar os dados para o formato esperado pelo Chart.js


  // Criar o gráfico de pizza
  const ctx = document.getElementById('casesByAgeChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {

      labels: labels,
      datasets: [{
        label: 'Casos por Faixa Etária no Brasil',
        data: values,
        backgroundColor: [
          'rgba(255, 300, 25  , 0.5)',
          'rgba(244, 69, 157, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(54, 100, 15, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(552, 602, 68, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
          'rgba(255, 300, 25  , 1)',
          'rgba(244, 69, 157, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(54, 100, 15, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(552, 602, 68, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      legend: {
        position: 'bottom'
      }
    }
  });
}



// Função para criar o gráfico de casos recuperados versus mortes
async function createRecoveredVsDeathsChart() {
  const historicalData = await getHistoricalData();
  const dates = Object.keys(historicalData.cases).map(date => new Date(date));
  const recovered = Object.values(historicalData.recovered);
  const deaths = Object.values(historicalData.deaths);

  const ctx = document.getElementById('recoveredVsDeathsChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates.map(date => date.toLocaleDateString('pt-BR')),
      datasets: [{
        label: 'Casos Recuperados',
        data: recovered,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1
      },
      {
        label: 'Mortes',
        data: deaths,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'month',
            tooltipFormat: 'DD/MM/YYYY'
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



// Fetch para obter dados históricos de casos e mortes no Brasil
fetch('https://disease.sh/v3/covid-19/historical/Brazil?lastdays=all')
  .then(response => response.json())
  .then(data => {
    // Cria dados para o gráfico de casos
    const casesData = {
      labels: Object.keys(data.timeline.cases).map(date => new Date(date).toLocaleDateString('pt-BR')),
      datasets: [{
        label: 'Todos os casos no Brasil',
        data: Object.values(data.timeline.cases),
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };
    // Cria dados para o gráfico de mortes
    const deathsData = {
      labels: Object.keys(data.timeline.deaths).map(date => new Date(date).toLocaleDateString('pt-BR')),
      datasets: [{
        label: 'Mortes totais no Brasil',
        data: Object.values(data.timeline.deaths),
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };



    // Configurações para aumentar a distância entre as datas 
    const options = {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'month', // Aumenta a distância entre as datas para exibir mensalmente
            tooltipFormat: 'DD/MM/YYYY' // Formato do tooltip
          }
        }]
      }
    };


    // Obtém os contextos dos gráficos
    const casesCtx = document.getElementById('casesChart').getContext('2d');
    const deathsCtx = document.getElementById('deathsChart').getContext('2d');


    // Cria os gráficos de linha com as opções configuradas
    new Chart(casesCtx, {
      type: 'line',
      data: casesData,
      options: options // Adiciona as opções ao gráfico de casos
    });
    new Chart(deathsCtx, {
      type: 'line',
      data: deathsData,
      options: options // Adiciona as opções ao gráfico de mortes
    });


    // Chama a função para atualizar os totais
    updateCards();
  })
  .catch(error => console.error('Error:', error));





createRecoveredVsDeathsChart();
createCasesByAgeChart();
createDailyCasesChart();
updateCards();
document.getElementById('toggleDarkMode').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.navbar').classList.toggle('dark-mode');
  
  // Verifica se existe um container e aplica a classe de modo escuro
  const container = document.querySelector('.container');
  if (container) {
      container.classList.toggle('dark-mode');
  }
  
  // Verifica se existe um footer e aplica a classe de modo escuro
  const footer = document.querySelector('footer');
  if (footer) {
      footer.classList.toggle('dark-mode');
  }
  const cardBodies = document.querySelectorAll('.card-body');
  cardBodies.forEach(function(cardBody) {
      cardBody.classList.toggle('dark-mode');
  });
  
  // Muda o texto do botão
  const button = document.getElementById('toggleDarkMode');
  if (document.body.classList.contains('dark-mode')) {
      button.textContent = 'Modo Claro';
  } else {
      button.textContent = 'Modo Escuro';
  }
});

