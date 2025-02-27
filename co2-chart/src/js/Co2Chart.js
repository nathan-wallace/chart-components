import Chart from 'chart.js/auto';
import Papa from 'papaparse';
import '../css/styles.css';

class Co2Chart {
  constructor(elementId) {
    this.elementId = elementId;
    this.dataUrl = 'https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv';
    this.commitApiUrl = 'https://api.github.com/repos/owid/co2-data/commits?path=owid-co2-data.csv&per_page=1';
    this.countries = ['United States', 'China', 'India', 'Germany'];
    this.years = [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2021, 2022, 2023];
    this.data = { years: this.years, countries: {} };
    this.lastUpdated = 'Unknown'; // Default if fetch fails
    this.fetchDataAndInit();
  }

  // Fetch data and commit info
  async fetchDataAndInit() {
    try {
      // Fetch last commit date
      const commitResponse = await fetch(this.commitApiUrl);
      const commitData = await commitResponse.json();
      if (commitData.length > 0) {
        const commitDate = new Date(commitData[0].commit.author.date);
        this.lastUpdated = commitDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }

      // Fetch and parse CO2 data
      const dataResponse = await fetch(this.dataUrl);
      const csvText = await dataResponse.text();
      Papa.parse(csvText, {
        header: true,
        complete: (result) => {
          this.processData(result.data);
          this.initChart();
        },
        error: (error) => console.error('Error parsing CSV:', error),
      });
    } catch (error) {
      console.error('Error fetching data or commit info:', error);
      this.useFallbackData();
      this.initChart();
    }
  }

  // Process CSV data for selected countries and years
  processData(csvData) {
    const countryData = {};
    this.countries.forEach(country => {
      countryData[country] = [];
      this.years.forEach(year => {
        const row = csvData.find(r => r.country === country && r.year === year.toString());
        const co2 = row && row.co2 ? parseFloat(row.co2) : 0;
        countryData[country].push(co2);
      });
    });
    this.data.countries = countryData;
  }

  // Fallback static data
  useFallbackData() {
    this.data.countries = {
      "United States": [4820, 5100, 5800, 5900, 5400, 5000, 4700],
      "China": [2400, 3300, 3600, 6100, 8200, 9800, 10600],
      "India": [600, 800, 1000, 1200, 1600, 2100, 2500],
      "Germany": [1000, 950, 900, 850, 800, 750, 700],
    };
  }

  getCountryColor(country, opacity = 1) {
    const colors = {
      "United States": `rgba(75, 192, 192, ${opacity})`,
      "China": `rgba(255, 99, 132, ${opacity})`,
      "India": `rgba(54, 162, 235, ${opacity})`,
      "Germany": `rgba(255, 206, 86, ${opacity})`,
    };
    return colors[country];
  }

  initChart() {
    const ctx = document.getElementById(this.elementId).getContext('2d');
    const datasets = Object.keys(this.data.countries).map(country => ({
      label: country,
      data: this.data.countries[country],
      borderColor: this.getCountryColor(country),
      backgroundColor: this.getCountryColor(country, 0.2),
      fill: false,
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 8,
    }));

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.years,
        datasets: datasets,
      },
      options: {
        responsive: true,
        animation: {
          duration: 2000,
          easing: 'easeOutQuart',
        },
        scales: {
          x: { title: { display: true, text: 'Year', font: { size: 16 } } },
          y: { 
            title: { display: true, text: 'CO2 Emissions (Million Tonnes)', font: { size: 16 } },
            beginAtZero: true,
          },
        },
        plugins: {
          legend: { position: 'top', labels: { font: { size: 14 } } },
          tooltip: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
          title: {
            display: true,
            text: 'CO2 Emissions Trends (1990-2023)',
            font: { size: 20 },
            padding: { top: 10, bottom: 10 },
          },
          subtitle: {
            display: true,
            text: `Data sourced from Our World in Data (https://ourworldindata.org/co2-and-greenhouse-gas-emissions). Last updated: ${this.lastUpdated}.`,
            font: { size: 12 },
            padding: { bottom: 20 },
          },
        },
      },
    });
  }
}

export default Co2Chart;

// Initialize the chart
document.addEventListener('DOMContentLoaded', () => {
  new Co2Chart('co2Chart');
});