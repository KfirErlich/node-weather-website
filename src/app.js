const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')
const request = require("postman-request");

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../tamplates/views')
const partialsPath = path.join(__dirname, '../tamplates/partials')

// Setup handlers engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kfir Erlich'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kfir Erlich'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Kfir Erlich'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'An address must be provided'
        })
    }
    geocode(req.query.address ,(error ,{latitude, longtitude, location} = {} ) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longtitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast : forecastData,
                location ,
                address : req.query.address
            })

        })
    })


})

app.get('/product', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Kfir Erlich',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Kfir Erlich',
        errorMessage: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
