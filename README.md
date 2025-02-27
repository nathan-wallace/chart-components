# CO2 Chart Component

A lightweight, interactive web component that visualizes CO2 emissions trends for selected countries (United States, China, India, Germany) from 1990 to 2023. Built with Chart.js, Tailwind CSS, and Webpack, this project fetches data from the [Our World in Data CO2 dataset](https://github.com/owid/co2-data) and displays it in a responsive line chart.

## Features
- Displays CO2 emissions (in million tonnes) over time for four major countries.
- Fetches real-time data from a CSV hosted on GitHub and retrieves the last update date via the GitHub API.
- Includes fallback data in case of fetch failures.
- Responsive design with smooth animations and a modern UI styled with Tailwind CSS.
- Easy-to-configure Webpack setup with Hot Module Replacement (HMR) for development.

## Demo
No GitHub Pages yet

## Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/co2-chart-component.git
   cd co2-chart-component
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage
### Development
Start the development server with live reloading:
```bash
npm start
```
This will open your default browser at `http://localhost:9000`.

### Build
Generate a production-ready build in the `dist/` folder:
```bash
npm run build
```

### Customization
- **Countries and Years**: Modify the `countries` and `years` arrays in `src/js/Co2Chart.js` to change the data displayed.
- **Styling**: Adjust the Tailwind CSS configuration in `tailwind.config.js` or the styles in `src/css/styles.css`.
- **Chart Options**: Tweak the Chart.js configuration in the `initChart` method of `src/js/Co2Chart.js`.

## Project Structure
```
co2-chart-component/
├── dist/               # Output directory for built files
├── src/                # Source files
│   ├── css/            # CSS styles
│   │   └── styles.css
│   ├── js/             # JavaScript source
│   │   └── Co2Chart.js
│   └── index.html      # HTML template
├── package.json        # Project metadata and dependencies
├── webpack.config.js   # Webpack configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Dependencies
- [Chart.js](https://www.chartjs.org/): For rendering the line chart.
- [PapaParse](https://www.papaparse.com/): For parsing CSV data.
- [Tailwind CSS](https://tailwindcss.com/): For styling.
- [Webpack](https://webpack.js.org/): For bundling the project.

## Data Source
- CO2 data is sourced from [Our World in Data](https://ourworldindata.org/co2-and-greenhouse-gas-emissions) via the CSV at `https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv`.
- Last updated date is fetched from the GitHub API for the `owid-co2-data.csv` file.

## Limitations
- The chart currently supports only the predefined countries and years.
- Fallback data is static and limited to seven data points per country.
- Internet connectivity is required for live data; otherwise, fallback data is used.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License
This project is licensed under the ISC License. See the `package.json` for details.

## Acknowledgments
- [Our World in Data](https://ourworldindata.org/) for providing comprehensive CO2 emissions data.
- The open-source communities behind Chart.js, Tailwind CSS, and Webpack.
