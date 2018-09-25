// const scraper = require('insta-scraper')
const express = require('express')
const bodyParser = require('body-parser')
const hb = require('express-handlebars')
const request = require('request')
var cheerio = require('cheerio')

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
app.get('/', (req, res) => {
    res.render('home')
})
app.get('/AIBC', (req, res) => {
    res.render('AIBC')
})
app.get('/blog', (req, res) => {
    res.render('blog')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/DCP', (req, res) => {
    res.render('DCP')
})
app.get('/gallery', (req, res) => {
    res.render('gallery')
})
app.get('/HCE', (req, res) => {
    res.render('HCE')
})
app.get('/location', (req, res) => {
    res.render('location')
})
app.get('/OPC', (req, res) => {
    res.render('OPC')
})
app.get('/reviews', (req, res) => {
    res.render('reviews')
})
app.get('/SS', (req, res) => {
    res.render('SS')
})
app.get('/TCPR', (req, res) => {
    res.render('TCPR')
})

// GET route to scrape articles from elder care blog
app.get('/scrape', (req, res) => {
    var $ = cheerio.load('<div>Hello world!</div>')
    var newsUrl = 'https://www.alzheimers.net/blog/'
    var entryList = []

    request(newsUrl, (e, r, html) => {
        if (e) throw e
        var $ = cheerio.load(html)

        $('.mt0').each((i, el) => {
            var headline = $(el).children('.blog-thumbnail-context').children('h2').children('a').text().trim()
            var excerpt = $(el).children('.blog-thumbnail-context').children('p').text().trim()
            var url = $(el).children('.blog-thumbnail-context').children('a').attr('href')
            var img = $(el).children('.blog-thumbnail-image').children('a').children('img').attr('src')
            var category = $(el).parent().attr('class')
            category = category.slice(category.indexOf('category'), category.length)
            category = category.split(' ')[0]
            category = category.split('-')
            category.shift()
            var temp = []
            for (i in category) {
                if (category[i] != "and") {
                    temp[i] = category[i].charAt(0).toUpperCase() + category[i].slice(1)
                }
                else {
                    temp[i] = category[i]
                }
            }
            category = temp
            category = category.join(' ')

            // console.log(category)

            var newEntry = {}
            newEntry.headline = headline
            // if (excerpt.length > 250) {
            //     excerpt = excerpt.slice(0,250) + `[...]`
            // }
            newEntry.excerpt = excerpt
            newEntry.url = url
            newEntry.img = img
            newEntry.category = category
            entryList.push(newEntry)
        })

        // console.log(entryList)
        res.send(entryList)
    })
})

app.listen(PORT, e => {
    if (e) throw e
    console.log(`LISTENING ON PORT : ${PORT}`)
})