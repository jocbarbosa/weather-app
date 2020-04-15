const path = require('path');
const express = require('express');

const app = express();
const publicDirectory = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.use(express.static(publicDirectory));

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