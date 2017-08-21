const https = require('https');
const api_key = require('./api.json');

// print temp details

function printWeather(queryType, weather) {
  const fullLocation = weather["current_observation"]["display_location"]["full"];
  const zipLocation = weather["current_observation"]["display_location"]["zip"];
  const heatIndex = weather["current_observation"]["heat_index_f"];
  let location = "";

  if (queryType === "zip") {
    location = zipLocation;
  } else {
    location = fullLocation;
  }

  let tempResponse = "";
  tempResponse += `The current temperature for ${location} is ${weather["current_observation"]["temp_f"]} degrees Fahrenheit`;

  if (heatIndex != 'NA') {
    tempResponse += ` with a heat index of ${heatIndex} degrees Fahrenheit.`;
  } else {
    tempResponse += `.`;
  }

  console.log(tempResponse);
}

// print error messages

function getWeather(query) {
  const weatherRequest = https.get(`https://api.wunderground.com/api/${api_key.key}/conditions/q/${query}.json`, response => {

    const zipCode = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    let queryType = "";
    if (zipCode.test(query)) {
      queryType = "zip";
    } else {
      queryType = "city";
    }

    let body = "";

    response.on('data', data => {
      body += data;
    });

    response.on('error', error => {
      console.log(error.message);
    })

    response.on('end', () => {
      const bodyContent = body.toString();
      const parsedContent = JSON.parse(bodyContent);

      printWeather(queryType, parsedContent);
    })
  })
}

module.exports.getWeather = getWeather;
