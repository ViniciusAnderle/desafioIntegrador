// Função para obter o timestamp da última atualização da API
async function getLastUpdatedTimestamp() {
  const response = await fetch('https://disease.sh/v3/covid-19/all');
  const data = await response.json();
  return data.updated;
}

// Fetch para obter o timestamp da última atualização e atualizar o rodapé
getLastUpdatedTimestamp()
  .then(timestamp => {
      // Formata o timestamp para exibir no formato de data e hora local
      const formattedTimestamp = new Date(timestamp).toLocaleString('pt-BR');
      // Atualiza o elemento HTML com o timestamp formatado
      document.getElementById('updatedTimestamp').textContent = `Última atualização da API: ${formattedTimestamp}`;
  })
  .catch(error => console.error('Error:', error));

// Fetch para obter os dados globais da COVID-19 e atualizar os totais no cabeçalho
fetch('https://disease.sh/v3/covid-19/all')
  .then(response => response.json())
  .then(data => {
    document.getElementById('totalCases').textContent = data.cases.toLocaleString();
    document.getElementById('totalRecovered').textContent = data.recovered.toLocaleString();
    document.getElementById('totalDeaths').textContent = data.deaths.toLocaleString();
  })
  .catch(error => console.error('Error:', error));

// Fetch para obter os dados dos países e exibir os 10 países com mais casos em uma tabela
fetch('https://disease.sh/v3/covid-19/countries?sort=cases&yesterday=false&allowNull=false')
  .then(response => response.json())
  .then(data => {
    let topCases = '';
    data.slice(0, 10).forEach(country => {
      topCases += `<tr><td>${country.country}</td><td>${country.cases.toLocaleString()}</td></tr>`;
    });
    document.getElementById('topCases').innerHTML = topCases;
  })
  .catch(error => console.error('Error:', error));

  // Fetch para obter os dados dos países e exibir os 10 países com menos casos em uma tabela
  fetch('https://disease.sh/v3/covid-19/countries?sort=cases&yesterday=false&allowNull=false')
  .then(response => response.json())
  .then(data => {
    let leastCases = '';
    data.slice(-10).forEach(country => {
      leastCases += `<tr><td>${country.country}</td><td>${country.cases.toLocaleString()}</td></tr>`;
    });
    document.getElementById('leastCases').innerHTML = leastCases;
  })
  .catch(error => console.error('Error:', error));
  
  

