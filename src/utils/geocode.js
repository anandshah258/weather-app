const axios = require('axios').default;

const geocode = (address, callback) => {
  const apiToken = 'pk.eyJ1IjoiYW5hbmRzaGFoMjU4IiwiYSI6ImNrazUxYmtxbzAyd24yd253cHQ1OWZ0MG8ifQ.kiZURvMSRl4jl_SdVD52SQ';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`;
  axios.get(url, {
    params: {
      access_token: apiToken,
      limit: 1
    }
  })
    .then(({ data }) => {
      if (data.features.length) {
        const [longitude, latitude] = data.features[0].center;
        callback(undefined, { latitude, longitude, location: data.features[0].place_name });
      } else {
        callback('Unable to find location. Try another search.');
      }
    })
    .catch((error) => {
      callback('Unable to connect to the location services!');
    })
}

module.exports = geocode;