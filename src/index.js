const path = require('path');

const express = require('express');

console.log(__dirname);
// console.log(path.join(__dirname))

const app = express();

// const url = 'http://api.weatherstack.com/current?access_key=d5f217766402b840cb44aea9deb10e15&query=-3.7899266,-38.5889879&units=m'

app.get('/', (request, response) => {
    response.send('Hello World')
});

app.get('/about', (request, response) => {
    response.send('<h1>About the site</h1>')
});

app.get('/weather', (request, response) => {
    response.send({
        forecast: 'It\' snowing',
        location: 'Philadelphia'
    })
});

app.get('/help', (request, response) => {
    response.send([{
        name: "Joao",
        age: 27
    },
    {
        name: "Joao",
        age: 27
    }])
})

app.listen(3000, () => {
    console.log('Server UP and running')
});