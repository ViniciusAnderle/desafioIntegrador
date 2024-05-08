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








fetch('https://disease.sh/v3/covid-19/all')
  .then(response => response.json())
  .then(data => {
    document.getElementById('totalCases').textContent = data.cases.toLocaleString();
    document.getElementById('totalRecovered').textContent = data.recovered.toLocaleString();
    document.getElementById('totalDeaths').textContent = data.deaths.toLocaleString();
  })
  .catch(error => console.error('Error:', error));

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

fetch('https://disease.sh/v3/covid-19/countries?sort=cases&yesterday=false&allowNull=false')
  .then(response => response.json())
  .then(data => {
    const topCountries = data.slice(0, 10);
    const countriesLabels = topCountries.map(country => country.country);
    const countriesCases = topCountries.map(country => country.cases);

    const ctx = document.getElementById('topCasesChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: countriesLabels,
        datasets: [{
          label: 'Top 10 Países por Total de Casos',
          data: countriesCases,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)'
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

fetch('https://disease.sh/v3/covid-19/countries?sort=cases&yesterday=false&allowNull=false')
  .then(response => response.json())
  .then(data => {
    const topCountries = data.slice(0, 10);
    const chartData = topCountries.map(country => [country.country, country.cases]);
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

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

const map = L.map('map').setView([0, 0], 2);

// Define os limites para o mapa
const southWest = L.latLng(-90, -180);
const northEast = L.latLng(90, 180);
const bounds = L.latLngBounds(southWest, northEast);
map.setMaxBounds(bounds);

// Se a posição inicial do mapa estiver fora dos limites, ajuste-a para dentro
map.on('drag', function () {
  map.panInsideBounds(bounds, { animate: false });
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  minZoom: 2, // Defina o zoom mínimo permitido
}).addTo(map);

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
