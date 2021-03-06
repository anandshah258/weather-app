const path = require('path');
const hbs = require('hbs');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

const info = {
  name: 'Anand',
  title: 'Weather App'
}

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Anand',
    title: 'Weather App'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'Anand',
    title: 'About Me'
  });
})

app.get('/help', (req, res) => {
  res.render('help', {
    name: 'Anand',
    title: 'Help',
    helpText: 'This is some helpful text'
  });
})

app.get('/weather', (req, res) => {
  const { address } = req.query
  if (address) {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error });
        res.send({
          location,
          forecastData
        });
      });
    });
  }
  else res.send({ error: 'Address must be provided' });
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Error: 404',
    message: 'Help article not found',
    name: 'Anand'
  });
})

app.get('*', (req, res) => {
  res.render('error', {
    title: 'Error: 404',
    message: 'Page not found',
    name: 'Anand'
  });
})

app.listen(port, () => {
  console.log('Express server listening on port ' + port);
})