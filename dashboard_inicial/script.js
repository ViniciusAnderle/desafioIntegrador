// Função para obter o timestamp da última atualização da API
async function getLastUpdatedTimestamp() {
  const response = await fetch('https://disease.sh/v3/covid-19/all');
  const data = await response.json();
  return data.updated;
}

// Função para formatar números
function formatNumber(num) {
  return num.toLocaleString('pt-BR');
}

// Fetch para obter o timestamp da última atualização e atualizar o rodapé
getLastUpdatedTimestamp()
  .then(timestamp => {
    const formattedTimestamp = new Date(timestamp).toLocaleString('pt-BR');
    document.getElementById('updatedTimestamp').textContent = `Última atualização da API: ${formattedTimestamp}`;
  })
  .catch(error => console.error('Error:', error));

// Fetch para obter os dados globais da COVID-19 e atualizar os totais no cabeçalho
fetch('https://disease.sh/v3/covid-19/all')
  .then(response => response.json())
  .then(data => {
    document.getElementById('totalCases').textContent = formatNumber(data.cases);
    document.getElementById('totalRecovered').textContent = formatNumber(data.recovered);
    document.getElementById('totalDeaths').textContent = formatNumber(data.deaths);
  })
  .catch(error => console.error('Error:', error));

// Fetch para obter os dados dos países e exibir os 10 países com mais e menos casos em tabelas
fetch('https://disease.sh/v3/covid-19/countries?sort=cases&yesterday=false&allowNull=false')
  .then(response => response.json())
  .then(data => {
    let topCases = '';
    let leastCases = '';
    
    data.slice(0, 10).forEach(country => {
      topCases += `<tr><td>${country.country}</td><td>${formatNumber(country.cases)}</td></tr>`;
    });

    data.slice(-10).forEach(country => {
      leastCases += `<tr><td>${country.country}</td><td>${formatNumber(country.cases)}</td></tr>`;
    });

    document.getElementById('topCases').innerHTML = topCases;
    document.getElementById('leastCases').innerHTML = leastCases;
  })
  .catch(error => console.error('Error:', error));

// Fetch para obter os dados históricos globais da COVID-19 e exibir gráficos de casos e mortes
fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
  .then(response => response.json())
  .then(data => {
    const casesData = {
      labels: Object.keys(data.cases).map(date => new Date(date).toLocaleDateString('pt-BR')),
      datasets: [{
        label: 'Todos os casos',
        data: Object.values(data.cases),
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };

    const deathsData = {
      labels: Object.keys(data.deaths).map(date => new Date(date).toLocaleDateString('pt-BR')),
      datasets: [{
        label: 'Mortes totais',
        data: Object.values(data.deaths),
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };

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

// Fetch para obter os dados dos países e exibir um gráfico de barras com os 10 países com mais casos
fetch('https://disease.sh/v3/covid-19/countries?sort=cases&yesterday=false&allowNull=false')
  .then(response => response.json())
  .then(data => {
    const topCountries = data.slice(0, 10);
    const countriesLabels = topCountries.map(country => country.country);
    const countriesCases = topCountries.map(country => country.cases);

    const ctx = document.getElementById('topCasesChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: countriesLabels,
        datasets: [{
          label: 'Top 10 Países por Total de Casos',
          data: countriesCases,
          backgroundColor: [
            'rgba(145, 1, 255, 1)', 'rgba(255, 153, 0, 1)', 'rgba(255, 204, 102, 1)', 
            'rgba(255, 102, 0, 1)', 'rgba(155, 151, 153, 1)', 'rgba(255, 0, 255, 1)', 
            'rgba(128, 0, 128, 1)', 'rgba(102, 102, 255, 1)', 'rgba(0, 153, 255, 1)', 
            'rgba(0, 204, 0, 1)'
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

// Cria um mapa Leaflet para visualizar os casos de COVID-19 por país
const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { minZoom: 2 }).addTo(map);

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

fetch('https://disease.sh/v3/covid-19/countries')
  .then(response => response.json())
  .then(data => {
    data.forEach(country => {
      if (country.countryInfo.lat && country.countryInfo.long) {
        const lat = country.countryInfo.lat;
        const long = country.countryInfo.long;
        const cases = country.cases;

        L.circle([lat, long], {
          color: getColor(cases),
          fillColor: getColor(cases),
          fillOpacity: 0.5,
          radius: 50000
        }).addTo(map).bindPopup(`<b>${country.country}</b><br>Casos: ${formatNumber(cases)}`);
      }
    });
  })
  .catch(error => console.error('Error:', error));

document.getElementById('toggleDarkMode').addEventListener('click', function () {
  const elementsToToggle = [
    'body', '.navbar-light', '.card', '.footer', 
    '.container', '.table', '.legend', '.legend-item'
  ];
  elementsToToggle.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => element.classList.toggle('dark-mode'));
  });

  const button = document.getElementById('toggleDarkMode');
  button.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Escuro';
});
