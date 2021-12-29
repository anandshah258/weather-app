const path = require('path');
const hbs = require('hbs');
const express = require('express');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

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
      forecast(latitude, longitude, (error, data) => {
        if (error) return res.send({ error });
        const { weather_descriptions, temperature, feelslike } = data;
        res.send({
          location,
          forecast: `${weather_descriptions[0]}. ` +
            `Currently it is ${temperature} degree celcius. ` +
            `But it feels like ${feelslike} degrees.`,
          address
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

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
})