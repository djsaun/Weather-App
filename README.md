# Node.JS Weather App
Node.JS project to get current weather conditions by zip code or city from command line.

This project makes use of the Weather Underground API. To test this application out for yourself, you will need to create an API key on their site here: https://www.wunderground.com/weather/api/

Once you have an API key, create a file called `json.api` in the root directory. Add the following code snippet into it and replace the `API KEY` reference with your own key.

```
{
  "key": "API KEY"
}
```

Run the application in your command line by entering `node app.js [city, state]` or by entering `node app.js [zip]`.

For example, `node app.js Austin, TX` and `node app.js 78704`.
