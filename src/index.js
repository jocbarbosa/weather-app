const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for express
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Setup static directory
app.use(express.static(publicDirectory));

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather Application',
        name: 'John'
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About'
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help - FAQ and community',
        content: 'My content'
    });
});

// const url = 'http://api.weatherstack.com/current?access_key=d5f217766402b840cb44aea9deb10e15&query=-3.7899266,-38.5889879&units=m'

app.get('/weather', (request, response) => {
    response.send({
        forecast: 'It\' snowing',
        location: 'Philadelphia'
    })
});

app.listen(3000, () => {
    console.log('Server UP and running')
});