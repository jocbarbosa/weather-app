const path = require('path');
const express = require('express');
const hbs = require('hbs');
const req = require('request');

const app = express();

// Define paths for express
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirectory));

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather Application',
        creator: 'John'
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About',
        creator: 'John Barbosa'
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help - FAQ and community',
        content: 'My content',
        creator: 'John '
    });
});

app.get('/weather', (request, response) => {

    const { latitude, longitude } = request.query;
    const url = 'http://api.weatherstack.com/current?access_key=d5f217766402b840cb44aea9deb10e15&query=' + latitude + ',' + longitude + '&units=m';


    req({ url: url, json: true }, (err, resp) => {
        if (!latitude || !longitude) {
            response.send({
                error: 'You need to give a latitude and longitude'
            });
        } else if (err) {
            response.send({
                error: 'Unable to connect to location service!'
            });
        } else if (resp.body.success === false) {
            response.send({
                error: 'Unable to find this location. Try another one!'
            });
        } else {
            response.send({
                givenData: {
                    latitude: resp.body.location.lat,
                    longitude: resp.body.location.lon,
                },
                location: {
                    name: resp.body.location.name,
                    country: resp.body.location.country,
                    region: resp.body.location.region,
                    timezone: resp.body.location.timezone_id
                },
                weather: {
                    temperature: resp.body.current.temperature,
                    description: resp.body.current.weather_descriptions,
                    wind_speed: resp.body.current.wind_speed
                }
            });
        }
    });
});


app.get('/location', (request, response) => {
    response.render('location');
});

app.get('*', (request, response) => {
    response.render('404', {
        title: '404',
        errorMessage: 'Page Nout Found'
    });
});

app.listen(3000, () => {
    console.log('Server UP and running')
});