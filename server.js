// const scraper = require('insta-scraper')
const express = require('express')
const bodyParser = require('body-parser')
const hb = require('express-handlebars')

// initialize express parameters
const app = express()
const PORT = process.env.PORT || 3000

// use public directory
app.use(express.static(__dirname + '/public'))

// bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//set up handlebars for templating
app.set('view engine', '.hbs')
app.engine('.hbs', hb({
  defaultLayout: 'main',
  extname: '.hbs'
}))

// html routing
app.get('/', function (req, res) {
    res.render('home')
})
app.get('/AIBC', function (req, res) {
    res.render('AIBC')
})
app.get('/blog', function (req, res) {
    res.render('blog')
})
app.get('/contact', function (req, res) {
    res.render('contact')
})
app.get('/DCP', function (req, res) {
    res.render('DCP')
})
app.get('/gallery', function (req, res) {
    res.render('gallery')
})
app.get('/HCE', function (req, res) {
    res.render('HCE')
})
app.get('/location', function (req, res) {
    res.render('location')
})
app.get('/OPC', function (req, res) {
    res.render('OPC')
})
app.get('/reviews', function (req, res) {
    res.render('reviews')
})
app.get('/SS', function (req, res) {
    res.render('SS')
})
app.get('/TCPR', function (req, res) {
    res.render('TCPR')
})

// scraper.getAccountInfo('hotpinksunrise', function (err, res) {
//     if (err) throw err
//     console.log(res)
// })

app.listen(PORT, function (e) {
    if (e) throw e
    console.log(`LISTENING ON PORT : ${PORT}`)
})