// Fetch para obter os dados históricos globais da COVID-19 e exibir gráficos de casos e mortes
fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
  .then(response => response.json())
  .then(data => {
    // Prepara os dados para o gráfico de casos
    const casesData = {
      labels: Object.keys(data.cases).map(date => new Date(date).toLocaleDateString('pt-BR')),
      datasets: [{
        label: 'Todos os casos',
        data: Object.values(data.cases),
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };
    // Prepara os dados para o gráfico de mortes
    const deathsData = {
      labels: Object.keys(data.deaths).map(date => new Date(date).toLocaleDateString('pt-BR')),
      datasets: [{
        label: 'Mortes totais',
        data: Object.values(data.deaths),
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };
    // Cria os gráficos de casos e mortes
    const casesCtx = document.getElementById('casesChart').getContext('2d');
    const deathsCtx = document.getElementById('deathsChart').getContext('2d');
    new Chart(casesCtx, {
      type: 'line',
      data: casesData
    });
    new Chart(deathsCtx, {
      type: 'line',
      data: deathsData
    });
  })
  .catch(error => console.error('Error:', error));

// Fetch para obter os dados dos países e exibir um gráfico de pizza com os 10 países com mais casos
fetch('https://disease.sh/v3/covid-19/countries?sort=cases&yesterday=false&allowNull=false')
  .then(response => response.json())
  .then(data => {
    const topCountries = data.slice(0, 20);
    const countriesLabels = topCountries.map(country => country.country);
    const countriesCases = topCountries.map(country => country.cases);

    // Cria o gráfico de pizza com os países e seus casos
    const ctx = document.getElementById('topCasesChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: countriesLabels,
        datasets: [{
          label: 'Top 10 Países por Total de Casos',
          data: countriesCases,
          backgroundColor: [
            'rgba(145, 1, 255, 1)',
            'rgba(255, 153, 0, 1)', 
            'rgba(255, 204, 102, 1)', 
            'rgba(255, 102, 0, 1)',
            'rgba(155, 151, 153, 1)', 
            'rgba(255, 0, 255, 1)', 
            'rgba(128, 0, 128, 1)',
            'rgba(102, 102, 255, 1)',
            'rgba(0, 153, 255, 1)', 
            'rgba(0, 204, 0, 1)',
            'rgba(51, 204, 153, 1)', 
            'rgba(244, 300, 89, 1)', 
            'rgba(0, 153, 153, 1)', 
            'rgba(204, 204, 204, 1)',
            'rgba(192, 192, 192, 1)', 
            'rgba(255, 153, 204, 1)',
            'rgba(255, 204, 229, 1)',
            'rgba(150, 150, 1, 1)', 
            'rgba(153, 102, 255, 1)' 

          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  })
  .catch(error => console.error('Error:', error));

// Fetch para obter os dados dos países e exibir um gráfico de pizza com os 10 países com mais casos, usando a biblioteca Google Charts
fetch('https://disease.sh/v3/covid-19/countries?sort=cases&yesterday=false&allowNull=false')
  .then(response => response.json())
  .then(data => {
    const topCountries = data.slice(0, 10);
    const chartData = topCountries.map(country => [country.country, country.cases]);

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    // Função para desenhar o gráfico de pizza
    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Country');
      data.addColumn('number', 'Cases');
      data.addRows(chartData);

      var options = {
        title: 'Top 10 Países por Total de Casos',
        pieHole: 0.4,
        colors: [
          '#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb',
          '#64b5f6', '#4fc3f7', '#4dd0e1', '#4db6ac', '#81c784'
        ]
      };

      var chart = new google.visualization.PieChart(document.getElementById('topCasesChart'));
      chart.draw(data, options);
    }
  })
  .catch(error => console.error('Error:', error));

// Cria um mapa Leaflet para visualizar os casos de COVID-19 por país
const map = L.map('map').setView([0, 0], 2);

// Define os limites para o mapa
const southWest = L.latLng(-90, -180);
const northEast = L.latLng(90, 180);
const bounds = L.latLngBounds(southWest, northEast);
map.setMaxBounds(bounds);

// Ajusta a posição inicial do mapa para dentro dos limites
map.on('drag', function () {
  map.panInsideBounds(bounds, { animate: false });
});

// Adiciona a camada de mapa OpenStreetMap ao mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  minZoom: 2, // Define o zoom mínimo permitido
}).addTo(map);

// Função para obter a cor com base no número de casos
function getColor(cases) {
  return cases > 1000000 ? '#800026' :
    cases > 500000 ? '#BD0026' :
      cases > 200000 ? '#E31A1C' :
        cases > 100000 ? '#FC4E2A' :
          cases > 50000 ? '#FD8D3C' :
            cases > 20000 ? '#FEB24C' :
              cases > 10000 ? '#FED976' :
                '#FFEDA0';
}

// Fetch para obter os dados dos países e adicionar polígonos coloridos ao mapa com informações de casos
fetch('https://disease.sh/v3/covid-19/countries')
  .then(response => response.json())
  .then(data => {
    data.forEach(country => {
      if (country.countryInfo.lat && country.countryInfo.long) {
        const lat = country.countryInfo.lat;
        const long = country.countryInfo.long;
        const cases = country.cases;

        // Adiciona um polígono colorido representando os casos no país, com um tooltip informativo
        L.polygon([
          [lat - 0.5, long - 0.5],
          [lat + 0.5, long - 0.5],
          [lat + 0.5, long + 0.5],
          [lat - 0.5, long + 0.5]
        ], {
          color: getColor(cases),
          fillColor: getColor(cases),
          fillOpacity: 0.3,
          interactive: true  // Permite interação mesmo fora do polígono
        }).addTo(map).bindTooltip(`<b>${country.country}</b><br>Casos: ${cases}`, {
          direction: 'top',
          permanent: false,
          opacity: 0.7,
          className: 'tooltip',
          offset: [0, 0],
          sticky: true,
          interactive: true,
          radius: 150  // Aumenta o alcance do tooltip
        }).openTooltip();

      }
    });
  });
