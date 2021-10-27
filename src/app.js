const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sulaimaan'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sulaimaan Choudhury'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is an example of a help message',
        name: 'Sulaimaan'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Error: Enter an address' })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, { temperature, feelslike } = {}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                temperature,
                location,
                feelslike
            })

        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        message: 'Help article not found',
        name: 'sulaimaan'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        message: 'Page not found',
        name: 'sulaimaan'
    })
})



app.listen(port, () => {
    console.log('Service is up on port ' + port)
})


