const axios = require('axios').default;

const forecast = (latitude, longitude, callback) => {
  axios.get('http://api.weatherstack.com/current', {
    params: {
      access_key: '14936f5f12c673f90d750b12cb66e2b5',
      query: latitude + ',' + longitude
    }
  })
    .then(({ data }) => {
      if (data.error) {
        callback('Unable to find location');
      }
      else {
        callback(undefined, data.current);
      }
    })
    .catch((error) => {
      callback('Unable to connect to weather service!');
    })
}

module.exports = forecast;