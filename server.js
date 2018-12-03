// const scraper = require('insta-scraper')
const express = require('express')
const bodyParser = require('body-parser')
const hb = require('express-handlebars')
const request = require('request')
const cheerio = require('cheerio')
const scraper = require('./igjs-master/igjs')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'escondidobandc@gmail.com',
        pass: 'hilltopce'
    }
})

// initialize express parameters
const app = express()
const PORT = process.env.PORT || 3001

// use public directory
app.use(express.static(__dirname + '/public'))

// bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// set up handlebars for templating
app.set('view engine', '.hbs')
app.engine('.hbs', hb({
    defaultLayout: 'main',
    extname: '.hbs'
}))

// html routing
app.get('/', (req, res) => {
    res.render('home')
})
app.get('/services', (req, res) => {
    res.render('services')
})
app.get('/blog', (req, res) => {
    res.render('blog')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/contact-:inquiry', (req, res, next) => {
    res.render('contact', {
        helpers: {
            villa: function () { return `I'd like to learn more about the ${req.params.inquiry} rooms.` }
        }
    })
})
// app.get('/DCP', (req, res) => {
    // res.render('DCP')
// })
app.get('/gallery', (req, res) => {
    res.render('gallery')
})
app.get('/HCE', (req, res) => {
    res.render('HCE')
})
app.get('/location', (req, res) => {
    res.render('location')
})
// app.get('/OPC', (req, res) => {
    // res.render('OPC')
// })
app.get('/reviews', (req, res) => {
    res.render('reviews')
})
// app.get('/SS', (req, res) => {
    // res.render('SS')
// })
// app.get('/TCPR', (req, res) => {
    // res.render('TCPR')
// })

// send contact info to email
app.post('/email', (req, res) => {
    console.log(req.body)
    var mailOptions = {
        from: req.body.email,
        to: 'escondidobandc@gmail.com',
        subject: `${req.body.facility} - New Message from ${req.body.name}`,
        html: `<p><strong>Name:</strong> ${req.body.name}</p>
        <br>
        <p><strong>Message:</strong> ${req.body.message}</p>`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(`Email sent!`)
        }
    })
})

// scrape articles from elder care blog
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
            category = category.slice(category.indexOf('category'))
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

            var newEntry = {}
            newEntry.headline = headline
            newEntry.excerpt = excerpt
            newEntry.url = url
            newEntry.img = img
            newEntry.category = category
            entryList.push(newEntry)
        })

        res.send(entryList.slice(0, 9))
    })
})

// scrape instagram posts
app.get('/insta', (req, res) => {
    let postPromise = scraper.getPosts('verveseniorliving')
    postPromise.then(posts => {
        console.log(posts)
        res.send(posts)
    })
})

// connection to server
app.listen(PORT, e => {
    if (e) throw e
    console.log(`LISTENING ON PORT : ${PORT}`)
})